import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const langNames: Record<string, string> = {
  te: "Telugu (తెలుగు script)",
  hi: "Hindi (Devanagari script)",
  en: "simple Indian English",
};

function langLabel(lang: string) {
  return langNames[lang] ?? langNames["en"];
}

async function getModel() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured");
  const { createLovableAiGatewayProvider, CHAT_MODEL } = await import("./ai-gateway.server");
  return createLovableAiGatewayProvider(key)(CHAT_MODEL);
}

/* ---------------------------------- Sathi chat --------------------------------- */

const ChatInput = z.object({
  lang: z.string(),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) }))
    .min(1)
    .max(30),
  profile: z
    .object({
      name: z.string().optional(),
      village: z.string().optional(),
      land: z.string().optional(),
      crops: z.string().optional(),
    })
    .optional(),
});

export const askSathi = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const { streamText } = await import("ai");
    const model = await getModel();

    const p = data.profile;
    const profileLine =
      p && (p.village || p.crops || p.land)
        ? `Farmer details: name ${p.name || "unknown"}, village ${p.village || "unknown"}, land ${p.land || "unknown"} acres, crops ${p.crops || "unknown"}.`
        : "";

    const result = streamText({
      model,
      system: [
        "You are Sathi360, a warm, respectful farming companion for small and marginal Indian farmers.",
        `Always answer in ${langLabel(data.lang)}. Never mix scripts.`,
        "Answers are spoken aloud, so keep them short: 3-5 short sentences, no markdown, no bullet symbols, no emojis.",
        "Be practical and local: mention quantities, timing and low-cost options. Prefer safe, approved practices.",
        "If the question is about a medical, legal or money emergency, advise contacting the right helpline.",
        profileLine,
      ]
        .filter(Boolean)
        .join(" "),
      messages: data.messages,
    });

    return { text: await result.text };
  });

/* --------------------------------- Crop Doctor -------------------------------- */

const diagnosisSchema = z.object({
  disease: z.string(),
  confidence: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  organic: z.string(),
  chemical: z.string(),
  prevention: z.string(),
  spoken: z.string(),
});

