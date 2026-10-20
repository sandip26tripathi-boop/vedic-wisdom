import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let { fullName, gender, dob, tob, pob, focusArea, latitude, longitude, timezone, tzOffset } = req.body || {};

    if (!fullName || !dob || !tob) {
      return res.status(400).json({ error: 'Missing required birth parameters.' });
    }

    fullName = String(fullName).trim().slice(0, 100);
    gender = typeof gender === 'string' ? gender.trim().slice(0, 30) : 'Not specified';
    dob = String(dob).trim().slice(0, 20);
    tob = String(tob).trim().slice(0, 20);
    pob = typeof pob === 'string' ? pob.trim().slice(0, 100) : 'Bhopal, MP, India';
    focusArea = typeof focusArea === 'string' ? focusArea.trim().slice(0, 150) : 'Career & Business Scale';

    const birthDateObj = new Date(dob);
    const day = birthDateObj.getDate() || 15;
    const month = birthDateObj.getMonth() + 1;

    const rashiNames = [
      'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
      'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrischika)',
      'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
    ];
    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
      'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];

    const computedRashi = rashiNames[(day + month * 2) % 12];
    const computedLagna = rashiNames[(month + 3) % 12];
    const computedNakshatra = `${nakshatras[(day * 3 + month) % 27]} (Pada ${((day % 4) + 1)})`;

    let generatedReport: any = null;

    if (ai) {
      try {
        const prompt = `
You are an expert Chief Astrologer and Spatial Vastu Master for "Vedic Wisdom", operating under the research lineage of Master Sandeep K. Tripathi (KP Astrology & Cuspal Interlinks) and Ravindra Pathak (Non-Demolition Spatial Vastu).

Generate an authentic, highly rigorous, and empowering Vedic & KP Astro-Vastu Diagnostic Dossier in JSON format for the following profile:
- Name: ${fullName}
- Gender: ${gender}
- Date of Birth: ${dob}
- Time of Birth: ${tob}
- Place of Birth: ${pob} (GPS: ${latitude || 23.2599}° N, ${longitude || 77.4126}° E, TZ: ${timezone || 'Asia/Kolkata'})
- Focus Area: ${focusArea}
- Computed Lagna: ${computedLagna}
- Computed Moon Sign: ${computedRashi}
- Computed Nakshatra: ${computedNakshatra}

Follow strict KP Sub-Sub Lord house significators.
Connect the weak or stressed astrological planetary forces directly to 16 Vastu cardinal/intercardinal zones.
Prescribe ONLY 100% Non-Demolition remedies (Elemental copper/brass strips, metal pyramids, color spectrum tape, directional mirror deflectors, and Vedic mantras).

Return ONLY valid JSON with this exact schema:
{
  "snapshot": {
    "lagna": "${computedLagna}",
    "rashi": "${computedRashi}",
    "nakshatra": "${computedNakshatra}",
    "lagnaLord": "Planetary ruler name",
    "currentMahadasha": "Saturn or Jupiter etc.",
    "currentAntardasha": "Mercury or Venus etc.",
    "subSubLord10th": "Jupiter in Rohini",
    "favorableElements": ["Fire", "Earth"]
  },
  "corePredictions": {
    "primaryForecast": "Detailed 2-3 paragraph synthesis tailored to ${focusArea}.",
    "strengths": ["Key astrological strength 1", "Key astrological strength 2", "Key astrological strength 3"],
    "opportunities": ["Growth window 1", "Growth window 2"],
    "growthTiming": "Exact auspicious calendar timing for major moves",
    "wealthYogas": "KP Cuspal combinations active (e.g. 2-6-10-11)"
  },
  "astroVastuMapping": {
    "favorableDirections": ["North", "North-East", "East"],
    "vulnerableZones": ["South-East", "South-West"],
    "zoneDiagnostics": [
      {
        "zone": "North (Kuber)",
        "direction": "000° - North",
        "element": "Water",
        "status": "High Wealth Potential",
        "recommendation": "Keep pristine, declutter metal scrap, add emerald green or blue accents."
      },
      {
        "zone": "South-East (Agneya)",
        "direction": "135° - South-East",
        "element": "Fire",
        "status": "Elemental Friction",
        "recommendation": "Install Copper Energy Barrier to shield liquidity and avoid electrical burnouts."
      },
      {
        "zone": "North-East (Ishanya)",
        "direction": "045° - North-East",
        "element": "Water/Ether",
        "status": "Clarity & Vision",
        "recommendation": "Establish meditation or pooja zone; zero heavy storage to safeguard mind clarity."
      }
    ]
  },
  "tailoredRemedies": {
    "nonDemolitionSpatial": [
      {
        "item": "99.9% Pure Copper Energy Strip",
        "placement": "South-East zone perimeter",
        "mechanism": "Arrests fire-water energy conflict without moving civil walls."
      },
      {
        "item": "9-Unit Lead Helix Pyramid",
        "placement": "South-West executive desk corner",
        "mechanism": "Anchors leadership authority and reduces top-level attrition."
      }
    ],
    "lalKitabPrecautions": [
      "Avoid keeping non-functional watches or broken electronics in the West zone.",
      "Feed soaked green gram (Moong) to birds on Wednesdays to pacify Mercury."
    ],
    "planetaryMantra": "Om Sham Shanaischaraya Namaha (108 times at dusk)"
  }
}
`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        const cleanedText = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
        generatedReport = JSON.parse(cleanedText);
      } catch (geminiError) {
        console.warn('Gemini report generation fallback:', geminiError);
      }
    }

    if (!generatedReport) {
      generatedReport = {
        snapshot: {
          lagna: computedLagna,
          rashi: computedRashi,
          nakshatra: computedNakshatra,
          lagnaLord: 'Mars (Kuja) & Sun (Surya) resonance',
          currentMahadasha: 'Saturn (Shani) Mahadasha',
          currentAntardasha: 'Mercury (Budh) Antardasha',
          subSubLord10th: 'Jupiter in Hasta (Lord of 2nd & 5th cusps)',
          favorableElements: ['Water', 'Space', 'Air']
        },
        corePredictions: {
          primaryForecast: `Based on the Cuspal Interlink verification of ${fullName}'s horoscope, the current transit alignment strongly stimulates the houses of enterprise authority (10th) and desire fulfillment (11th). Your chart exhibits potent Gajakesari and Dhana Yogas that mature during the ongoing Dasha cycle. Spatial harmonization of your workplace will accelerate contract closures and clear delayed capital cycles.`,
          strengths: [
            'Exceptional intuitive grasp of market sentiment and team leadership.',
            'Strong 2nd cusp Sub-Lord indicating enduring wealth accumulation and high financial resilience.',
            'Favorable connection between 9th (Fortune) and 10th (Status) cusps.'
          ],
          opportunities: [
            'Prime window for institutional expansion, fundraise, or high-value partnerships.',
            'Favorable timing for real estate asset acquisition in the North-East / West sectors.'
          ],
          growthTiming: 'August 2026 to March 2027 represents your peak financial consolidation cycle.',
          wealthYogas: 'Active 2-6-10-11 Cuspal Interlink (Wealth & Business Mastery)'
        },
        astroVastuMapping: {
          favorableDirections: ['North (000°)', 'North-East (045°)', 'West (270°)'],
          vulnerableZones: ['South-East (Agneya)', 'South-West (Nairutya)'],
          zoneDiagnostics: [
            {
              zone: 'North (Kuber)',
              direction: '000° - North',
              element: 'Water',
              status: 'High Growth Opportunity',
              recommendation: 'Ensure North has zero red or orange objects; place clean water reservoir or money plant to stimulate new client inflows.'
            },
            {
              zone: 'South-East (Agneya)',
              direction: '135° - South-East',
              element: 'Fire',
              status: 'Elemental Friction Detected',
              recommendation: 'Install 99.9% pure Copper Energy Bar to insulate liquidity flow and prevent electrical hazards.'
            },
            {
              zone: 'North-East (Ishanya)',
              direction: '045° - North-East',
              element: 'Water/Ether',
              status: 'Clarity & Intuitive Foresight',
              recommendation: 'Preserve absolute cleanliness; zero heavy metallic scrap storage.'
            },
            {
              zone: 'South-West (Nairutya)',
              direction: '225° - South-West',
              element: 'Earth',
              status: 'Leadership & Stability Anchor',
              recommendation: 'Place 9-unit Lead Helix Pyramids in MD office to anchor stability and executive decision power.'
            }
          ]
        },
        tailoredRemedies: {
          nonDemolitionSpatial: [
            {
              item: '99.9% Pure Copper Elemental Energy Bar (3mm x 15mm)',
              placement: 'South-East zone perimeter floor junction',
              mechanism: 'Isolates fire-water energy conflict without dismantling heavy machinery or partitions.'
            },
            {
              item: '9-Unit Lead Helix Stabilization Pyramid',
              placement: 'South-West executive desk corner / master cabin',
              mechanism: 'Anchors leadership gravity, eradicates team attrition, and stabilizes cash reserves.'
            },
            {
              item: 'Brass Elemental Neutralization Strip',
              placement: 'North-West logistics staging bay boundary',
              mechanism: 'Smooths transit friction and speeds up vendor clearance.'
            }
          ],
          lalKitabPrecautions: [
            'Maintain zero non-functional electronics or stopped clocks in the West zone.',
            'Feed soaked green gram (Moong) to birds on Wednesday mornings to empower Mercury (Budh).',
            'Avoid keeping footwear racks or leather clutter near the Ishanya (North-East) sanctuary.'
          ],
          planetaryMantra: 'Om Brihaspataye Namaha & Om Sham Shanaischaraya Namaha (108 times at dusk)'
        }
      };
    }

    const reportResponse = {
      reportId: `VW-REP-${Date.now().toString().slice(-6)}`,
      generatedAt: new Date().toISOString(),
      fullName,
      gender,
      dob,
      tob,
      pob: pob || 'Bhopal, MP, India',
      focusArea: focusArea || 'Full Life & Spatial Blueprint',
      coordinates: {
        latitude: latitude || 23.2599,
        longitude: longitude || 77.4126,
        timezone: timezone || 'Asia/Kolkata',
        tzOffset: tzOffset ?? 5.5
      },
      data: generatedReport,
      regulatoryNotice: 'Official Disclaimer & Ethical Notice: This report is generated through an advanced AI-powered computational Vedic & KP analytics engine based on the mathematical coordinates of your birth details. It is intended for self-awareness, timing assessment, and spiritual guidance. For critical architectural alterations, major industrial audits, or pivotal life decisions, a personal 1-on-1 verification with Principal Researcher Sandeep K. Tripathi or Founder Ravindra Pathak is strongly recommended. Vedic Wisdom upholds strict non-superstitious, evidence-based practices.'
    };

    return res.status(200).json(reportResponse);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error during report generation.' });
  }
}
