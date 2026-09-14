export type VoiceRoute =
  | "/"
  | "/sathi"
  | "/crop"
  | "/weather"
  | "/market"
  | "/kavach"
  | "/schemes"
  | "/timeline"
  | "/me";

const rules: { to: VoiceRoute; words: string[] }[] = [
  { to: "/crop", words: ["crop", "doctor", "leaf", "disease", "పంట", "డాక్టర్", "फसल", "डॉक्टर", "रोग"] },
  {
    to: "/kavach",
    words: ["kavach", "cyber", "scam", "fraud", "otp", "కవచ", "సైబర్", "మోసం", "कवच", "साइबर", "धोखा"],
  },
  {
    to: "/weather",
    words: ["weather", "rain", "forecast", "వాతావరణ", "వర్షం", "मौसम", "बारिश"],
  },
  { to: "/market", words: ["market", "price", "mandi", "rate", "sell", "మార్కెట్", "ధర", "बाज़ार", "बाजार", "भाव", "मंडी"] },
  {
    to: "/schemes",
    words: ["scheme", "subsidy", "government", "yojana", "పథక", "ప్రభుత్వ", "योजना", "सरकारी"],
  },
  { to: "/timeline", words: ["history", "timeline", "past", "చరిత్ర", "గత", "इतिहास", "पिछला"] },
  { to: "/me", words: ["profile", "my details", "account", "వివరాలు", "ప్రొఫైల్", "मेरी जानकारी", "प्रोफ़ाइल", "प्रोफाइल"] },
  { to: "/sathi", words: ["sathi", "chat", "assistant", "సాథి", "మాట్లాడు", "साथी", "बात"] },
  { to: "/", words: ["home", "dashboard", "main", "హోమ్", "ముఖ్య", "होम", "मुख्य"] },
];

const openHints = [
  "open",
  "show",
  "go to",
  "take me",
  "tell",
  "చూపించు",
  "తెరువు",
  "చెప్పు",
  "खोलो",
  "खोलें",
  "दिखाओ",
  "बताओ",
  "बताइए",
];

/**
 * Returns a route when the spoken phrase is a navigation command,
 * otherwise null so the phrase is treated as a question for Sathi360.
 */
export function matchVoiceCommand(phrase: string): VoiceRoute | null {
  const text = phrase.toLowerCase().trim();
  if (!text) return null;

  const isCommand = openHints.some((hint) => text.includes(hint));
  const words = text.split(/\s+/);
  const short = words.length <= 5;
  if (!isCommand && !short) return null;

  for (const rule of rules) {
    if (rule.words.some((word) => text.includes(word.toLowerCase()))) return rule.to;
  }
  return null;
}
