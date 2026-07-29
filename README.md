# betaReadr

**AI feedback without AI ghostwriting.**

betaReadr gives writers thoughtful, workshop-style feedback on their
writing — fiction, novel chapters, essays, memoir, poetry, blog posts,
LinkedIn posts, professional writing, and more. It identifies what's
working, what's unclear, and where a piece could get stronger, without
rewriting the work for you.

## Product philosophy

betaReadr is built around one idea: **AI feedback without AI
ghostwriting.**

The AI reviewer will:

- Identify meaningful strengths, with real explanation, not token praise
- Identify weaknesses and revision opportunities, framed constructively
- Describe how a reader is likely to experience the piece
- Ask questions worth sitting with as you revise
- Prioritize the handful of changes that would help most

The AI reviewer will **not**:

- Rewrite your submission
- Generate a replacement draft
- Smooth your writing into something generic
- Take ownership of your voice

The goal is to help writers see and improve their own work — not to
write it for them.

## Who it's for

Authors and writers seeking honest, constructive critique on writing
they're still working on: novelists, essayists, memoirists, poets,
bloggers, and professional writers.

## MVP user flow

1. Land on the homepage and understand what betaReadr does.
2. Click **Get Feedback**.
3. Paste writing or upload a `.txt`, `.md`, or `.docx` file.
4. Optionally add a title, writing type, context, and what you'd like
   feedback on.
5. Choose a feedback persona (reader type).
6. Submit and watch an engaged loading state.
7. Read structured, editorial-style feedback.
8. Edit and resubmit, or start a new review.

