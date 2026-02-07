# Troubleshooting Guide

Common issues and their solutions.

## Build & Installation Issues

### npm install fails
**Problem:** Package installation errors

**Solutions:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json, then reinstall
- Try using `npm install --legacy-peer-deps`
- Check Node.js version (requires Node 18+)

### Build fails with TypeScript errors
**Problem:** Type checking errors

**Solutions:**
- Run `npm run build` to see detailed errors
- Check all imports match file names exactly (case-sensitive)
- Ensure all dependencies are installed
- Delete `.next` folder and rebuild

## Asset Loading Issues

### Video doesn't play
**Problem:** intro.mp4 not loading or playing

**Solutions:**
- Verify file exists at `public/vday/intro.mp4`
- Check video codec (H.264 recommended)
- Ensure file isn't corrupted
- Check browser console for errors
- Some browsers block autoplay - this is expected

### Music doesn't start
**Problem:** song.mp3 not playing in lyrics scene

**Solutions:**
- Verify file exists at `public/vday/song.mp3`
- Use MP3 format with standard codec
- Mobile browsers block autoplay - the app shows a "Tap to start" button automatically
- Check browser console for errors
- Ensure file size isn't too large (< 10MB recommended)

### Photos don't display
**Problem:** Images not showing in gallery or slideshow

**Solutions:**
- Verify photos exist in `public/vday/photos/`
- Check filenames match exactly what's in `data/vday/photos.ts`
- Paths should start with `/vday/photos/`
- Use standard formats (JPG, PNG)
- Check image file size (< 5MB each recommended)

### "Failed to load resource" errors
**Problem:** 404 errors in browser console

**Solutions:**
- Check file paths - they should start with `/` for public folder
- Ensure files are in the correct directories
- Verify spelling and case (case-sensitive)
- Restart dev server after adding new assets

## Functionality Issues

### Password doesn't work
**Problem:** Initial password rejected

**Solutions:**
- Check `lib/vday/config.ts` for `INITIAL_PASSWORD`
- Password comparison is case-insensitive
- Make sure there are no extra spaces
- Default password is "iloveyou"

### Final answer doesn't unlock gift
**Problem:** Final password scene rejects answer

**Solutions:**
- Check `.env.local` for `VDAY_FINAL_ANSWER`
- Answer is case-insensitive and trimmed
- Combine clue words as specified
- Check browser console for API errors
- Restart dev server after changing .env.local

### Gift page shows "Unauthorized"
**Problem:** Can't access gift even after correct answer

**Solutions:**
- Complete the final password scene first
- Cookie might not be set - check browser dev tools
- Try clearing cookies and redoing final answer
- Check API route `/api/vday/gift` is accessible
- Restart server if .env.local was changed

### Progress doesn't save
**Problem:** Refreshing resets progress

**Solutions:**
- Check browser allows localStorage
- Try different browser (some privacy modes block it)
- Check browser console for errors
- Clear localStorage and start fresh: `/vday/admin/reset`

### Clues don't mark as found
**Problem:** Interactions work but clues don't register

**Solutions:**
- Check clue IDs in `data/vday/clues.json` are unique
- Verify `onClueFound` callback is working
- Check localStorage for saved progress
- Look for console errors
- Try reset page: `/vday/admin/reset`

## Animation Issues

### Card won't open
**Problem:** Card click doesn't trigger animation

**Solutions:**
- Check GSAP is installed: `npm list gsap`
- Look for JavaScript errors in console
- Ensure card scene is rendering
- Try different browser
- Check if animation completed previously (localStorage)

### Tear reveal doesn't work
**Problem:** Can't drag the tear handle

**Solutions:**
- Try both mouse and touch (depending on device)
- Check if already found (will be disabled)
- Look for console errors
- Ensure component is receiving correct props
- Try on different device/browser

### Animations are choppy
**Problem:** Performance issues with animations

**Solutions:**
- Reduce image file sizes
- Use fewer photos in slideshow
- Close other browser tabs
- Try on more powerful device
- Check for memory leaks in console

## Deployment Issues

### Build succeeds but site doesn't work in production
**Problem:** Works locally but not when deployed

**Solutions:**
- Check environment variables are set on hosting platform
- Verify asset paths are correct for production
- Check build output for warnings
- Enable server logs on hosting platform
- Test production build locally: `npm run build && npm start`

### API routes return 404
**Problem:** /api/vday/* routes not working

**Solutions:**
- Ensure you're using Next.js App Router (not Pages Router)
- Check route files are in correct locations
- Verify hosting platform supports API routes
- Check deployment logs for errors

### Cookies not working in production
**Problem:** Final validation works but gift still locked

**Solutions:**
- Check `secure` flag in cookie settings
- For localhost, secure should be false
- For production (HTTPS), secure should be true
- Check SameSite settings
- Verify domain matches

## Browser-Specific Issues

### Safari issues
- Autoplay often blocked - use play button
- Some CSS features might need prefixes
- Check for console errors specific to Safari

### Mobile Chrome issues
- Autoplay blocked by default
- Some animations might perform differently
- Touch events work differently than mouse

### Firefox issues
- Check console for CORS errors
- Some newer CSS features might need flags
- Private browsing blocks localStorage

## Getting Help

### Still stuck?

1. **Check the logs**
   - Browser console (F12)
   - Server terminal output
   - Check for red error messages

2. **Verify setup**
   - Run: `npm run check`
   - Follow warnings/errors

3. **Test step by step**
   - Start with a fresh reset: `/vday/admin/reset`
   - Go through each scene
   - Note exactly where it fails

4. **Check file structure**
   - Compare with `PROJECT_STRUCTURE.md`
   - Ensure all files exist
   - Verify paths are correct

5. **Common quick fixes**
   - Delete `.next` folder
   - Clear browser cache
   - Restart dev server
   - Clear localStorage
   - Try incognito/private mode

## Debug Mode

Add this to any component to debug state:

```typescript
console.log('Current state:', progress.state);
console.log('Found clues:', progress.foundClues);
console.log('Attempts:', progress.attempts);
```

Check localStorage in browser DevTools:
- Application tab → Local Storage
- Look for key: `vday_progress_v1`

## Performance Tips

- Optimize images before adding them
- Keep video under 30 seconds
- Use MP3 for audio (good compression)
- Test on target device (mobile if that's your audience)
- Consider video/audio quality vs file size tradeoff

## Reset Everything

If all else fails, complete reset:

1. Visit `/vday/admin/reset`
2. Clear browser cache
3. Clear cookies
4. Restart dev server
5. Delete `.next` folder
6. Run `npm run dev` again

This should give you a completely fresh start.
