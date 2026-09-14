import * as React from "react";

export type Lang = "te" | "hi" | "en";

export const LANGS: { code: Lang; label: string; native: string; speech: string }[] = [
  { code: "te", label: "Telugu", native: "తెలుగు", speech: "te-IN" },
  { code: "hi", label: "Hindi", native: "हिन्दी", speech: "hi-IN" },
  { code: "en", label: "English", native: "English", speech: "en-IN" },
];

type Dict = Record<string, string>;

const en: Dict = {
  appName: "Raithu Kavach",
  appSub: "Sathi360 AI",
  tagline: "Your farm's guardian and guide",
  chooseLanguage: "Choose your language",
  continue: "Continue",
  navSathi: "Sathi",
  navCrop: "Crop",
  navWeather: "Weather",
  navMarket: "Market",
  navKavach: "Kavach",
  navMe: "Me",
  sathiTitle: "Sathi360",
  sathiHint: "Hold the mic and ask anything about your farm",
  sathiWelcome:
    "Namaste! I am Sathi360, your farming companion. Ask me about crops, pests, weather, prices or schemes.",
  listening: "Listening…",
  thinking: "Thinking…",
  speak: "Hold to speak",
  stopSpeaking: "Stop voice",
  typeHere: "Type your question…",
  send: "Send",
  micDenied: "Microphone is not available. Please type your question instead.",
  cropTitle: "Crop Doctor",
  cropHint: "Take a clear photo of the affected leaf or plant",
  takePhoto: "Take / choose photo",
  diagnose: "Diagnose",
  diagnosing: "Examining your crop…",
  disease: "Likely problem",
  severity: "Severity",
  organic: "Organic remedy",
  chemical: "Chemical remedy",
  prevention: "Prevention",
  pastScans: "Past scans",
  noScans: "No scans yet.",
  weatherTitle: "Weather Intelligence",
  today: "Today",
  next7: "Next 7 days",
  farmAdvice: "Farm advice",
  locating: "Finding your location…",
  useMyLocation: "Use my location",
  marketTitle: "Market Intelligence",
  price: "Price",
  perQuintal: "per quintal",
  advice: "Suggestion",
  sellNow: "Sell now",
  wait: "Wait",
  kavachTitle: "Cyber Kavach",
  kavachSub: "Protection from frauds and scams",
  scamCall: "Scam Call",
  smsCheck: "SMS Check",
  linkCheck: "Link Check",
  scamCallHint: "Tell or type what the caller said",
  smsHint: "Paste the message you received",
  linkHint: "Paste the link you want to check",
  check: "Check",
  checking: "Checking…",
  riskSafe: "Safe",
  riskCaution: "Be careful",
  riskDanger: "Danger — fraud",
  whyLabel: "Why",
  whatToDo: "What to do",
  schemesTitle: "Government Schemes",
  searchSchemes: "Search schemes",
  eligibility: "Who can apply",
  benefit: "Benefit",
  howToApply: "How to apply",
  sos: "SOS",
  sosTitle: "Emergency SOS",
  sosConfirm: "Send emergency alert now?",
  sosSent: "Alert ready — sharing your location with your contacts.",
  cancel: "Cancel",
  confirm: "Yes, send",
  meTitle: "My Profile",
  name: "Name",
  village: "Village",
  land: "Land (acres)",
  crops: "Crops",
  contacts: "Emergency contacts (phone numbers)",
  language: "Language",
  save: "Save",
  saved: "Saved",
  errorGeneric: "Something went wrong. Please try again.",
};

