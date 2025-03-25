# Plushoff - Modern E-commerce Platform

Plushoff is an open-source e-commerce platform built with Next.js and MedusaJS, offering a seamless shopping experience with modern features and optimizations.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: MedusaJS
- **Database**: PostgreSQL (Supabase)
- **Caching**: Redis (Upstash)
- **Storage**: Cloudflare R2
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## Features

- 🛍️ Modern, responsive UI with Tailwind CSS
- 🔐 Secure authentication (Email + Google Sign-in)
- 🖼️ Swipe-enabled product image carousel
- 📊 Admin dashboard for order management
- 📈 Usage monitoring and automated data migration
- 🚀 Optimized performance with SSR/ISR
- 🔒 Secure payment processing
- 📱 Mobile-first design

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plushoff.git
cd plushoff
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=your_supabase_url

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MedusaJS
MEDUSA_BACKEND_URL=your_medusa_backend_url

# Redis
REDIS_URL=your_upstash_redis_url

# Cloudflare R2
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
```

## Project Structure

```
plushoff/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions and configurations
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── prisma/             # Database schema and migrations
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
