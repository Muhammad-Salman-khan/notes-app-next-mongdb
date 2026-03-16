# 📝 Notes App

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/Muhammad-Salman-khan/notes-app-next-mongdb)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)

A production-ready, full-stack notes management application built on the Next.js App Router architecture with MongoDB persistence and enterprise-grade UI components.

---

## 📋 Overview

Notes App is a modern web application designed for efficient note creation, management, and retrieval. Built with scalability and performance in mind, it leverages the latest web technologies to deliver a seamless user experience across all devices.

### ✨ Key Capabilities

| Capability | Description |
|------------|-------------|
| 🔄 **Full CRUD Operations** | Complete create, read, update, and delete functionality for note management |
| ⚡ **Server-Side Rendering** | Optimized performance with Next.js 16 App Router |
| 💾 **Persistent Storage** | MongoDB-backed data persistence with Mongoose ODM |
| 📱 **Responsive Design** | Mobile-first architecture ensuring consistent experience across devices |
| 🌓 **Theme Support** | System-aware light/dark mode implementation |
| 🛡️ **Type Safety** | End-to-end TypeScript implementation for enhanced reliability |
| 🔔 **Real-time Feedback** | Toast-based notification system for user actions |

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5.x |
| **Runtime** | React 19 |
| **Database** | MongoDB |
| **ODM** | Mongoose 9.x |
| **UI Components** | shadcn/ui, Radix UI |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Typography** | Geist, Inter |
| **Theming** | next-themes |
| **Notifications** | Sonner |
| **Animations** | Motion |

---

## 📦 Requirements

- 🟢 **Node.js** 20.x or later, or **Bun** 1.x
- 🗄️ **MongoDB** 6.x or later (local instance or cloud deployment)
- 📦 **Package manager**: npm, yarn, pnpm, or Bun

---

## 🚀 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Muhammad-Salman-khan/notes-app-next-mongdb.git
cd notes-app-next
```

### 2️⃣ Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Alternative: npm
npm install
```

### 3️⃣ Environment Configuration

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/notes-app
```

For MongoDB Atlas deployments:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notes-app?retryWrites=true&w=majority
```

### 4️⃣ Start Development Server

```bash
# Using Bun
bun run dev

# Alternative: npm
npm run dev
```

The application will be available at `http://localhost:3000` 🌐

---

## 🏗️ Architecture

### 📁 Directory Structure

```
src/
├── 📂 app/                          # Next.js App Router
│   ├── 📂 api/
│   │   └── 📂 notes/                # RESTful API endpoints
│   │       ├── 📂 [id]/
│   │       │   └── route.tsx        # GET /api/notes/:id
│   │       └── route.ts             # GET, POST /api/notes
│   ├── 📂 save-notes/
│   │   ├── 📂 [id]/
│   │   │   ├── 📂 edit/
│   │   │   │   └── page.tsx         # Edit note interface
│   │   │   └── page.tsx             # Note detail view
│   │   └── page.tsx                 # All notes listing
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Home page (recent notes)
│   └── globals.css                  # Global styles
├── 📂 components/
│   ├── 📂 client_components/        # Client-side interactive components
│   │   ├── 📂 delete-button/
│   │   ├── 📂 EditForm/
│   │   └── Full.tsx
│   ├── 📂 ui/                       # Base UI components (shadcn)
│   └── meteors-demo.tsx             # Note card component
├── 📂 context/
│   └── ThemeContext.tsx             # Theme provider configuration
├── 📂 helpers/
│   └── DeleteFuntio.ts              # Delete operation utilities
├── 📂 lib/
│   ├── db.ts                        # Database connection module
│   └── utils.ts                     # Utility functions
├── 📂 models/
│   └── Note.ts                      # Mongoose schema definition
└── 📂 server/
    └── action.ts                    # Server actions for CRUD operations
```

---

## 🔌 API Reference

### REST Endpoints

#### `GET /api/notes`