const te: Dict = {
  appName: "రైతు కవచ్",
  appSub: "సాథి360 AI",
  tagline: "మీ పొలానికి రక్షణ, మార్గదర్శనం",
  chooseLanguage: "మీ భాషను ఎంచుకోండి",
  continue: "కొనసాగించు",
  navSathi: "సాథి",
  navCrop: "పంట",
  navWeather: "వాతావరణం",
  navMarket: "మార్కెట్",
  navKavach: "కవచ్",
  navMe: "నేను",
  sathiTitle: "సాథి360",
  sathiHint: "మైక్ నొక్కి పట్టుకుని పొలం గురించి ఏదైనా అడగండి",
  sathiWelcome:
    "నమస్తే! నేను సాథి360, మీ వ్యవసాయ సహాయకుడు. పంటలు, పురుగులు, వాతావరణం, ధరలు, పథకాల గురించి అడగండి.",
  listening: "వింటున్నాను…",
  thinking: "ఆలోచిస్తున్నాను…",
  speak: "మాట్లాడటానికి నొక్కి పట్టుకోండి",
  stopSpeaking: "వాయిస్ ఆపు",
  typeHere: "మీ ప్రశ్న టైప్ చేయండి…",
  send: "పంపు",
  micDenied: "మైక్రోఫోన్ అందుబాటులో లేదు. దయచేసి టైప్ చేయండి.",
  cropTitle: "పంట డాక్టర్",
  cropHint: "ప్రభావిత ఆకు లేదా మొక్క ఫోటో స్పష్టంగా తీయండి",
  takePhoto: "ఫోటో తీయండి / ఎంచుకోండి",
  diagnose: "పరీక్షించు",
  diagnosing: "మీ పంటను పరిశీలిస్తున్నాను…",
  disease: "సమస్య",
  severity: "తీవ్రత",
  organic: "సహజ చికిత్స",
  chemical: "రసాయన చికిత్స",
  prevention: "నివారణ",
  pastScans: "గత పరీక్షలు",
  noScans: "ఇంకా పరీక్షలు లేవు.",
  weatherTitle: "వాతావరణ సమాచారం",
  today: "ఈ రోజు",
  next7: "రాబోయే 7 రోజులు",
  farmAdvice: "వ్యవసాయ సలహా",
  locating: "మీ ప్రాంతం కనుగొంటున్నాను…",
  useMyLocation: "నా ప్రాంతం ఉపయోగించు",
  marketTitle: "మార్కెట్ సమాచారం",
  price: "ధర",
  perQuintal: "క్వింటాల్‌కు",
  advice: "సూచన",
  sellNow: "ఇప్పుడే అమ్మండి",
  wait: "వేచి ఉండండి",
  kavachTitle: "సైబర్ కవచ్",
  kavachSub: "మోసాల నుండి రక్షణ",
  scamCall: "మోసపు కాల్",
  smsCheck: "SMS పరీక్ష",
  linkCheck: "లింక్ పరీక్ష",
  scamCallHint: "కాల్ చేసిన వ్యక్తి ఏమి చెప్పారో చెప్పండి",
  smsHint: "మీకు వచ్చిన మెసేజ్ ఇక్కడ పెట్టండి",
  linkHint: "పరీక్షించాల్సిన లింక్ ఇక్కడ పెట్టండి",
  check: "పరీక్షించు",
  checking: "పరీక్షిస్తున్నాను…",
  riskSafe: "సురక్షితం",
  riskCaution: "జాగ్రత్త",
  riskDanger: "ప్రమాదం — మోసం",
  whyLabel: "కారణం",
  whatToDo: "ఏం చేయాలి",
  schemesTitle: "ప్రభుత్వ పథకాలు",
  searchSchemes: "పథకాలు వెతకండి",
  eligibility: "ఎవరు అర్హులు",
  benefit: "ప్రయోజనం",
  howToApply: "ఎలా దరఖాస్తు చేయాలి",
  sos: "సహాయం",
  sosTitle: "అత్యవసర సహాయం",
  sosConfirm: "ఇప్పుడే అత్యవసర సందేశం పంపాలా?",
  sosSent: "సందేశం సిద్ధం — మీ ప్రాంతం మీ వారికి పంపుతున్నాము.",
  cancel: "రద్దు",
  confirm: "అవును, పంపు",
  meTitle: "నా వివరాలు",
  name: "పేరు",
  village: "గ్రామం",
  land: "భూమి (ఎకరాలు)",
  crops: "పంటలు",
  contacts: "అత్యవసర ఫోన్ నంబర్లు",
  language: "భాష",
  save: "సేవ్ చేయండి",
  saved: "సేవ్ అయింది",
  errorGeneric: "ఏదో పొరపాటు జరిగింది. మళ్లీ ప్రయత్నించండి.",
};

