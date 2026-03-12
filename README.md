# Notes App

A modern, full-featured notes application built with Next.js 16, MongoDB, and a beautiful UI powered by shadcn/ui and Tailwind CSS.

## Features

- **Fast & Responsive** - Built on Next.js 16 with React 19 for optimal performance
- **Persistent Storage** - MongoDB database integration via Mongoose
- **Modern UI** - Clean, accessible components from shadcn/ui
- **Dark Mode Ready** - Full light/dark theme support
- **Type-Safe** - Full TypeScript implementation
- **Mobile Friendly** - Responsive design for all screen sizes

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| UI Components | shadcn/ui + Radix UI |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Fonts | Geist + Inter |

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notes-app-next
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/notes-app
```

4. Run the development server:
```bash
bun run dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout with fonts
│   └── page.tsx        # Home page
├── components/
│   └── ui/             # Reusable UI components (shadcn)
└── lib/
    ├── db.ts           # MongoDB connection utility
    └── utils.ts        # Utility functions
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |

## Configuration

- **TypeScript**: Strict mode enabled with path aliases (`@/*` → `./src/*`)
- **React Compiler**: Enabled for automatic optimizations
- **Styling**: Tailwind CSS v4 with CSS variables for theming

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |

## Deployment

Deploy on [Vercel](https://vercel.com/new) or any platform that supports Next.js:

```bash
bun run build
bun run start
```

Make sure to set the `MONGODB_URI` environment variable in your production environment.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
