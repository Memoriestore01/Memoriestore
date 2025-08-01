# Vercel Deployment Guide

## Issues Fixed:
1. Project name conflict: "memoriestore" already exists
2. Missing environment variables in Vercel

## Step 1: Fix Project Name
Choose one of these options:

### Option A: Use Different Project Name
When deploying to Vercel, use a different project name:
- `memoriestore-v2`
- `memoriestore-app`
- `memoriestore-production`
- `memoriestore-store`

### Option B: Delete Existing Project
1. Go to Vercel Dashboard
2. Find the existing "memoriestore" project
3. Delete it
4. Deploy again with the same name

## Step 2: Set Up Environment Variables

### Required Environment Variables for Vercel:

1. **NEXTAUTH_URL**
   - Value: Your production URL (e.g., `https://your-project-name.vercel.app`)
   - This should match your Vercel deployment URL

2. **NEXTAUTH_SECRET**
   - Generate a random string (32+ characters)
   - You can use: `openssl rand -base64 32`

3. **MONGODB_URI**
   - Your MongoDB connection string

4. **GOOGLE_CLIENT_ID**
   - From Google Cloud Console

5. **GOOGLE_CLIENT_SECRET**
   - From Google Cloud Console

6. **SMTP_HOST**
   - Your email service host

7. **SMTP_PORT**
   - Your email service port

8. **SMTP_USER**
   - Your email service username

9. **SMTP_PASS**
   - Your email service password

10. **CLOUDINARY_CLOUD_NAME**
    - Your Cloudinary cloud name

11. **CLOUDINARY_API_KEY**
    - Your Cloudinary API key

12. **CLOUDINARY_API_SECRET**
    - Your Cloudinary API secret

## Step 3: How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add each variable:
   - **Name**: The variable name (e.g., `NEXTAUTH_URL`)
   - **Value**: The actual value
   - **Environment**: Select "Production" (and "Preview" if needed)

## Step 4: Update vercel.json (Optional)

If you want to remove the secret references, update your `vercel.json`:

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

Remove the `env` section since you'll set variables directly in Vercel dashboard.

## Step 5: Deploy

1. Push your changes to GitHub
2. Deploy to Vercel with a new project name
3. Make sure all environment variables are set in Vercel dashboard

## Troubleshooting

### If you still get NEXTAUTH_URL errors:
1. Make sure NEXTAUTH_URL matches your exact Vercel deployment URL
2. Include the protocol: `https://your-project.vercel.app`
3. Don't include trailing slashes

### If you get MongoDB connection errors:
1. Make sure your MongoDB Atlas cluster allows connections from Vercel's IP ranges
2. Check that your connection string is correct
3. Ensure your database user has the right permissions

### If you get Google OAuth errors:
1. Add your Vercel domain to Google Cloud Console authorized redirect URIs
2. Format: `https://your-project.vercel.app/api/auth/callback/google` 