const hi: Dict = {
  appName: "रैतु कवच",
  appSub: "साथी360 AI",
  tagline: "आपके खेत का रक्षक और मार्गदर्शक",
  chooseLanguage: "अपनी भाषा चुनें",
  continue: "आगे बढ़ें",
  navSathi: "साथी",
  navCrop: "फसल",
  navWeather: "मौसम",
  navMarket: "बाज़ार",
  navKavach: "कवच",
  navMe: "मैं",
  sathiTitle: "साथी360",
  sathiHint: "माइक दबाकर खेती से जुड़ा कोई भी सवाल पूछें",
  sathiWelcome:
    "नमस्ते! मैं साथी360 हूँ, आपका खेती साथी। फसल, कीट, मौसम, भाव या योजनाओं के बारे में पूछें।",
  listening: "सुन रहा हूँ…",
  thinking: "सोच रहा हूँ…",
  speak: "बोलने के लिए दबाए रखें",
  stopSpeaking: "आवाज़ बंद करें",
  typeHere: "अपना सवाल लिखें…",
  send: "भेजें",
  micDenied: "माइक्रोफ़ोन उपलब्ध नहीं है। कृपया सवाल लिखें।",
  cropTitle: "फसल डॉक्टर",
  cropHint: "प्रभावित पत्ती या पौधे की साफ़ फ़ोटो लें",
  takePhoto: "फ़ोटो लें / चुनें",
  diagnose: "जाँच करें",
  diagnosing: "आपकी फसल देख रहा हूँ…",
  disease: "संभावित समस्या",
  severity: "गंभीरता",
  organic: "जैविक उपाय",
  chemical: "रासायनिक उपाय",
  prevention: "रोकथाम",
  pastScans: "पिछली जाँच",
  noScans: "अभी कोई जाँच नहीं।",
  weatherTitle: "मौसम जानकारी",
  today: "आज",
  next7: "अगले 7 दिन",
  farmAdvice: "खेती सलाह",
  locating: "आपका स्थान खोज रहे हैं…",
  useMyLocation: "मेरा स्थान इस्तेमाल करें",
  marketTitle: "बाज़ार जानकारी",
  price: "भाव",
  perQuintal: "प्रति क्विंटल",
  advice: "सुझाव",
  sellNow: "अभी बेचें",
  wait: "रुकें",
  kavachTitle: "साइबर कवच",
  kavachSub: "धोखाधड़ी से सुरक्षा",
  scamCall: "फ़र्ज़ी कॉल",
  smsCheck: "SMS जाँच",
  linkCheck: "लिंक जाँच",
  scamCallHint: "कॉल करने वाले ने क्या कहा, बताएं या लिखें",
  smsHint: "आपको मिला संदेश यहाँ पेस्ट करें",
  linkHint: "जाँचने वाला लिंक यहाँ पेस्ट करें",
  check: "जाँचें",
  checking: "जाँच हो रही है…",
  riskSafe: "सुरक्षित",
  riskCaution: "सावधान रहें",
  riskDanger: "खतरा — धोखा",
  whyLabel: "कारण",
  whatToDo: "क्या करें",
  schemesTitle: "सरकारी योजनाएँ",
  searchSchemes: "योजनाएँ खोजें",
  eligibility: "कौन आवेदन कर सकता है",
  benefit: "लाभ",
  howToApply: "आवेदन कैसे करें",
  sos: "मदद",
  sosTitle: "आपातकालीन मदद",
  sosConfirm: "अभी आपातकालीन संदेश भेजें?",
  sosSent: "संदेश तैयार — आपका स्थान अपनों को भेजा जा रहा है।",
  cancel: "रद्द करें",
  confirm: "हाँ, भेजें",
  meTitle: "मेरी जानकारी",
  name: "नाम",
  village: "गाँव",
  land: "ज़मीन (एकड़)",
  crops: "फसलें",
  contacts: "आपातकालीन फ़ोन नंबर",
  language: "भाषा",
  save: "सेव करें",
  saved: "सेव हो गया",
  errorGeneric: "कुछ गड़बड़ हुई। दोबारा कोशिश करें।",
};

const dicts: Record<Lang, Dict> = { en, te, hi };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof en | string) => string;
  speechLocale: string;
  ready: boolean;
};

const LangContext = React.createContext<Ctx | null>(null);
const STORAGE_KEY = "rk_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored in dicts) setLangState(stored);
    setReady(true);
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = React.useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      ready,
      speechLocale: LANGS.find((l) => l.code === lang)?.speech ?? "en-IN",
      t: (key: string) => dicts[lang][key] ?? en[key] ?? key,
    }),
    [lang, setLang, ready],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

export function hasStoredLang() {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(STORAGE_KEY));
}

export const languageName: Record<Lang, string> = {
  te: "Telugu",
  hi: "Hindi",
  en: "English",
};
