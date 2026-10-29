export interface NavSubLink {
  name: string;
  nameHi?: string;
  href: string;
  targetId: string;
  desc?: string;
  descHi?: string;
  badge?: { en: string; hi: string };
}

export interface NavLinkItem {
  name: string;
  nameHi?: string;
  href: string;
  targetId: string;
  desc?: string;
  descHi?: string;
  badge?: { en: string; hi: string };
  subLinks?: NavSubLink[];
}

export const navLinks: NavLinkItem[] = [
  { 
    name: "Astrology", 
    nameHi: "ज्योतिष परामर्श",
    href: "/astrology",
    targetId: "astrology",
    desc: "Classical Vedic & KP Cuspal Interlink Analysis",
    descHi: "केपी कस्पल एवं प्रामाणिक वैदिक विश्लेषण",
    badge: { en: "Consult", hi: "परामर्श" }
  },
  { 
    name: "Astro-Vastu", 
    nameHi: "एस्ट्रो-वास्तु समाधान",
    href: "/astro-vastu",
    targetId: "astro-vastu",
    desc: "0% Non-Demolition Spatial Energy Corrections",
    descHi: "शून्य तोड़-फोड़ ऊर्जा वास्तु उपचार",
    badge: { en: "0% Demolition", hi: "बिना तोड़-फोड़" }
  },
  { 
    name: "Digital Reports", 
    nameHi: "डिजिटल जन्मपत्री",
    href: "/digital-reports",
    targetId: "digital-reports",
    desc: "Instant 24-page analytical dossier with planetary timing",
    descHi: "24-पृष्ठ की विस्तृत डिजिटल रिपोर्ट तुरंत डाउनलोड करें",
    badge: { en: "Instant PDF", hi: "पीडीएफ" }
  },
  { 
    name: "Academy & Courses", 
    nameHi: "अकादमी एवं कोर्सेज",
    href: "/academy",
    targetId: "academy",
    desc: "Certified KP Cuspal Interlink & Spatial Vastu Masterclass",
    descHi: "संदीप त्रिपाठी जी द्वारा प्रमाणिक केपी व वास्तु प्रशिक्षण",
    badge: { en: "Certified", hi: "सर्टिफाइड" }
  },
  { 
    name: "More", 
    nameHi: "अन्य विशिष्ट सेवाएं व मुहूर्त",
    href: "#",
    targetId: "consultations",
    subLinks: [
      { 
        name: "KP Cuspal Interlink (CIL)", 
        nameHi: "केपी कस्पल इंटरलिंक (CIL)",
        href: "/cil-astrology",
        targetId: "cil-astrology",
        desc: "Sub-Sub Lord precision planetary timing & rulings",
        descHi: "कस्पल सब-सब लॉर्ड सूक्ष्म गणना व जीवन निर्णय",
        badge: { en: "CIL", hi: "केपी" }
      },
      { 
        name: "Shubh Muhurta", 
        nameHi: "दैनिक शुभ मुहूर्त व चौघड़िया",
        href: "/muhurta",
        targetId: "muhurta",
        desc: "Live daily auspicious Muhurta windows (Amrit, Shubh, Labh)",
        descHi: "अमृत, शुभ व लाभ आदि कल्याणकारी मुहूर्तों की सूची",
        badge: { en: "Live", hi: "लाइव" }
      },
      { 
        name: "Numerology", 
        nameHi: "अंकशास्त्र (न्यूमरोलॉजी)",
        href: "/numerology",
        targetId: "numerology",
        desc: "Name vibration & life path destiny numbers",
        descHi: "नामांक, मूलांक व भाग्यांक विश्लेषण",
        badge: { en: "Numbers", hi: "अंकशास्त्र" }
      }
    ]
  }
];
