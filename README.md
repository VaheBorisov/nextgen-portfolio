# NextGen Portfolio

A modern, full-stack portfolio website built with Next.js, Sanity CMS, and an integrated AI chat assistant. Features dynamic content management, dark mode, interactive data visualizations, and a world map showcase.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, React 19)
- **CMS**: [Sanity](https://sanity.io) — headless CMS with live content editing
- **Auth**: [Clerk](https://clerk.com) — authentication and user management
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [Radix UI](https://radix-ui.com)
- **AI Chat**: [@openai/chatkit-react](https://github.com/openai/openai-chatkit)
- **Animations**: [Motion](https://motion.dev)
- **Charts**: [Recharts](https://recharts.org)
- **Icons**: [Tabler Icons](https://tabler-icons.io) + [Lucide](https://lucide.dev)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Linting/Formatting**: [Biome](https://biomejs.dev)

## Features

- Hero, About, Experience, Projects, Skills, Blog, Certifications, Achievements, Testimonials, Contact sections
- Interactive skills chart and world map
- AI-powered chat assistant
- Dark/light mode with `next-themes`
- Floating dock navigation
- Sanity Studio at `/sanity`
- Auto-generated sitemap and robots.txt

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io) 10+

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root with the following variables:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
 
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
 
# OpenAI (for AI chat)
OPENAI_API_KEY=your_openai_api_key
```

### Development

Opens at [http://localhost:3001](http://localhost:3001).

### Sanity Studio

The Sanity Studio is available at [http://localhost:3001/sanity](http://localhost:3001/sanity).

To regenerate TypeScript types from the Sanity schema:

```bash
pnpm typegen
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server on port 3001 |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Auto-format with Biome |
| `pnpm typegen` | Regenerate Sanity TypeScript types |

## Project Structure

```
├── app/
│   ├── (porfolio)/      # Main portfolio pages
│   ├── (sanity)/        # Sanity Studio
│   └── api/             # API routes (AI chat, etc.)
├── components/
│   ├── sections/        # Portfolio section components
│   ├── ui/              # Reusable UI primitives
│   └── chat/            # AI chat components
├── sanity/
│   ├── schemaTypes/     # Sanity content schemas
│   └── lib/             # Sanity client and helpers
└── hooks/               # Custom React hooks
```

## Deployment

Deploy on [Vercel](https://vercel.com) for the best experience:

```bash
vercel
```

Make sure to set all environment variables in your Vercel project settings.