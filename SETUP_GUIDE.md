# Quick Setup Guide

Follow these steps to get your Valentine's Day experience running:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Asset Directories

```bash
mkdir -p public/vday/photos
```

## Step 3: Add Your Assets

### Required Assets:

1. **Intro Video**
   - Add your intro video as: `public/vday/intro.mp4`
   - Any length is fine (will auto-advance when complete)
   - Recommended: 10-30 seconds

2. **Background Song**
   - Add your song as: `public/vday/song.mp3`
   - Should match the timing in `data/vday/lyrics.json`
   - Update lyrics with your actual song timestamps

3. **Photos**
   - Add photos to: `public/vday/photos/`
   - Name them: `1.jpg`, `2.jpg`, `3.jpg`, etc.
   - Update `data/vday/photos.ts` with the actual list

## Step 4: Customize Content

### Essential Customizations:

1. **Initial Password** (`lib/vday/config.ts`)
   ```typescript
   export const INITIAL_PASSWORD = "iloveyou"; // Change this!
   ```

2. **Final Answer** (`.env.local`)
   ```env
   VDAY_FINAL_ANSWER=forever  # The answer to unlock the gift
   ```

3. **Gift Details** (`.env.local`)
   ```env
   VDAY_GIFT_TITLE=Your Valentine's Day Gift
   VDAY_GIFT_MESSAGE=Your romantic message here...
   VDAY_GIFT_ADDRESS=123 Romance Street
   VDAY_GIFT_MAP_URL=https://maps.google.com/...
   ```

4. **Lyrics** (`data/vday/lyrics.json`)
   - Update with your song's actual lyrics
   - Set timestamps (t) to match when each line appears
   - Format: `{ "t": 5.5, "line": "Your lyric here" }`

5. **Poems** (`data/vday/poems.json`)
   - Add your own love poems
   - Can be simple or elaborate

6. **Notes** (`data/vday/notes.json`)
   - Short romantic messages
   - Will appear throughout the experience

7. **Clues** (`data/vday/clues.json`)
   - Each clue should have a unique `id`
   - `word` should be part of the final answer
   - `type`: "tear", "pocket", or "flip"
   - `content`: Either text or image path

## Step 5: Test Locally

```bash
npm run dev
```

Visit: `http://localhost:3000/vday`

**Test checklist:**
- ✓ Initial password works
- ✓ Video plays and advances
- ✓ Card opens smoothly
- ✓ Music plays with lyrics
- ✓ All interactions work (tear, pocket, flip)
- ✓ All clues can be found
- ✓ Final password validation works
- ✓ Gift reveals correctly

## Step 6: Reset for Fresh Experience

If you need to test from the beginning:

Visit: `http://localhost:3000/vday/admin/reset`

This clears all progress and cookies.

## Step 7: Deploy (Optional)

Deploy to Vercel, Netlify, or your preferred host:

```bash
npm run build
```

Make sure to set environment variables on your hosting platform!

## Common Issues

### Music doesn't autoplay
- Mobile browsers often block autoplay
- The app shows a "Tap to start music" button automatically
- This is expected behavior

### Photos not loading
- Check file paths in `data/vday/photos.ts`
- Ensure photos exist in `public/vday/photos/`
- Check file extensions match (.jpg, .png, etc.)

### Clues not working
- Each clue ID must be unique
- Check `data/vday/clues.json` syntax
- Ensure image paths start with "/" for clues using images

### Final answer doesn't work
- Check `.env.local` has `VDAY_FINAL_ANSWER`
- Answer is case-insensitive
- Make sure clue words combine to form the answer

## Need Help?

Check the main README.md for more detailed documentation.

Happy Valentine's Day! 💕
