import { createAutomaticDailyBrief, saveAndLoadDailyBriefs } from './daily-briefs.js';
import { isCronAuthorized } from './_lib/http.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }
  if (!isCronAuthorized(request)) return response.status(401).json({ error: 'Cron authorization required.' });

  try {
    const brief = await createAutomaticDailyBrief();
    if (!brief) return response.status(502).json({ error: 'No qualifying news was available.' });
    let storedBriefs = await saveAndLoadDailyBriefs(brief);
    let storage = 'primary';
    if (!storedBriefs) {
      const backendBase = process.env.BACKEND_API_URL || 'https://aquiretested-2.onrender.com';
      const backendResponse = await fetch(`${backendBase.replace(/\/$/, '')}/api/internal/daily-briefs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
        body: JSON.stringify(brief),
      });
      if (!backendResponse.ok) return response.status(503).json({ error: 'Database persistence is unavailable.' });
      storedBriefs = [brief];
      storage = 'backend';
    }
    response.setHeader('Cache-Control', 'no-store');
    return response.status(200).json({
      success: true,
      briefId: brief.briefId,
      generatedAt: brief.generatedAt,
      persisted: true,
      storage,
    });
  } catch (error) {
    console.error('Daily brief cron failed:', error?.message || 'unknown');
    return response.status(500).json({ error: 'Daily brief generation failed.' });
  }
}
