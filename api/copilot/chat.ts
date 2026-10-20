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
    const { message, history } = req.body || {};
    const sanitizedMessage = typeof message === 'string' ? message.trim().slice(0, 1000) : '';

    if (!sanitizedMessage) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    let historyContext = '';
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history
        .filter((h: any) => h && typeof h.text === 'string')
        .slice(-6)
        .map((h: any) => `${h.sender === 'user' ? 'Client' : 'Vedic Advisor'}: ${h.text.replace(/[\r\n]+/g, ' ').trim().slice(0, 400)}`)
        .join('\n');
      if (recentHistory) {
        historyContext = `\n\nRecent Conversation History:\n${recentHistory}`;
      }
    }

    let reply = '';

    if (ai) {
      try {
        const systemInstruction = `
You are the dedicated Senior AI Astro-Vastu Copilot for "Vedic Wisdom", an enterprise-grade Indian consulting platform founded by Master Sandeep K. Tripathi and Ravindra Pathak.
Headquarters: 178 Maple High Street, Bhopal, MP, India. Hotline / WhatsApp: +91 90094 48601.

Your core mission:
- Provide rigorous, non-superstitious, mathematical, and practical insights on industrial factory defects, corporate boardroom alignments, and KP astrological timing.
- Always recommend 0% Non-Demolition remedies (e.g. Copper/Brass/Lead strips, Lecher antenna calibrations, color frequencies, pyramid stabilizers).
- Keep answers crisp, highly structured (use bullet points and bolding), authoritative, yet humble and ethical.
- If the question relates to complex industrial machinery, critical M&A timing, or deep Kundli verification, encourage connecting with Sandeep K. Tripathi via WhatsApp.
`;
        const chatPrompt = `${systemInstruction}${historyContext}\n\nCurrent Client Question: ${sanitizedMessage}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: chatPrompt,
        });

        reply = response.text || '';
      } catch (err) {
        console.warn('Gemini copilot fallback triggered:', err);
      }
    }

    if (!reply) {
      const lower = sanitizedMessage.toLowerCase();
      if (lower.includes('factory') || lower.includes('machine') || lower.includes('south-west') || lower.includes('breakdown')) {
        reply = `**Industrial Diagnosis & 0% Non-Demolition Correction:**\n\n1. **Root Spatial Cause:** Frequent machinery downtime typically stems from an elemental conflict in the **South-West (Nairutya - Earth)** or **South-East (Agneya - Fire)** zones.\n2. **Energy Vastu Rectification:**\n   - Place **9-unit Lead Helix Pyramids** along the South-West floor perimeter to anchor high-vibration equipment.\n   - Embed a **3mm x 15mm 99.9% pure Copper Energy Bar** between wet chiller conduits and heavy machinery to sever energetic leakage without civil tear-down.\n3. **KP Astrology Factor:** Check the 6th Cusp (Workplace stability) and 10th Cusp (Industrial throughput) Sub-Lords.\n\n*For a personalized CAD layout review, tap the WhatsApp button below to speak directly with our Bhopal Research Desk (+91 90094 48601).*`;
      } else if (lower.includes('money') || lower.includes('payment') || lower.includes('cash') || lower.includes('north') || lower.includes('receivable')) {
        reply = `**Cash Flow & Liquidity Spatial Strategy (North / Kuber Zone):**\n\n1. **Diagnostic Check:** Delayed receivables or sluggish sales often signify clutter, heavy iron scrap, or red/orange colors in the **North (000° - Water)** sector.\n2. **Non-Demolition Protocol:**\n   - Clear all red and maroon files or decor from the North zone; introduce blue or soothing off-white tones.\n   - Place an activated brass Kuber Yantra or energized green aventurine sphere in the North to stimulate client conversions.\n3. **KP Timing:** In KP Astrology, cash inflow is governed by houses **2 (Liquid Wealth)** and **11 (Fulfillment of Desires)**.\n\n*Tap below to transfer your factory coordinates to Sandeep Tripathi's research desk on WhatsApp.*`;
      } else {
        reply = `**Vedic Wisdom Guidance:**\n\nThank you for reaching out. In our methodology established by **Master Sandeep K. Tripathi** and **Ravindra Pathak**, we evaluate every challenge at the intersection of **KP Cuspal Interlink (CIL) Astrology** and **16-Zone Non-Demolition Energy Vastu**.\n\n- **Spatial Alignment:** Balanced cardinal zones ensure positive prana and frictionless physical operations.\n- **Planetary Timing:** Your current Mahadasha-Antardasha dictates the ideal window for aggressive expansion vs stabilization.\n- **Zero Demolition Guarantee:** We never recommend breaking walls; energetic metal strips, pyramids, and frequency tuning provide 100% mathematical correction.\n\n*Feel free to specify your property type (Factory, Office, Villa) or birth details for deeper analysis.*`;
      }
    }

    return res.status(200).json({ reply });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error in copilot.' });
  }
}
