# A&M Advisory production configuration

The repository is safe to commit without secrets. Configure these variables in both the Vercel site and the Render API service where applicable.

## Required

- `MONGO_URI`: MongoDB connection used for enquiries, feedback, subscriptions and archived daily briefs.
- `MONGO_DB_NAME`: database name, for example `aquireandmanage`.
- `OPENAI_API_KEY`: server-side OpenAI API key. Never use a `VITE_` prefix.
- `OPENAI_VECTOR_STORE_ID`: vector store containing the approved A&M Company Profile PDF.
- `OPENAI_CHAT_MODEL`: `gpt-5.6-sol` unless a different evaluated model is intentionally selected.
- `CHAT_SAFETY_SALT`: a long random value used to create privacy-preserving safety identifiers.
- `CRON_SECRET`: the same long random value on Vercel and Render for protected daily-brief ingestion.
- `PUBLIC_SITE_ORIGIN`: `https://www.aquireandmanage.com`.
- `BACKEND_API_URL`: `https://aquiretested-2.onrender.com`.

## Create the RAG knowledge base

From the repository root, after setting `OPENAI_API_KEY`:

```powershell
npm.cmd run setup:rag --workspace=vite-react-typescript-starter
```

The script uploads `aquiretested/assets/AM_Advisory_Company_Profile.pdf`, waits for indexing, and prints `OPENAI_VECTOR_STORE_ID`. Add that value to Vercel and Render, then redeploy both services.

## Daily brief retention

The Render process generates and upserts the current brief when it starts and every day at 8:00 AM Asia/Kolkata. Vercel also invokes the protected `/api/cron-daily-brief` route at 02:30 UTC. Both paths are idempotent because `briefId` is unique per date.

## Verification

```powershell
npm.cmd run lint --workspace=vite-react-typescript-starter
npm.cmd run typecheck --workspace=vite-react-typescript-starter
npm.cmd test --workspace=vite-react-typescript-starter
npm.cmd run build --workspace=vite-react-typescript-starter
npm.cmd audit
```

After deployment, submit one real enquiry owned by the team, confirm it in MongoDB/CRM, ask DiDi one question in each language, and confirm `/api/daily-briefs?limit=1` reports `persisted: true`.
