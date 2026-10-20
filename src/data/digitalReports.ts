export interface DigitalReportItem {
  id: string;
  titleEn: string;
  titleHi: string;
  badgeEn: string;
  badgeHi: string;
  descriptionEn: string;
  descriptionHi: string;
  priceInr: string;
  priceUsd: string;
  pagesEn: string;
  pagesHi: string;
  deliveryTimeEn: string;
  deliveryTimeHi: string;
  highlightsEn: string[];
  highlightsHi: string[];
  icon: string;
  sampleTopicsEn: string[];
  sampleTopicsHi: string[];
}

export const digitalReportsData: DigitalReportItem[] = [
  {
    id: "varshphal",
    titleEn: "Yearly Varshphal & KP Planetary Transit Report",
    titleHi: "वार्षिक वर्षफल एवं केपी ग्रहीय गोचर रिपोर्ट",
    badgeEn: "Most Popular Annual Dossier",
    badgeHi: "सर्वाधिक लोकप्रिय वार्षिक ग्रंथ",
    descriptionEn: "Complete 12-month month-by-month predictive roadmap combining Tajika Annual Solar Return chart, KP Sub-Lord transits, and Dasha timeline to capture opportunities and avoid financial setbacks.",
    descriptionHi: "12 महीनों का माह-वार भविष्यफल रोडमैप जिसमें ताजिक वर्षफल, केपी सब-लॉर्ड गोचर और दशा का गहन गणितीय विश्लेषण शामिल है ताकि आप सही समय पर बड़े निर्णय ले सकें।",
    priceInr: "₹999",
    priceUsd: "$19",
    pagesEn: "38–45 Pages PDF",
    pagesHi: "38–45 पृष्ठ विस्तृत पीडीएफ",
    deliveryTimeEn: "Instant Automated Delivery (Within 2 Hours)",
    deliveryTimeHi: "त्वरित ऑटोमेटेड डिलीवरी (2 घंटे के भीतर)",
    highlightsEn: [
      "Muntha lord position & yearly ruler (Varsheshwar) strength",
      "Month-by-month cashflow, health, and career index score",
      "Exact dates of Saturn & Jupiter transit aspect triggers",
      "Custom quarterly Lal Kitab remedies for annual pacification"
    ],
    highlightsHi: [
      "मुंथा स्वामी की स्थिति एवं वर्षेश का संपूर्ण बल विश्लेषण",
      "माह-वार आर्थिक प्रवाह, स्वास्थ्य और करियर स्कोर सूचकांक",
      "शनि व गुरु के महत्वपूर्ण गोचर एवं दृष्टि परिवर्तन की सही तिथियां",
      "वर्ष भर के लिए अनुकूल तिमाही लाल किताब के सटीक उपाय"
    ],
    icon: "Calendar",
    sampleTopicsEn: [
      "Q1 Financial Surge & Strategic Partnership Windows",
      "Q2 Regulatory / Legal Caution & Contract Screening",
      "Q3 Property / Capital Asset Acquisition Window",
      "Q4 Market Expansion & High-Return Investments"
    ],
    sampleTopicsHi: [
      "प्रथम तिमाही: धन आगमन एवं व्यावसायिक साझेदारी के शुभ योग",
      "द्वितीय तिमाही: कानूनी व सरकारी सावधानी एवं अनुबंध जांच",
      "तृतीय तिमाही: संपत्ति एवं भूमि क्रय के अनुकूल मुहूर्त",
      "चतुर्थ तिमाही: व्यापार विस्तार एवं उच्च रिटर्न वाले निवेश"
    ]
  },
  {
    id: "businessBlueprint",
    titleEn: "Business, Wealth & Career Blueprint",
    titleHi: "व्यापार, धन एवं करियर ब्लूप्रिंट",
    badgeEn: "High-Ticket Enterprise Dossier",
    badgeHi: "कॉर्पोरेट व उद्यमी विशेष",
    descriptionEn: "Mathematical KP Cuspal Interlink analysis of 2nd (wealth), 6th (debts & competitive victory), 10th (status & authority), and 11th (net profit) houses to blueprint your next 5-year growth trajectory.",
    descriptionHi: "द्वितीय (धन), षष्ठ (प्रतिस्पर्धा विजय), दशम (प्रतिष्ठा व पद), एवं एकादश (शुद्ध लाभ) भावों का केपी कस्पल इंटरलिंक विश्लेषण जो आपके अगले 5 वर्षों की विकास योजना तैयार करता है।",
    priceInr: "₹1,499",
    priceUsd: "$29",
    pagesEn: "50–60 Pages PDF",
    pagesHi: "50–60 पृष्ठ विस्तृत शोध ग्रंथ",
    deliveryTimeEn: "Same-Day PDF Delivery + Audio Overview",
    deliveryTimeHi: "उसी दिन पीडीएफ डिलीवरी + ऑडियो सारांश",
    highlightsEn: [
      "Micro-Sub-Sub Lord analysis of 10th and 11th cuspal links",
      "Stock market, equity fundraise, and debt clearance timing",
      "Partner synergy check: birth charts alignment for co-founders",
      "Favorable corporate branding colors, numbers, and metals"
    ],
    highlightsHi: [
      "दशम और एकादश कस्प के सब-सब लॉर्ड का सूक्ष्म संबंध",
      "शेयर बाजार निवेश, फंडरेज़िंग एवं ऋण मुक्ति का सटीक समय",
      "सह-संस्थापकों (Co-founders) का कुंडली मिलान एवं व्यावसायिक तालमेल",
      "कंपनी ब्रांडिंग हेतु अनुकूल रंग, अंक और धातु तत्व"
    ],
    icon: "TrendingUp",
    sampleTopicsEn: [
      "Cuspal Interlinks 2-6-10-11 Wealth Matrix",
      "Dasha-Bhukti-Antara Micro-Window for New Venture Launch",
      "Litigation & Competitor Shield Analysis (6th Cusp)",
      "Foreign Collaboration & Export Timing (9th & 12th Cusp)"
    ],
    sampleTopicsHi: [
      "कस्पल इंटरलिंक्स 2-6-10-11 महाधन योग मैट्रिक्स",
      "दशा-भुक्ति-अंतरा के अनुसार नए व्यवसाय के शुभारंभ का समय",
      "प्रतिस्पर्धा व मुकदमों से सुरक्षा (षष्ठ भाव विश्लेषण)",
      "विदेशी अनुबंध एवं निर्यात के शुभ अवसर (नवम व द्वादश भाव)"
    ]
  },
  {
    id: "lalKitabGuide",
    titleEn: "Lal Kitab Remedial & Karmic Correction Guide",
    titleHi: "लाल किताब उपाय एवं कर्म सुधार मार्गदर्शिका",
    badgeEn: "Practical Non-Invasive Remedies",
    badgeHi: "सटीक एवं व्यावहारिक उपाय",
    descriptionEn: "Authentic 1952 Farman principles decoding your chart's blind planets (Andha Teva), sleeping destiny (Soi Kismat), and ancestral debts (Rina) with safe, non-violent, zero-dogma remedial protocols.",
    descriptionHi: "1952 के प्रामाणिक लाल किताब सिद्धांतों पर आधारित। अंधे तेवे की पहचान, सोई किस्मत को जगाना और पितृ ऋण मुक्ति हेतु अहिंसक, सुरक्षित एवं शत-प्रतिशत वैज्ञानिक उपाय।",
    priceInr: "₹799",
    priceUsd: "$15",
    pagesEn: "30–35 Pages PDF",
    pagesHi: "30–35 पृष्ठ स्पष्ट उपाय गाइड",
    deliveryTimeEn: "Instant Automated Delivery (Within 2 Hours)",
    deliveryTimeHi: "त्वरित ऑटोमेटेड डिलीवरी (2 घंटे के भीतर)",
    highlightsEn: [
      "Identification of artificial (Masnui) planetary collisions",
      "Safe elemental offerings: specific metals, food to birds/cows",
      "Strict behavioral avoidances (Niyam) to prevent bad luck",
      "Rahu-Ketu and Saturn afflictions neutralized without fear"
    ],
    highlightsHi: [
      "मसनूई (बनावटी) ग्रहों के टकराव की पहचान और शमन",
      "सुरक्षित तत्व दान: विशेष धातु, पक्षी/गो-सेवा के सटीक नियम",
      "दैनिक आचरण में आवश्यक परहेज (नियम) जो दुर्भाग्य से बचाएं",
      "राहु-केतु व शनि की पीड़ा का बिना भयभीत किए सटीक समाधान"
    ],
    icon: "ShieldAlert",
    sampleTopicsEn: [
      "Awakening Your 9th & 10th Houses of Fortune",
      "Eliminating Ancestral Financial Obstacles (Pitri Rin)",
      "Mercury-Rahu Brain Fog Dispersal Remedies",
      "Home & Workplace Elemental Harmony Check"
    ],
    sampleTopicsHi: [
      "नवम व दशम भाव (किस्मत और कर्म) को जगाने की तकनीक",
      "पूर्वजों से जुड़े ऋण व आर्थिक रुकावटों का निवारण",
      "बुध-राहु भ्रम एवं गलत व्यावसायिक निर्णयों का शमन",
      "घर व कार्यालय के आचरण सुधार का दैनिक प्रोटोकॉल"
    ]
  },
  {
    id: "marriageMatch",
    titleEn: "Marriage Compatibility & 36-Guna Milan Dossier",
    titleHi: "विवाह अनुकूलता एवं 36-गुण मिलान विस्तृत ग्रंथ",
    badgeEn: "Deep Psychological & Astro Synergy",
    badgeHi: "गहन वैवाहिक एवं मानसिक तालमेल",
    descriptionEn: "Far beyond standard Ashta-Koota points: rigorous KP Cuspal Interlink analysis of 7th (spouse), 2nd (family harmony), and 11th (fulfillment of desire) cusps with Mangal Dosha and emotional compatibility.",
    descriptionHi: "केवल 36 गुणों की सामान्य गणना नहीं, बल्कि 7वें (जीवनसाथी), 2रे (कुटुंब सुख) और 11वें (इच्छापूर्ति) भावों का केपी कस्पल इंटरलिंक और मंगल दोष का गहन मनोवैज्ञानिक मिलान।",
    priceInr: "₹899",
    priceUsd: "$17",
    pagesEn: "40–45 Pages PDF",
    pagesHi: "40–45 पृष्ठ संपूर्ण विश्लेषण",
    deliveryTimeEn: "Instant Automated Delivery (Within 2 Hours)",
    deliveryTimeHi: "त्वरित ऑटोमेटेड डिलीवरी (2 घंटे के भीतर)",
    highlightsEn: [
      "Ashta-Koota 36-Guna detailed points breakdown",
      "KP Sub-Lord longevity and marital stability confirmation",
      "Nadi Dosha cancellation rules and genetic compatibility",
      "Financial synergy between partners post-nuptials"
    ],
    highlightsHi: [
      "अष्टकूट 36-गुणों का प्रत्येक बिंदु पर सूक्ष्म विश्लेषण",
      "केपी सब-लॉर्ड द्वारा वैवाहिक स्थिरता एवं आयु की पुष्टि",
      "नाड़ी दोष परिहार के शास्त्रीय नियम व आनुवंशिक अनुकूलता",
      "विवाह उपरांत दोनों के संयुक्त भाग्य व आर्थिक समृद्धि का योग"
    ],
    icon: "Heart",
    sampleTopicsEn: [
      "Emotional & Temperament Harmony (Manasika Guna)",
      "Longevity & Progeny Potential (Santana Bhava)",
      "Mutual Financial Luck & Career Growth Alignment",
      "Pre-Wedding Elemental Balancing Remedies"
    ],
    sampleTopicsHi: [
      "मानसिक एवं वैचारिक सामंजस्य (मनोवैज्ञानिक तालमेल)",
      "संतान सुख एवं पारिवारिक वंश वृद्धि के ग्रह योग",
      "विवाह उपरांत एक-दूसरे के करियर में भाग्य वृद्धि",
      "विवाह पूर्व करने योग्य विशिष्ट वैदिक शांति उपाय"
    ]
  }
];