There is no account system, no saved history, and no payments in this
version — see [Roadmap](#roadmap-not-built-yet) below.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + React
- CSS Modules (no Tailwind, no styled-components)
- [OpenAI Node SDK](https://github.com/openai/openai-node) with
  structured outputs (Zod schema via the Responses API)
- [Zod](https://zod.dev) for request/response validation
- [mammoth](https://github.com/mwilliamson/mammoth.js) for `.docx` text
  extraction (client-side)
- [Vitest](https://vitest.dev) + Testing Library for tests
- Deployable to [Vercel](https://vercel.com) with no custom server

## Local setup

```bash
npm install
cp .env.example .env.local
# then edit .env.local and add your OpenAI API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Set these in `.env.local` for local development, and in your hosting
provider's dashboard (e.g. Vercel) for deployed environments.

| Variable         | Required | Description                                                              |
| ---------------- | -------- | -------------------------------------------------------------------------- |
| `OPENAI_API_KEY` | Yes      | Your OpenAI API key. Kept server-side only — never exposed to the browser. |
| `OPENAI_MODEL`   | No       | Overrides the default model (`gpt-4o-mini`) used to generate feedback. Must be a model your API key/project has access to — see [Troubleshooting](#troubleshooting). |

`.env.local` is already covered by `.gitignore` — never commit real
API keys.

## Troubleshooting

**Reviews fail with a generic error ("betaReadr couldn't generate
feedback for this submission").** This is most often the OpenAI
project tied to your API key not having access to the configured
model. Not every API key/project has every model enabled — this is
independent of `OPENAI_API_KEY` being valid.

To check which models your key can use:

```bash
node -e '
import("openai").then(async ({ default: OpenAI }) => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const list = await client.models.list();
  console.log(list.data.map((m) => m.id).sort().join("\n"));
});
'
```

Then set `OPENAI_MODEL` in `.env.local` (and in Vercel's project
environment variables for deployed environments) to one of the
returned ids. Server logs (`console.error("[api/review] generation
failed", ...)`) include the underlying provider error message to help
diagnose this and similar issues without exposing it to the browser.

## Development commands

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # run the production build locally
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript type checking
```

## Testing

```bash
npm run test        # run the test suite once
npm run test:watch  # watch mode
```

Tests cover: submission validation (empty/short/long/missing fields),
supported upload file types, persona and writing-type configuration,
the structured feedback schema (including the requirement that every
review includes at least one strength and one weakness), the
`/api/review` route's error handling (validation errors, rate limits,
missing configuration, unexpected errors — all mapped to safe,
non-technical messages), and feedback rendering.

## How document uploads work

Uploads are parsed entirely in the browser, so file content is only
sent to the server as extracted plain text alongside the rest of the
form submission:

- `.txt` and `.md` are read directly via the File API.
- `.docx` is parsed client-side with mammoth's browser build
  (`mammoth/mammoth.browser`), which extracts raw text from the
  document's XML.
- PDF is not supported in the MVP.

Switching between "paste text" and "upload a document" does not
discard whatever you've already entered in the other mode — each is
kept in its own state, and only the active method's content is
submitted.

## Project structure

```text
app/
  api/review/route.ts   # POST endpoint that calls OpenAI and validates the response
  privacy/, terms/       # legal pages
  review/                # review workspace (form -> loading -> result/error)
  layout.tsx, page.tsx   # root layout and landing page
  robots.ts, sitemap.ts  # SEO

components/
  FeedbackDisplay/       # renders structured feedback
  FeedbackForm/          # the review submission form
  Header/, Footer/
  LoadingState/          # rotating loading messages
  PersonaSelector/
  SubmissionInput/       # paste/upload toggle + file extraction
  landing/               # landing page sections

lib/
  analytics.ts           # typed, no-op analytics abstraction
  openai.ts              # OpenAI client + structured feedback generation
  prompts.ts             # system + persona prompt composition
  reviewTypes.ts         # shared UI options + submission limits
  validation.ts          # shared client/server submission validation

types/
  review.ts              # Zod schemas + shared request/response types
```

## Current MVP limitations

- No accounts, no saved review history — each visit starts fresh.
- No payments or usage limits.
- Only one persona reviews a submission at a time (the data model
  supports adding more personas or multiple simultaneous reviews
  later).
- 25,000 character maximum per submission (configurable in
  `lib/reviewTypes.ts`).
- `.txt`, `.md`, and `.docx` uploads only — no PDF support yet.
- No AI chat or follow-up conversation about a review.
- Privacy and Terms pages are placeholder MVP language and have not
  been reviewed by a lawyer.

## Roadmap (not built yet)

Accounts and authentication · saved submissions and review history ·
multiple personas reviewing one piece · side-by-side feedback from
different readers · comments on specific passages · longer manuscripts
and chapter-by-chapter projects · subscription plans and usage limits ·
payments via Stripe · a human beta-reader marketplace · shared
workshop groups · classroom workspaces · export to PDF/document
formats · follow-up questions about feedback · writer progress
tracking · private team workspaces · reader profiles · custom feedback
personas.

## Creating the GitHub repository and pushing

These commands are not run automatically — review and run them
yourself:

```bash
git add .
git commit -m "Build betaReadr MVP"

# Using the GitHub CLI:
gh repo create beta-readr --private --source=. --remote=origin --push

# Or, without the GitHub CLI:
# 1. Create an empty repository named "beta-readr" at github.com/new
# 2. Then:
git remote add origin https://github.com/<your-username>/beta-readr.git
git branch -M main
git push -u origin main
```

## Deploying to Vercel

### Option A: Vercel dashboard

1. Import the `beta-readr` GitHub repository at
   [vercel.com/new](https://vercel.com/new).
2. Set the `OPENAI_API_KEY` environment variable (required).
3. Optionally set `OPENAI_MODEL`.
4. Deploy.

### Option B: Vercel CLI

```bash
npm i -g vercel@latest
vercel link
vercel env add OPENAI_API_KEY
vercel env add OPENAI_MODEL   # optional
vercel deploy                 # preview deployment
vercel deploy --prod          # production deployment
```

No custom server or extra infrastructure is needed — `/api/review`
runs as a standard Next.js Route Handler on the Node.js runtime.
