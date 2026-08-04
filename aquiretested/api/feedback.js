import { getDatabase } from './_lib/mongo.js';
import { allowSameSiteRequest, cleanMultilineText, cleanText, isEmail, rateLimit } from './_lib/http.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }
  if (!allowSameSiteRequest(request, response) || !rateLimit(request, response, { limit: 5 })) return;
  if (request.body?.website) return response.status(201).json({ success: true });

  const fullName = cleanText(request.body?.fullName, 100);
  const emailAddress = cleanText(request.body?.emailAddress, 254).toLowerCase();
  const feedback = cleanMultilineText(request.body?.feedback, 2_000);
  const rating = Number(request.body?.rating);
  if (!fullName || !isEmail(emailAddress) || !feedback || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return response.status(400).json({ error: 'Valid name, email, rating and feedback are required.' });
  }

  try {
    const db = await getDatabase();
    const result = await db.collection('feedbacks').insertOne({
      fullName,
      emailAddress,
      feedback,
      rating,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return response.status(201).json({ success: true, id: String(result.insertedId) });
  } catch {
    try {
      const backendBase = process.env.BACKEND_API_URL || 'https://aquiretested-2.onrender.com';
      const backendResponse = await fetch(`${backendBase.replace(/\/$/, '')}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, emailAddress, feedback, rating }),
      });
      if (!backendResponse.ok) throw new Error('Backend storage failed.');
      const backendData = await backendResponse.json();
      return response.status(201).json({ success: true, id: backendData.id || '', storage: 'backend' });
    } catch {
      return response.status(503).json({ error: 'Feedback could not be saved right now.' });
    }
  }
}
