import React from 'react';
import { 
  Building, 
  MapPin, 
  AlertCircle, 
  Wrench, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  EyeOff
} from 'lucide-react';
import { Language } from '../../types/index.ts';

interface CaseStudiesSectionProps {
  currentLang?: Language;
  onOpenBooking?: (serviceType?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  currentLang = 'en',
  onOpenBooking
}) => {
  const isHi = currentLang === 'hi';

  const cases = [
    {
      id: 'case-1',
      titleEn: 'Balancing a North-East Cut in a 3-BHK Urban Apartment',
      titleHi: '3-BHK शहरी फ्लैट में ईशान कोण (NE) कट का गैर-तोड़फोड़ संतुलन',
      categoryEn: 'High-Rise Residential | Mumbai, MH',
      categoryHi: 'हाई-राइज बहुमंजिला फ्लैट | मुंबई',
      subtitleEn: 'Element Redistribution & Reflective Virtual Extension',
      subtitleHi: 'तत्व पुनर्संतुलन एवं दर्पण वर्चुअल विस्तार विधि',
      challengeEn: 'A high-rise 3-BHK flat featured an irregular construction notch in the North-East quadrant, causing recurring mental clutter and stagnant decision-making for an executive family without civil modification permissions.',
      challengeHi: 'हाई-राइज 3-BHK फ्लैट के ईशान कोण में निर्माण कट था, जिससे सोसाइटी नियमों के कारण दीवारें तोड़े बिना परिवार में मानसिक अशांति व निर्णय में भ्रम का सामना करना पड़ रहा था।',
      remedyEn: 'Applied water-element color frequencies (soft sky blues), installed calibrated copper energy strips along floor joints, and placed optical reflective buffers to virtually balance the spatial quadrant without removing any brickwork.',
      remedyHi: 'दीवार तोड़े बिना हल्के आसमानी रंग, फर्श जोड़ों में तांबे की सूक्ष्म ऊर्जा पट्टियां और कोणिक दर्पण लगाकर तत्व संतुलन स्थापित किया गया।',
      resultsEn: [
        'Noticeable improvement in mental clarity reported by occupants within 45 days',
        'Civil integrity maintained with complete non-structural protocol',
        'Clear directional alignment verified via repeated compass survey'
      ],
      resultsHi: [
        'निवासियों द्वारा 45 दिनों के भीतर मानसिक शांति व स्पष्टता का अनुभव',
        'सोसाइटी नियमों के अनुरूप बिना किसी तोड़-फोड़ के संपूर्ण समाधान',
        'पुनः सर्वेक्षण में दिशात्मक संतुलन की स्पष्ट पुष्टि'
      ],
      impactEn: 'Non-Structural Rectification',
      impactHi: 'गैर-तोड़फोड़ सुधार'
    },
    {
      id: 'case-2',
      titleEn: 'Enhancing Focus in a Remote Tech Consultant’s Home Workspace',
      titleHi: 'रिमोट टेक कंसल्टेंट के गृह कार्यालय में एकाग्रता व स्थिरता सुधार',
      categoryEn: 'Work-from-Home Studio | Bengaluru, KA',
      categoryHi: 'वर्क-फ्रॉम-होम स्टूडियो | बेंगलुरु',
      subtitleEn: 'South-West Earth Axis Reorientation',
      subtitleHi: 'नैऋत्य (SW) पृथ्वी तत्व दिशात्मक अनुकूलन',
      challengeEn: 'Senior software consultant experienced creative exhaustion and unstable project pipelines while working from a makeshift North-West desk facing a clutter-heavy doorway.',
      challengeHi: 'सीनियर सॉफ़्टवेयर कंसल्टेंट वायव्य कोण में मुख्य द्वार की ओर मुख करके काम कर रहे थे, जिससे बार-बार एकाग्रता भंग व कार्य में असंतुलन हो रहा था।',
      remedyEn: 'Relocated the primary working desk to the South-West quadrant facing North/East, anchored the workstation with an earthy terracotta frequency, and decluttered electrical cable conduits.',
      remedyHi: 'कार्यकारी मेज को नैऋत्य कोण में स्थापित कर मुख उत्तर/पूर्व की ओर किया गया तथा पृथ्वी तत्व के रंग व केबल प्रबंधन द्वारा स्थिरता लाई गई।',
      resultsEn: [
        'Improved sustained daily focus during deep-work engineering sprints',
        'Systematic project contract renewals observed over following quarter',
        'Physical ergonomic comfort aligned with classical space guidelines'
      ],
      resultsHi: [
        'गहन कोडिंग व रणनीतिक बैठकों में प्रतिदिन बेहतर एकाग्रता',
        'अगली तिमाही में प्रोजेक्ट अनुबंधों में सुचारु निरंतरता',
        'पारंपरिक दिशा नियमों के साथ व्यावहारिक सुविधा'
      ],
      impactEn: 'Productivity Optimization',
      impactHi: 'कार्यक्षमता संवर्धन'
    },
    {
      id: 'case-3',
      titleEn: 'Addressing Water-Fire Axis Clash in a Ground-Floor Villa Kitchen',
      titleHi: 'ग्राउंड-फ्लोर विला किचन में अग्नि-जल अक्षीय अंतर्विरोध का समाधान',
      categoryEn: 'Independent Villa | Bhopal, MP',
      categoryHi: 'स्वतंत्र कोठी | भोपाल',
      subtitleEn: 'Visual Elemental Buffer & Non-Invasive Neutralization',
      subtitleHi: 'तत्वीय मध्यस्थ पट्टी व गैर-आक्रामक सामंजस्य',
      challengeEn: 'An independent luxury villa had its primary cooktop placed adjacent to the main water sink in the North quadrant, leading to recurrent friction and unnecessary household expenditures.',
      challengeHi: 'विला की रसोई में चूल्हा (अग्नि) और सिंक (जल) बिल्कुल पास-पास उत्तर दिशा में स्थापित थे, जिससे गृह-सज्जा में तत्वीय अंतर्विरोध उत्पन्न हो रहा था।',
      remedyEn: 'Separated the thermodynamic conflict by introducing a green-granite elemental barrier strip and wood-element wooden accessories between sink and cooktop, avoiding expensive kitchen remodeling.',
      remedyHi: 'महंगे किचन नवीनीकरण के बिना चूल्हे व सिंक के मध्य हरे पत्थर की तटस्थ पट्टी व लकड़ी के तत्वों द्वारा अग्नि-जल टकराव को शांत किया गया।',
      resultsEn: [
        'Zero structural remodeling cost; completed in a single afternoon',
        'Improved domestic tranquility and harmonious food preparation atmosphere',
        'Logical, elegant spatial refinement praised by the homeowners'
      ],
      resultsHi: [
        'शून्य तोड़-फोड़ लागत; मात्र कुछ घंटों में सहजता से लागू',
        'पारिवारिक सौहार्द और रसोई के वातावरण में सकारात्मक शांति',
        'गृहस्वामियों द्वारा अत्यधिक सराहा गया तार्किक व सुरुचिपूर्ण उपाय'
      ],
      impactEn: 'Elemental Axis Harmony',
      impactHi: 'तत्व संतुलन'
    }
  ];

  return (
    <section 
      id="case-studies"
      aria-label={isHi ? "वास्तविक केस स्टडीज" : "Anonymized Case Studies"}
      className="w-full py-12 lg:py-16 bg-white dark:bg-[#0B0F19] border-t border-slate-200 dark:border-slate-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20 mb-3">
            <EyeOff className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHi ? "पहचान-गोपनीय वास्तविक उदाहरण" : "Redacted Real-World Case Studies"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100">
            {isHi 
              ? "व्यावहारिक चुनौतियां एवं उनके गैर-तोड़फोड़ समाधान" 
              : "Practical Spatial Challenges & Systematic Non-Structural Solutions"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 max-w-2xl mx-auto">
            {isHi
              ? "ग्राहक गोपनीयता अनुबंध के तहत नाम व सटीक पते गोपनीय रखे गए हैं। ये उदाहरण हमारी तर्कसंगत व गैर-तोड़फोड़ पद्धति को दर्शाते हैं।"
              : "All client identities and precise layout plans are strictly anonymized under our confidentiality framework. These cases illustrate rational, non-demolition space alignment."}
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-lg transition-all"
            >
              <div>
                {/* Location & Impact Pill */}
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{isHi ? item.categoryHi : item.categoryEn}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 shrink-0">
                    {isHi ? item.impactHi : item.impactEn}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug mb-1">
                  {isHi ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-[11px] font-semibold text-amber-900 dark:text-[#F3E5AB] mb-4">
                  {isHi ? item.subtitleHi : item.subtitleEn}
                </p>

                {/* Challenge */}
                <div className="mb-3.5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-xs">
                  <div className="flex items-center space-x-1.5 text-rose-800 dark:text-rose-400 font-bold mb-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{isHi ? "प्राथमिक चुनौती:" : "Identified Challenge:"}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                    {isHi ? item.challengeHi : item.challengeEn}
                  </p>
                </div>

                {/* Remedy */}
                <div className="mb-4 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 text-xs">
                  <div className="flex items-center space-x-1.5 text-amber-900 dark:text-[#F3E5AB] font-bold mb-1">
                    <Wrench className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{isHi ? "गैर-तोड़फोड़ समाधान:" : "Non-Demolition Protocol:"}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                    {isHi ? item.remedyHi : item.remedyEn}
                  </p>
                </div>

                {/* Results */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    {isHi ? "प्रेक्षित परिणाम (Observed Impact):" : "Observed Perspectives:"}
                  </span>
                  {(isHi ? item.resultsHi : item.resultsEn).map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start space-x-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Link */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onOpenBooking ? onOpenBooking(item.id) : window.location.assign('#pricing')}
                  className="w-full py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-amber-500 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>{isHi ? "समान परिस्थिति हेतु परामर्श लें" : "Consult for Similar Layout"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
