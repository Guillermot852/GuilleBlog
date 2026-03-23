# Crema ☕

> Madrid through a coffee cup.

A minimalist blog covering Madrid's coffee scene and lifestyle, built with **Astro** + **Sanity** and deployed on **Vercel**.

---

## Stack

| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | [Astro](https://astro.build) v4   |
| CMS      | [Sanity](https://sanity.io) v3    |
| Deploy   | [Vercel](https://vercel.com)      |
| Fonts    | Playfair Display + Inter (Google) |

---

## Project structure

```
crema-blog/
├── src/
│   ├── layouts/      # Base HTML layout
│   ├── components/   # Header, Footer, CoffeeCard, RatingBadge
│   ├── pages/        # index, /coffee, /coffee/[slug], /style, /about
│   └── lib/
│       └── sanity.ts # Client, GROQ queries, types, helpers
├── public/           # Static assets
├── studio/           # Sanity Studio v3 (deploy separately)
│   └── schemas/      # coffeeShop, stylePost
└── vercel.json
```

---

## Local development

### 1. Clone & install

```bash
git clone https://github.com/Guillermot852/GuilleBlog.git
cd GuilleBlog
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in your Sanity credentials:

```bash
cp .env.example .env
```

```env
PUBLIC_SANITY_PROJECT_ID=obrlZ0W8r
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

### 3. Run dev server

```bash
npm run dev
# → http://localhost:4321
```

---

## Deploy to Vercel

### Option A — Vercel CLI (recommended)

```bash
npm i -g vercel
vercel
```

During setup:
- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`

Then add environment variables in the Vercel dashboard (or via `vercel env add`):

```
PUBLIC_SANITY_PROJECT_ID
PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
```

### Option B — GitHub integration

1. Push to GitHub (already done)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import `Guillermot852/GuilleBlog`
4. Add the three env vars above
5. Click **Deploy**

Vercel auto-detects Astro — no extra config needed beyond `vercel.json` which is already committed.

---

## Sanity Studio (content management)

The `studio/` folder is a standalone Sanity Studio v3 project.

### Deploy the studio

```bash
cd studio
npm install
npx sanity deploy
# Choose a hostname, e.g. crema → https://crema.sanity.studio
```

### Run studio locally

```bash
cd studio
npm run dev
# → http://localhost:3333
```

---

## Content types

### coffeeShop

| Field        | Type              | Notes                              |
|--------------|-------------------|------------------------------------|
| title        | string (required) | Name of the café                   |
| slug         | slug (required)   | URL: /coffee/[slug]                |
| publishedAt  | datetime          |                                    |
| rating       | number 1–10       | Drives the rating badge colour     |
| neighborhood | string            | Malasaña, Chueca, Lavapiés, etc.  |
| priceRange   | €/€€/€€€          |                                    |
| mainImage    | image + alt       |                                    |
| summary      | text (≤200 chars) | Shown on cards                     |
| body         | block array       | Rich text with headings, quotes    |
| tags         | string[]          | specialty coffee, good wifi, etc.  |

### stylePost

| Field        | Type              |
|--------------|-------------------|
| title        | string (required) |
| slug         | slug (required)   |
| publishedAt  | datetime          |
| mainImage    | image + alt       |
| summary      | text (≤200 chars) |
| body         | block array       |
| tags         | string[]          |

---

## Posting workflow

1. Open [Sanity Studio](https://your-studio.sanity.studio) (or run locally)
2. Create a new **Coffee Shop** or **Style Post**
3. Fill in fields, upload image, write the review, set slug
4. Publish the document
5. Vercel will serve the latest data immediately (server-rendered, no rebuild needed)

> The Astro site runs in **SSR mode** (`output: 'server'`), so every page request fetches fresh data from Sanity via GROQ. No need to trigger a rebuild after publishing content.

---

## Colour palette

| Name     | Hex       | Usage                     |
|----------|-----------|---------------------------|
| cream    | `#FAF7F2` | Page background           |
| espresso | `#2C1810` | Headings, primary text    |
| caramel  | `#C8860A` | Accents, links, labels    |
| milk     | `#F0E6D3` | Section backgrounds       |
| dark     | `#1A1A1A` | Body copy                 |

---

## License

Personal project — Guillermo Trigo, Madrid.
