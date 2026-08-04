import { getDatabase } from './_lib/mongo.js';
import {
  allowSameSiteRequest,
  cleanMultilineText,
  cleanText,
  isEmail,
  isIndianMobile,
  rateLimit,
} from './_lib/http.js';

const VALID_KINDS = new Set(['enquiry', 'brochure', 'newsletter']);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }
  if (!allowSameSiteRequest(request, response) || !rateLimit(request, response, { limit: 6 })) return;
  if (request.body?.website) return response.status(201).json({ success: true });

  const kind = VALID_KINDS.has(request.body?.kind) ? request.body.kind : 'enquiry';
  const emailAddress = cleanText(request.body?.emailAddress || request.body?.email, 254).toLowerCase();
  const fullName = cleanText(request.body?.fullName || request.body?.name, 100);
  const mobileNumber = cleanText(request.body?.mobileNumber || request.body?.phone, 20).replace(/\D/g, '');
  const message = cleanMultilineText(request.body?.message || request.body?.requirement, 3_000);
  const sourcePage = cleanText(request.body?.sourcePage, 300);

  if (!isEmail(emailAddress)) return response.status(400).json({ error: 'Enter a valid email address.' });
  if (kind !== 'newsletter' && (!fullName || !isIndianMobile(mobileNumber) || !message)) {
    return response.status(400).json({ error: 'Name, valid 10-digit mobile number and enquiry details are required.' });
  }

  try {
    const db = await getDatabase();
    const now = new Date();
    const record = {
      kind,
      fullName: fullName || 'Newsletter subscriber',
      emailAddress,
      mobileNumber: mobileNumber || null,
      message: message || 'Newsletter subscription',
      sourcePage,
      status: 'new',
      createdAt: now,
      updatedAt: now,
    };
    const collection = kind === 'newsletter' ? 'subscribers' : 'contactsubmissions';
    const result = kind === 'newsletter'
      ? await db.collection(collection).updateOne(
        { emailAddress },
        { $set: { ...record, updatedAt: now }, $setOnInsert: { createdAt: now } },
        { upsert: true },
      )
      : await db.collection(collection).insertOne(record);

    if (process.env.LEAD_NOTIFICATION_WEBHOOK_URL) {
      void fetch(process.env.LEAD_NOTIFICATION_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      }).catch(() => undefined);
    }

    return response.status(201).json({
      success: true,
      id: String(result.insertedId || result.upsertedId || ''),
      message: kind === 'newsletter' ? 'Subscription saved.' : 'Enquiry saved securely.',
    });
  } catch {
    try {
      const backendBase = process.env.BACKEND_API_URL || 'https://aquiretested-2.onrender.com';
      const backendResponse = await fetch(`${backendBase.replace(/\/$/, '')}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, fullName, emailAddress, mobileNumber, message, sourcePage }),
      });
      if (!backendResponse.ok) throw new Error('Backend storage failed.');
      const backendData = await backendResponse.json();
      return response.status(201).json({ success: true, id: backendData.id || '', storage: 'backend' });
    } catch {
      return response.status(503).json({ error: 'We could not save your request. Please call or WhatsApp our team.' });
    }
  }
}