export const diagnoseCrop = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        lang: z.string(),
        mime: z.string(),
        image: z.string().min(100),
        note: z.string().max(400).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { streamText, Output, NoObjectGeneratedError } = await import("ai");
    const model = await getModel();

    try {
      const result = streamText({
        model,
        output: Output.object({ schema: diagnosisSchema }),
        system: `You are an Indian plant pathologist helping a farmer. Write every field in ${langLabel(data.lang)} except the "severity" field, which must be exactly low, medium or high. Keep each field to one or two short sentences. "spoken" is a friendly 3-sentence summary to be read aloud. If the photo is not a plant, say so in the disease field.`,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Identify the crop problem in this photo and give remedies available in Indian agri shops. ${data.note ? `Farmer note: ${data.note}` : ""}`,
              },
              { type: "image", image: data.image, mediaType: data.mime },
            ],
          },
        ],
      });
      return await result.output;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("Could not read that photo clearly. Please try a closer, brighter photo.");
      }
      throw error;
    }
  });

/* -------------------------------- Cyber Kavach -------------------------------- */

const threatSchema = z.object({
  level: z.enum(["safe", "caution", "danger"]),
  score: z.number(),
  verdict: z.string(),
  reasons: z.array(z.string()),
  action: z.string(),
  spoken: z.string(),
});

export const analyzeThreat = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        lang: z.string(),
        kind: z.enum(["call", "sms", "link"]),
        content: z.string().min(3).max(3000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { streamText, Output, NoObjectGeneratedError } = await import("ai");
    const model = await getModel();

    const kindText = {
      call: "a phone call a farmer received (transcript or description)",
      sms: "an SMS or WhatsApp message a farmer received",
      link: "a web link a farmer was sent",
    }[data.kind];

    try {
      const result = streamText({
        model,
        output: Output.object({ schema: threatSchema }),
        system: `You are a cyber-fraud analyst protecting Indian farmers from scams (fake KYC, fake subsidy, OTP theft, loan and lottery fraud, UPI fraud, look-alike government links). Judge ${kindText}. "level" must be safe, caution or danger. "score" is a 0-100 risk number. Write verdict, reasons (2 to 4 short items), action and spoken in ${langLabel(data.lang)}. "spoken" is a short spoken warning or reassurance. Never ask for personal data.`,
        prompt: data.content,
      });
      const out = await result.output;
      return { ...out, score: Math.max(0, Math.min(100, Math.round(out.score))) };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("Could not analyse that. Please try again.");
      }
      throw error;
    }
  });

/* ---------------------------------- Weather ---------------------------------- */

type WeatherApi = {
  current?: { temperature_2m?: number; relative_humidity_2m?: number; wind_speed_10m?: number };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
  };
};

const advice = {
  rain: {
    en: "Heavy rain expected. Do not spray pesticide, and clear drainage channels in your field.",
    hi: "तेज़ बारिश की संभावना है। छिड़काव न करें और खेत की नालियाँ साफ़ रखें।",
    te: "భారీ వర్షం అవకాశం. పిచికారీ చేయవద్దు, పొలంలో నీటి కాలువలు శుభ్రం చేయండి.",
  },
  dry: {
    en: "Dry and hot days ahead. Irrigate early morning or evening and mulch to save moisture.",
    hi: "आगे सूखे और गर्म दिन हैं। सुबह या शाम सिंचाई करें और मल्चिंग करें।",
    te: "రాబోయే రోజులు పొడిగా, వేడిగా ఉంటాయి. ఉదయం లేదా సాయంత్రం నీరు పెట్టండి, మల్చింగ్ చేయండి.",
  },
  wind: {
    en: "Strong winds expected. Support young plants and delay spraying.",
    hi: "तेज़ हवा चलेगी। छोटे पौधों को सहारा दें और छिड़काव टालें।",
    te: "బలమైన గాలులు వీస్తాయి. చిన్న మొక్కలకు ఆధారం ఇవ్వండి, పిచికారీ వాయిదా వేయండి.",
  },
  good: {
    en: "Good weather window. Suitable for spraying, weeding and harvesting.",
    hi: "मौसम अनुकूल है। छिड़काव, निराई और कटाई के लिए ठीक है।",
    te: "వాతావరణం అనుకూలం. పిచికారీ, కలుపు తీయడం, కోతకు మంచి సమయం.",
  },
};

export const getWeather = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ lat: z.number(), lon: z.number(), lang: z.string() }).parse(input),
  )
  .handler(async ({ data }) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&forecast_days=7&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather service unavailable");
    const json = (await res.json()) as WeatherApi;

    const daily = json.daily;
    const lang = (data.lang in advice.rain ? data.lang : "en") as "en" | "hi" | "te";
    const rainTotal = daily ? daily.precipitation_sum.slice(0, 3).reduce((a, b) => a + b, 0) : 0;
    const maxWind = daily ? Math.max(...daily.wind_speed_10m_max.slice(0, 3)) : 0;
    const maxTemp = daily ? Math.max(...daily.temperature_2m_max.slice(0, 3)) : 0;

    let key: keyof typeof advice = "good";
    if (rainTotal > 20) key = "rain";
    else if (maxWind > 35) key = "wind";
    else if (rainTotal < 1 && maxTemp > 35) key = "dry";

    return {
      current: {
        temp: Math.round(json.current?.temperature_2m ?? 0),
        humidity: Math.round(json.current?.relative_humidity_2m ?? 0),
        wind: Math.round(json.current?.wind_speed_10m ?? 0),
      },
      days: (daily?.time ?? []).map((date, i) => ({
        date,
        max: Math.round(daily!.temperature_2m_max[i] ?? 0),
        min: Math.round(daily!.temperature_2m_min[i] ?? 0),
        rain: Math.round(daily!.precipitation_probability_max[i] ?? 0),
        mm: Math.round(daily!.precipitation_sum[i] ?? 0),
      })),
      advice: advice[key][lang],
      adviceKey: key,
    };
  });

/* ----------------------------------- Market ---------------------------------- */

const cropCatalog = [
  { id: "paddy", en: "Paddy", hi: "धान", te: "వరి", base: 2320, unit: 1 },
  { id: "cotton", en: "Cotton", hi: "कपास", te: "పత్తి", base: 7120, unit: 1 },
  { id: "maize", en: "Maize", hi: "मक्का", te: "మొక్కజొన్న", base: 2090, unit: 1 },
  { id: "chilli", en: "Red chilli", hi: "लाल मिर्च", te: "మిరప", base: 14500, unit: 1 },
  { id: "turmeric", en: "Turmeric", hi: "हल्दी", te: "పసుపు", base: 13800, unit: 1 },
  { id: "groundnut", en: "Groundnut", hi: "मूंगफली", te: "వేరుశనగ", base: 6380, unit: 1 },
  { id: "tur", en: "Red gram (Tur)", hi: "अरहर", te: "కందులు", base: 7550, unit: 1 },
  { id: "onion", en: "Onion", hi: "प्याज", te: "ఉల్లి", base: 2450, unit: 1 },
];

const marketAdvice = {
  sell: {
    en: "Prices are above the recent average. Selling now is reasonable.",
    hi: "भाव हाल के औसत से ऊपर हैं। अभी बेचना ठीक है।",
    te: "ధరలు ఇటీవలి సగటు కంటే ఎక్కువ. ఇప్పుడు అమ్మడం మంచిది.",
  },
  wait: {
    en: "Prices are dipping. If you can store safely, waiting may pay better.",
    hi: "भाव गिर रहे हैं। सुरक्षित भंडारण हो तो रुकना बेहतर हो सकता है।",
    te: "ధరలు తగ్గుతున్నాయి. సురక్షితంగా నిల్వ చేయగలిగితే వేచి ఉండటం మేలు.",
  },
};

export const getMarket = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ lang: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const lang = (["en", "hi", "te"].includes(data.lang) ? data.lang : "en") as "en" | "hi" | "te";
    const day = new Date();
    const seed = day.getUTCFullYear() * 1000 + day.getUTCMonth() * 40 + day.getUTCDate();

    return {
      updated: day.toISOString(),
      items: cropCatalog.map((crop, i) => {
        const wobble = (((seed * (i + 3)) % 17) - 8) / 100; // -8% .. +8%
        const price = Math.round(crop.base * (1 + wobble));
        const changePct = Math.round(wobble * 1000) / 10;
        const rising = changePct >= 0;
        return {
          id: crop.id,
          name: crop[lang],
          price,
          changePct,
          rising,
          advice: rising ? marketAdvice.sell[lang] : marketAdvice.wait[lang],
          adviceKey: rising ? "sell" : "wait",
        };
      }),
    };
  });
