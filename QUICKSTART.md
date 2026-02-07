# 🚀 Quick Start

Get your Valentine's Day experience up and running in minutes!

## ⚡ 5-Minute Setup

### 1. Install
```bash
npm install
```

### 2. Check Setup
```bash
npm run check
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open Browser
Visit: **http://localhost:3000/vday**

**Default password:** `snowflake`

---

## 📝 Essential Customizations

### Change Initial Password
**File:** `lib/vday/config.ts`
```typescript
export const INITIAL_PASSWORD = "snowflake"; // Current password
```

### Set Final Answer
**File:** `.env.local`
```env
VDAY_FINAL_ANSWER=forever
```

### Configure Gift Message
**File:** `.env.local`
```env
VDAY_GIFT_TITLE=Your Valentine's Day Gift
VDAY_GIFT_MESSAGE=Your romantic message...
VDAY_GIFT_ADDRESS=123 Romance Street
VDAY_GIFT_MAP_URL=https://maps.google.com/...
```

---

## 📁 Add Your Assets

### Required Files:
```
public/vday/
├── intro.mp4         # Your intro video
├── song.mp3          # Background music
└── photos/           # Your photos
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

### Update Photo List:
**File:** `data/vday/photos.ts`
```typescript
export const photos = [
  "/vday/photos/1.jpg",
  "/vday/photos/2.jpg",
  // Add more...
];
```

---

## 🎨 Customize Content

| File | Content |
|------|---------|
| `data/vday/lyrics.json` | Song lyrics with timestamps |
| `data/vday/poems.json` | Love poems |
| `data/vday/notes.json` | Romantic notes |
| `data/vday/clues.json` | Scavenger hunt clues |

---

## 🧪 Testing

### Run the Experience
1. Visit `/vday`
2. Enter password: `iloveyou`
3. Go through all scenes
4. Find all clues
5. Enter final answer: `forever` (or your custom answer)

### Reset Progress
Visit: **http://localhost:3000/vday/admin/reset**

Clears all progress and cookies for fresh testing.

---

## 🎯 Experience Flow

```
1. Password Gate → Enter "iloveyou"
2. Intro Video → Auto-advances
3. Click to Open → Click button
4. Card Opening → Click card to open
5. Lyrics + Slideshow → Music plays, auto-advances
6. Reveal Site → Main hub
   - Browse photos, poems, notes
   - Complete scavenger hunt
   - Find all clues
7. Final Password → Enter "forever"
8. Gift Reveal → See your gift!
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm start            # Run production build

# Utilities
npm run check        # Verify setup
npm run lint         # Check code quality
```

---

## 📦 What's Included

✅ Complete Next.js project with TypeScript
✅ All scenes and components
✅ State management with localStorage
✅ Server-side validation
✅ Mobile-responsive design
✅ GSAP animations
✅ Scavenger hunt system
✅ Photo gallery with lightbox
✅ Music-synced lyrics
✅ Progress persistence

---

## 🎨 Customization Quick Links

| What | Where |
|------|-------|
| Colors | `tailwind.config.ts` |
| Passwords | `lib/vday/config.ts` + `.env.local` |
| Lyrics | `data/vday/lyrics.json` |
| Poems | `data/vday/poems.json` |
| Notes | `data/vday/notes.json` |
| Clues | `data/vday/clues.json` |
| Photos | `data/vday/photos.ts` |
| Animations | Scene component files |

---

## 📚 Full Documentation

- **README.md** - Complete project overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **PROJECT_STRUCTURE.md** - Full project structure
- **TROUBLESHOOTING.md** - Common issues & solutions

---

## 🎁 Experience Features

### Interactive Elements
- 🎥 **Intro video** with auto-advance
- 💌 **3D card opening** animation
- 🎵 **Music player** with synced lyrics
- 📸 **Photo gallery** with lightbox
- 📝 **Love poems** and notes display
- 🔍 **Scavenger hunt** with 3 interaction types:
  - **Tear reveals** - Drag to tear paper
  - **Pocket opens** - Click to open
  - **Photo flips** - Click to flip card
- 🔐 **Server-validated** final gift
- 💾 **Progress persistence** across refreshes

### Scene Transitions
- Smooth fade animations
- State-based routing
- No page reloads
- Mobile-friendly

---

## 🚨 Important Notes

1. **Assets are NOT included** - Add your own video, music, and photos
2. **Initial password is client-side** - Just for fun, not secure
3. **Final answer is server-validated** - More secure with cookies
4. **Mobile browsers often block autoplay** - App handles this automatically
5. **Progress persists in localStorage** - Use reset page to clear

---

## 💡 Tips

- Test on the device your recipient will use
- Optimize images for web (compress before adding)
- Keep video under 30 seconds for best experience
- Match lyrics timing to your song carefully
- Make clue words combine to form the final answer
- Test the full experience before sharing!

---

## 🆘 Need Help?

1. Run `npm run check` to verify setup
2. Check browser console (F12) for errors
3. Read TROUBLESHOOTING.md for common issues
4. Visit `/vday/admin/reset` to start fresh

---

## ❤️ Make It Personal

This is just the foundation. Make it yours by:
- Using your own photos and videos
- Writing personal poems and notes
- Creating meaningful clues
- Choosing a special song
- Customizing colors and styling
- Setting a final gift that matters to you

**Happy Valentine's Day!** 💝
