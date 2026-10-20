export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = String(req.query?.q || '').trim();
  if (!query || query.length < 2) {
    return res.status(200).json({ results: [] });
  }

  try {
    const osmUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=8`;
    const response = await fetch(osmUrl, {
      headers: { 'User-Agent': 'VedicWisdomPlatform/2.0 (deployment@vedicwisdom.org)' },
      signal: AbortSignal.timeout(3500)
    });

    if (response.ok) {
      const osmData = await response.json();
      if (Array.isArray(osmData) && osmData.length > 0) {
        const results = osmData.map((item: any) => {
          const lat = parseFloat(parseFloat(item.lat).toFixed(4));
          const lon = parseFloat(parseFloat(item.lon).toFixed(4));
          const countryCode = (item.address?.country_code || '').toLowerCase();
          const country = item.address?.country || '';
          const city = item.address?.city || item.address?.town || item.address?.village || item.name || query;
          const state = item.address?.state || '';

          let tzOffset = 5.5;
          if (countryCode === 'in' || country.toLowerCase().includes('india')) {
            tzOffset = 5.5;
          } else {
            tzOffset = Math.round((lon / 15) * 2) / 2;
          }

          return {
            displayName: item.display_name,
            city,
            state,
            country,
            lat,
            lon,
            tzOffset
          };
        });

        return res.status(200).json({ results });
      }
    }
  } catch (e) {
    // fallback
  }

  return res.status(200).json({ results: [] });
}
