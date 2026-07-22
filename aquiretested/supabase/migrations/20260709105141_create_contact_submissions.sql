/*
# Create contact_submissions table

## Purpose
Stores all contact form submissions from the A&M Advisory website footer form.

## New Tables

### contact_submissions
Captures visitor enquiries submitted via the website contact form.

| Column      | Type        | Description                              |
|-------------|-------------|------------------------------------------|
| id          | uuid (PK)   | Auto-generated unique identifier         |
| name        | text        | Submitter's full name (required)         |
| email       | text        | Submitter's email address (required)     |
| phone       | text        | Submitter's phone number (optional)      |
| message     | text        | Enquiry message (required)               |
| created_at  | timestamptz | Timestamp of submission (auto-set)       |

## Security
- RLS enabled on contact_submissions.
- No sign-in required: policies grant anon + authenticated INSERT (public can submit).
- SELECT restricted to authenticated only (admin reads only; anon cannot read submissions).
- No UPDATE or DELETE policies (submissions are immutable once created).

## Notes
1. This is a public-facing form — no user_id or auth required.
2. Anon users can INSERT but cannot SELECT, UPDATE, or DELETE.
3. Data is intentionally write-only from the public side.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions" ON contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_select_contact_submissions" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);