Retrieve all notes sorted by creation date (descending).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  ]
}
```

#### `POST /api/notes`

Create a new note.

**Request Body:**
```json
{
  "title": "string (required, max 100 chars)",
  "content": "string (required, min 10 chars)"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* created note */ },
  "message": "Note created Successfully"
}
```

#### `GET /api/notes/:id`

Retrieve a specific note by ID.

**Response:**
```json
{
  "success": true,
  "data": { /* note object */ }
}
```

### Server Actions

| Action | Description | Parameters |
|--------|-------------|------------|
| `getAllData()` | Fetch all notes | None |
| `noteById(id)` | Fetch note by ID | `id: string` |
| `PostNote(data)` | Create new note | `data: createPostType` |
| `DeletePost(id)` | Delete note | `id: string` |
| `UpdatePost(id, data)` | Update note | `id: string`, `data: Partial<createPostType>` |

---

## 🗺️ Routes

| Path | Method | Description |
|------|--------|-------------|
| `/` | GET | 🏠 Home page displaying 3 most recent notes |
| `/save-notes` | GET | 📋 Complete notes listing |
| `/save-notes/:id` | GET | 👁️ Individual note detail view |
| `/save-notes/:id/edit` | GET | ✏️ Note edit interface |
| `/api/notes` | GET, POST | 🔌 Notes collection endpoint |
| `/api/notes/:id` | GET | 🔌 Single note endpoint |

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | 🚀 Start development server (port 3000) |
| `bun run build` | 📦 Create production build |
| `bun run start` | ▶️ Start production server |
| `bun run lint` | 🔍 Execute ESLint validation |

---

## 🗄️ Data Model

### Note Schema

```typescript
interface Note {
  _id: ObjectId;
  title: string;      // Required, max 100 characters
  content: string;    // Required, min 10 characters
  createdAt: Date;    // Auto-generated
  updatedAt: Date;    // Auto-updated
}
```

---

## ⚙️ Configuration

### TypeScript

Path aliases configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true
  }
}
```

### React Compiler

Automatic React optimizations enabled via Babel plugin configuration. ⚡

### Styling

Tailwind CSS v4 with CSS variable-based theming system for light/dark mode support. 🎨

---

## 🌍 Deployment

### Production Build

```bash
bun run build
bun run start
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string |

### Platform Recommendations

| Platform | Description |
|----------|-------------|
| ▲ **Vercel** | Optimal for Next.js deployments with automatic configuration |
| ⬡ **Netlify** | Supported with Next.js runtime adapters |
| 🚂 **Railway** | Suitable for full-stack deployments with managed MongoDB |
| 🐳 **Docker** | Containerized deployment supported |

> ⚠️ Ensure `MONGODB_URI` is configured in your deployment environment.

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| 🟦 Chrome | Latest 2 versions |
| 🦊 Firefox | Latest 2 versions |
| 🧭 Safari | Latest 2 versions |
| 🌊 Edge | Latest 2 versions |

---

## 🤝 Contributing

Contributions are welcome. Please follow these guidelines:

### 📋 Contribution Flow

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

### 📏 Development Guidelines

- ✅ Maintain TypeScript strict mode compliance
- 📐 Follow existing code style and conventions
- 📝 Include meaningful commit messages
- 🧪 Test functionality before submission

---

## ⚠️ Known Limitations

- 🔌 Requires active MongoDB connection for all operations
- 🌐 Client-side JavaScript required for interactive features

---

## 🔒 Security Considerations

- 🔐 Environment variables containing database credentials should not be committed
- 🛡️ MongoDB connection strings should use appropriate access controls
- 👤 Consider implementing authentication for production deployments

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 📞 Support

For issues, feature requests, or questions:

- 🐛 **GitHub Issues**: [Create an issue](https://github.com/Muhammad-Salman-khan/notes-app-next-mongdb/issues)
- 📂 **Repository**: [github.com/Muhammad-Salman-khan/notes-app-next-mongdb](https://github.com/Muhammad-Salman-khan/notes-app-next-mongdb)

---

## 👨‍💻 Author

**Salman Khan**

- 🐙 GitHub: [@Muhammad-Salman-khan](https://github.com/Muhammad-Salman-khan)
- 💼 LinkedIn: [salman-khan-dev](https://www.linkedin.com/in/salman-khan-dev/)

---

<div align="center">

**📝 Notes App** — Built with Next.js 16 & MongoDB

[🐛 Report Issue](https://github.com/Muhammad-Salman-khan/notes-app-next-mongdb/issues) · [💡 Request Feature](https://github.com/Muhammad-Salman-khan/notes-app-next-mongdb/issues)

</div>
