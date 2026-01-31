# 🔑 API Key Setup Instructions

## ⚠️ IMPORTANT: Set Your Gemini API Key

The titanXboarPRIME application requires a Google Gemini API key to analyze images.

### Step 1: Get Your API Key
1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key" 
4. Create a new API key
5. Copy the API key

### Step 2: Configure Your API Key
1. Open the `.env.local` file in the root directory
2. Replace `PLACEHOLDER_API_KEY` with your real API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Restart the Application
After setting your API key:
1. Stop the development server (Ctrl+C)
2. Run `npm run dev` again
3. The image analysis should now work!

## 🚨 Error Messages

- **"API KEY REQUIRED"** → You need to set your API key in `.env.local`
- **"INVALID API KEY"** → Your API key is wrong, get a new one from Google AI Studio
- **"QUOTA EXCEEDED"** → You've used up your free quota, check your usage
- **"PERMISSION DENIED"** → Your API key doesn't have Gemini access

## 💡 Tips

- Keep your API key secret - never commit it to git
- The `.env.local` file is already in `.gitignore`
- Free tier includes generous usage limits
- API key is only used for image analysis

---

**Need help?** Contact: quicredtech@gmail.com