# 💝 Valentine's Day Interactive Experience

A beautiful, romantic single-page Valentine's Day experience built with Next.js, TypeScript, Tailwind CSS, and GSAP.

**Status:** ✅ Complete & Ready to Customize  
**Version:** 1.0.0  
**Dev Server:** Running at http://localhost:3000/vday

## Features

- 🔐 Password-protected entrance
- 🎥 Intro video scene
- 💌 Interactive card opening with 3D animation
- 🎵 Music-synced lyrics with photo slideshow
- 📸 Photo gallery with lightbox
- 💝 Love poems and notes collection
- 🔍 Interactive scavenger hunt with:
  - Tear reveal interactions
  - Pocket opening animations
  - Photo flip cards
- 🎁 Server-validated final gift reveal
- 💾 Progress persistence with localStorage

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Edit `.env.local` with your values:

```env
VDAY_FINAL_ANSWER=forever
VDAY_GIFT_TITLE=Your Valentine's Day Gift
VDAY_GIFT_MESSAGE=A romantic dinner awaits you, my love...
VDAY_GIFT_ADDRESS=The Moonlight Restaurant, 123 Romance Avenue
VDAY_GIFT_MAP_URL=https://maps.google.com/?q=...
```

### 3. Add Your Assets

Create the following asset files:

#### Video
- `public/vday/intro.mp4` - Intro video (any duration)

#### Music
- `public/vday/song.mp3` - Background song for lyric scene (matching your lyrics.json timing)

#### Photos
Place your photos in `public/vday/photos/`:
- `1.jpg`
- `2.jpg`
- `3.jpg`
- etc.

Update `data/vday/photos.ts` with your actual photo paths.

### 4. Customize Content

Edit these data files with your personal content:

- `data/vday/lyrics.json` - Song lyrics with timestamps
- `data/vday/poems.json` - Love poems
- `data/vday/notes.json` - Romantic notes
- `data/vday/clues.json` - Scavenger hunt clues

### 5. Set Initial Password

Edit `lib/vday/config.ts` and change `INITIAL_PASSWORD` to your desired password.

## Running the App

### Development
```bash
npm run dev
```

Visit `http://localhost:3000/vday`

### Production
```bash
npm run build
npm start
```

## Routes

- `/vday` - Main experience (redirects from root)
- `/vday/admin/reset` - Admin route to clear all progress

## User Flow

1. **Password Gate** → Enter initial password
2. **Intro Video** → Watch intro video
3. **Click to Open** → CTA to proceed
4. **Card Opening** → Interactive 3D card animation
5. **Lyrics + Slideshow** → Music with synced lyrics and photo slideshow
6. **Reveal Site** → Main hub with:
   - Photo gallery
   - Love poems
   - Romantic notes
   - Scavenger hunt (tear reveals, pockets, flip cards)
7. **Final Password** → Enter answer from collected clue words
8. **Gift Reveal** → Server-validated final surprise

## Customization Tips

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
vday: {
  pink: "#FFB3BA",
  rose: "#FF6B9D",
  purple: "#C77DFF",
  lavender: "#E0BBE4",
  cream: "#FFF5E1",
}
```

### Animations
GSAP animations can be customized in scene components:
- `CardOpenScene.tsx` - Card opening animation
- `LyricSlideshowScene.tsx` - Lyric transitions
- Interactive components use GSAP for smooth effects

### Mobile Responsiveness
All components are built mobile-first with Tailwind responsive classes.

## Security Notes

- The initial password is client-side only (not secure, just for fun)
- Final answer validation is server-side with httpOnly cookies
- Gift data is only accessible after server validation
- No real secrets should be committed to the repository

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Complete project architecture
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What was built and next steps

## 🎯 Quick Commands

```bash
npm run dev          # Start dev server (already running!)
npm run check        # Verify setup
npm run build        # Build for production
```

## 🌐 Quick Links

- Main Experience: http://localhost:3000/vday
- Admin Reset: http://localhost:3000/vday/admin/reset

## 🎨 Default Credentials (for testing)

- Initial Password: `snowflake` (with hint button!)
- Final Answer: `forever`

**Remember to change these in production!**

## 🚀 What's Next?

1. **Test it now** - Visit http://localhost:3000/vday
2. **Add your assets** - Video, music, photos in `public/vday/`
3. **Customize content** - Edit JSON files in `data/vday/`
4. **Personalize** - Update passwords and gift details
5. **Deploy** - Share with your Valentine!

See [QUICKSTART.md](QUICKSTART.md) for detailed next steps.

## License

Personal project - use for your own romantic purposes! 💕
