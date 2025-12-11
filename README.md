# Masar 

**Masar** is a comprehensive Career Development Platform designed to help users navigate their professional journey. It leverages AI to provide personalized career roadmaps, skill validation, resume analysis, and job market insights.

**Live Deployment**: [https://masar-gamma.vercel.app/](https://masar-gamma.vercel.app/)

---

## Key Features

- **AI-Powered Career Roadmaps**: Generate personalized learning paths based on your goals.
- **Smart Resume Analysis**: Parse and analyze CVs to extract skills and experience automatically.
- **Skill Validation**: meaningful validation of technical skills using AI (Gemini).
- **Job Market Insights**: Real-time data on job trends and requirements.
- **Secure Authentication**: Robust user management with NextAuth.js (Email/Password & Google).
- **Payment Integration**: Seamless subscription handling via Stripe.
- **Interactive Dashboard**: Track progress, managed roadmaps, and view analytics.
- **Responsive Design**: Modern, mobile-first UI built with TailwindCSS and Material UI.

---

##  Technology Stack

**Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, Material UI, Framer Motion
- **State Management**: React Query, React Context

**Backend**
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth.js v4
- **Caching**: Upstash Redis
- **AI Integration**: Google Gemini API

**Services**
- **Payments**: Stripe
- **Email**: Nodemailer (Gmail SMTP)
- **PDF Processing**: pdf-parse, pdfjs-dist

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Moamenaymannn/Masar.git
   cd Masar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="..."
   
   # AI & Services
   GEMINI_API_KEY="..."
   STRIPE_SECRET_KEY="..."
   
   # Email
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_USER="..."
   EMAIL_PASSWORD="..."
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## Deployment

This project is deployed on **Vercel**.

To deploy your own instance:
1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Deploy!

For Supabase connection pooling in production, ensure your `DATABASE_URL` includes `?pgbouncer=true` if using the transaction pooler port (6543).

---

Developed with dedication by an exceptional team. ❤️ 
