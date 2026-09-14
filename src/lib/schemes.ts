import type { Lang } from "./i18n";

type SchemeText = { name: string; benefit: string; eligibility: string; apply: string };

export type Scheme = {
  id: string;
  tag: string;
  text: Record<Lang, SchemeText>;
};

export const schemes: Scheme[] = [
  {
    id: "pm-kisan",
    tag: "Income support",
    text: {
      en: {
        name: "PM-KISAN",
        benefit: "Rs 6,000 a year paid directly to your bank account in three instalments.",
        eligibility: "Land-holding farmer families with Aadhaar linked to a bank account.",
        apply: "Register at your village revenue office or on the PM-KISAN portal with Aadhaar and land papers.",
      },
      hi: {
        name: "पीएम-किसान",
        benefit: "साल में 6,000 रुपये सीधे बैंक खाते में, तीन किस्तों में।",
        eligibility: "ज़मीन वाले किसान परिवार, आधार बैंक खाते से जुड़ा हो।",
        apply: "गाँव के राजस्व कार्यालय या पीएम-किसान पोर्टल पर आधार और ज़मीन के कागज़ के साथ पंजीकरण करें।",
      },
      te: {
        name: "పీఎం-కిసాన్",
        benefit: "సంవత్సరానికి రూ.6,000 మూడు విడతలుగా నేరుగా బ్యాంక్ ఖాతాలో.",
        eligibility: "భూమి ఉన్న రైతు కుటుంబాలు, ఆధార్ బ్యాంక్ ఖాతాతో అనుసంధానం ఉండాలి.",
        apply: "గ్రామ రెవెన్యూ కార్యాలయంలో లేదా పీఎం-కిసాన్ పోర్టల్‌లో ఆధార్, భూమి పత్రాలతో నమోదు చేసుకోండి.",
      },
    },
  },
  {
    id: "pmfby",
    tag: "Crop insurance",
    text: {
      en: {
        name: "Pradhan Mantri Fasal Bima Yojana",
        benefit: "Crop insurance against drought, flood, pest and post-harvest loss at a low premium.",
        eligibility: "All farmers growing notified crops, including tenant and sharecropper farmers.",
        apply: "Enrol through your bank, CSC centre or the crop insurance portal before the cut-off date for the season.",
      },
      hi: {
        name: "प्रधानमंत्री फसल बीमा योजना",
        benefit: "सूखा, बाढ़, कीट और कटाई बाद नुकसान पर कम प्रीमियम में फसल बीमा।",
        eligibility: "अधिसूचित फसल उगाने वाले सभी किसान, बटाईदार भी।",
        apply: "मौसम की अंतिम तारीख से पहले बैंक, सीएससी केंद्र या फसल बीमा पोर्टल पर नामांकन करें।",
      },
      te: {
        name: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన",
        benefit: "కరువు, వరద, పురుగులు, కోత తర్వాత నష్టాలకు తక్కువ ప్రీమియంతో పంట బీమా.",
        eligibility: "నోటిఫై చేసిన పంటలు సాగు చేసే రైతులందరూ, కౌలు రైతులతో సహా.",
        apply: "సీజన్ ఆఖరు తేదీకి ముందు బ్యాంకు, సీఎస్‌సీ కేంద్రం లేదా పంట బీమా పోర్టల్‌లో నమోదు చేసుకోండి.",
      },
    },
  },
  {
    id: "kcc",
    tag: "Credit",
    text: {
      en: {
        name: "Kisan Credit Card",
        benefit: "Short-term crop loan up to Rs 3 lakh at 4% interest with timely repayment.",
        eligibility: "Owner, tenant and oral lessee farmers, plus dairy and fisheries activities.",
        apply: "Apply at any bank branch with land record, Aadhaar and a passport photo.",
      },
      hi: {
        name: "किसान क्रेडिट कार्ड",
        benefit: "3 लाख रुपये तक फसल ऋण, समय पर चुकाने पर 4% ब्याज।",
        eligibility: "मालिक, बटाईदार किसान तथा पशुपालन व मत्स्य पालन करने वाले।",
        apply: "ज़मीन का रिकॉर्ड, आधार और फ़ोटो लेकर किसी बैंक शाखा में आवेदन करें।",
      },
      te: {
        name: "కిసాన్ క్రెడిట్ కార్డ్",
        benefit: "రూ.3 లక్షల వరకు పంట రుణం, సమయానికి చెల్లిస్తే 4% వడ్డీ.",
        eligibility: "సొంత, కౌలు రైతులు, పాడి, మత్స్య రంగ కార్యకలాపాలకు కూడా.",
        apply: "భూమి పత్రం, ఆధార్, ఫోటోతో ఏ బ్యాంకు శాఖలోనైనా దరఖాస్తు చేయండి.",
      },
    },
  },
  {
    id: "soil-health",
    tag: "Soil",
    text: {
      en: {
        name: "Soil Health Card",
        benefit: "Free soil testing with a fertiliser plan for your field, saving input cost.",
        eligibility: "Every farmer with cultivable land.",
        apply: "Give a soil sample at the nearest soil testing lab or Krishi Vigyan Kendra.",
      },
      hi: {
        name: "मृदा स्वास्थ्य कार्ड",
        benefit: "मुफ़्त मिट्टी जाँच और खेत के लिए उर्वरक योजना, लागत बचत।",
        eligibility: "खेती योग्य ज़मीन वाला हर किसान।",
        apply: "नज़दीकी मिट्टी जाँच प्रयोगशाला या कृषि विज्ञान केंद्र में नमूना दें।",
      },
      te: {
        name: "భూసార కార్డు",
        benefit: "ఉచిత భూసార పరీక్ష, మీ పొలానికి ఎరువుల ప్రణాళిక, ఖర్చు ఆదా.",
        eligibility: "సాగు భూమి ఉన్న ప్రతి రైతు.",
        apply: "సమీప భూసార పరీక్ష కేంద్రం లేదా కృషి విజ్ఞాన కేంద్రంలో మట్టి నమూనా ఇవ్వండి.",
      },
    },
  },
  {
    id: "pm-kusum",
    tag: "Solar",
    text: {
      en: {
        name: "PM-KUSUM",
        benefit: "Subsidy for solar pumps and solar power on barren land, cutting diesel and power bills.",
        eligibility: "Individual farmers, groups and cooperatives with an irrigation need.",
        apply: "Apply through your state renewable energy agency or discom portal.",
      },
      hi: {
        name: "पीएम-कुसुम",
        benefit: "सोलर पंप और बंजर ज़मीन पर सोलर बिजली पर सब्सिडी, डीज़ल व बिजली खर्च कम।",
        eligibility: "सिंचाई की ज़रूरत वाले किसान, समूह और सहकारी समितियाँ।",
        apply: "राज्य की नवीकरणीय ऊर्जा एजेंसी या बिजली कंपनी के पोर्टल पर आवेदन करें।",
      },
      te: {
        name: "పీఎం-కుసుమ్",
        benefit: "సోలార్ పంపులు, బీడు భూమిలో సౌర విద్యుత్తుకు రాయితీ, డీజిల్ కరెంటు ఖర్చు తగ్గుతుంది.",
        eligibility: "నీటిపారుదల అవసరం ఉన్న రైతులు, సంఘాలు, సహకార సంస్థలు.",
        apply: "రాష్ట్ర పునరుత్పాదక ఇంధన సంస్థ లేదా విద్యుత్ సంస్థ పోర్టల్‌లో దరఖాస్తు చేయండి.",
      },
    },
  },
  {
    id: "enam",
    tag: "Market",
    text: {
      en: {
        name: "e-NAM online mandi",
        benefit: "Sell produce to buyers across states and compare prices before selling.",
        eligibility: "Any farmer registered with a participating mandi.",
        apply: "Register with your APMC mandi office or on the e-NAM app with Aadhaar and bank details.",
      },
      hi: {
        name: "ई-नाम ऑनलाइन मंडी",
        benefit: "दूसरे राज्यों के खरीदारों को उपज बेचें और भाव तुलना करें।",
        eligibility: "भाग लेने वाली मंडी में पंजीकृत कोई भी किसान।",
        apply: "एपीएमसी मंडी कार्यालय या ई-नाम ऐप पर आधार और बैंक विवरण से पंजीकरण करें।",
      },
      te: {
        name: "ఈ-నామ్ ఆన్‌లైన్ మార్కెట్",
        benefit: "ఇతర రాష్ట్రాల కొనుగోలుదారులకు అమ్మవచ్చు, ధరలు పోల్చుకోవచ్చు.",
        eligibility: "పాల్గొనే మార్కెట్‌లో నమోదైన ఏ రైతైనా.",
        apply: "ఏఎంసీ మార్కెట్ కార్యాలయంలో లేదా ఈ-నామ్ యాప్‌లో ఆధార్, బ్యాంకు వివరాలతో నమోదు చేసుకోండి.",
      },
    },
  },
];

export const helplines = [
  { id: "kisan", label: "Kisan Call Centre", number: "1800-180-1551" },
  { id: "cyber", label: "Cyber Crime Helpline", number: "1930" },
  { id: "emergency", label: "Emergency", number: "112" },
  { id: "ambulance", label: "Ambulance", number: "108" },
];
