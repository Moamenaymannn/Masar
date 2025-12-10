# 🚀 Vercel Deployment - Quick Start

## ✅ Preparation Complete!

Your code is ready for deployment. All changes have been pushed to GitHub.

---

## 📋 Quick Deployment Steps

### 1️⃣ Set Up Database (5 minutes)
1. Go to [supabase.com](https://supabase.com) → Sign in with GitHub
2. Create new project: **masar-production**
3. Copy your database connection string
eOXezlQJ4MZUZSlH

postgresql://postgres.kfuzydogrecpeiwabuxn:eOXezlQJ4MZUZSlH@aws-1-eu-central-1.pooler.supabase.com:6543/postgres
4. Save it for Step 3

### 2️⃣ Deploy to Vercel (3 minutes)
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click "Add New..." → "Project"
3. Import: **Moamenaymannn/Masar**
4. Click "Import"

### 3️⃣ Add Environment Variables (5 minutes)

**Required** (copy from your `.env` file):
```
DATABASE_URL = [Supabase connection string from Step 1]
NEXTAUTH_SECRET = [Run: openssl rand -base64 32]
NEXTAUTH_URL = https://your-project.vercel.app
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_SECURE = false
EMAIL_USER = moamenayman596@gmail.com
EMAIL_PASSWORD = [Your Gmail app password]
ADMIN_EMAIL = moamenayman596@gmail.com
APILAYER_API_KEY = [Your APILayer key]
JSEARCH_API_KEY = [Your JSearch key]
JSEARCH_BASE_URL = https://jsearch.p.rapidapi.com
```

**Optional**:
```
STRIPE_SECRET_KEY = [If using payments]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = [If using payments]
GEMINI_API_KEY = [Optional - app works without it]
GOOGLE_CLIENT_ID = [If using Google OAuth]
GOOGLE_CLIENT_SECRET = [If using Google OAuth]
```

### 4️⃣ Deploy!
Click "Deploy" and wait 2-3 minutes

### 5️⃣ Run Database Migration
```bash
# Install Vercel CLI
npm install -g vercel

# Login and link
vercel login
vercel link

# Run migration
DATABASE_URL="[Your Supabase URL]" npx prisma db push
```

### 6️⃣ Update NEXTAUTH_URL
1. After deployment, copy your Vercel URL
2. Go to Vercel → Settings → Environment Variables
3. Update `NEXTAUTH_URL` to your actual URL
4. Redeploy

---

## 🎯 Your Deployment URL

After deployment, you'll get: **https://masar-xxx.vercel.app**

---

## 📚 Full Guide

For detailed instructions, see: [`walkthrough.md`](file:///home/moamen/.gemini/antigravity/brain/ed162238-a806-4f97-b5ac-31264d442657/walkthrough.md)

---

## ⚡ Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

---

## 🆘 Need Help?

Check the troubleshooting section in the full walkthrough or:
- Vercel build logs
- Supabase database logs
- Environment variables configuration
