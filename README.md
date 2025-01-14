# Lumina Mail

A simple email campaign management platform

## Tech Stack

- **Framework:** Next.js with App Router
- **Styling:** Tailwind CSS
- **Email Service:** Resend
- **Database:** SQLite with Prisma ORM
- **Authentication:** BetterAuth
- **Payments:** Stripe
- **Email Editor:** Tiptap
- **Email Templates:** React Email

## Project Structure

```bash
/lumina-mail
  /apps
    /app         # Main application
    /docs        # Documentation site
    /website     # Marketing website
  /packages
    /ui          # Shared UI components
    /email       # Email templates
    ...          # Other shared packages
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mirislomovmirjalol/lumina-mail.git
cd lumina-mail
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy environment files:

```bash
cp apps/app/.env.example apps/app/.env
cp apps/website/.env.example apps/website/.env
cp apps/docs/.env.example apps/docs/.env
```

4. Set up your environment variables in the `.env` files

5. Initialize the database:

```bash
cd apps/app
pnpx prisma generate
pnpx prisma db push
```

6. Run the development server:

```bash
pnpm dev
```

## Applications

### Main App (apps/app)

The core application where users manage campaigns and contacts.

- Port: 3000
- URL: http://localhost:3000

### React email (packages/email)

Email templates for the main app.

- Port: 3001
- URL: http://localhost:3001
### Documentation (apps/docs)

User documentation and guides.

- Port: 3002
- URL: http://localhost:3002

### Website (apps/website)

Marketing website and landing pages.

- Port: 3001
- URL: http://localhost:3001

## Development

Make sure to that you are in the root directory and run `pnpm i` for installing all dependencies.

- `pnpm dev` - Start all applications
- `pnpm build` - Build all applications

## Environment Variables

Each application has its own `.env` file. Check the `.env.example` files in each app directory for required variables.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
