# ❄️ Snowflake Hint Feature

## Overview

The password gate now includes a cute hint button that creates a magical snowfall animation!

## How It Works

### Password
- **Updated password:** `snowflake`
- Changed from `iloveyou` to `snowflake`

### Hint Button
- Located next to the "Enter" button
- Displays as: **💡 Hint**
- Semi-transparent white background with backdrop blur
- Disabled during animation to prevent spam

### Snowfall Animation

When the hint button is clicked:

1. **30 snowflakes** fall from the top of the screen
2. Each snowflake (❄️) has:
   - Random horizontal position (0-100%)
   - Random fall speed (3-7 seconds)
   - Random size (0.5-1.5em)
   - Random opacity (0.8-1.0)
   - 360° rotation during fall
3. Animation lasts 7 seconds total
4. Button is disabled during animation
5. Snowflakes automatically clear after falling

### CSS Animation

```css
@keyframes snowfall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0.4;
  }
}
```

## User Experience

```
User enters wrong password
       ↓
   Sees hint button
       ↓
   Clicks "💡 Hint"
       ↓
   Snowflakes fall! ❄️❄️❄️
       ↓
   User thinks: "Snowflake!"
       ↓
   Types "snowflake"
       ↓
   Success! 🎉
```

## Technical Details

### Component State
```typescript
const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
const [showingHint, setShowingHint] = useState(false);
```

### Snowflake Type
```typescript
interface Snowflake {
  id: number;          // Unique identifier
  left: number;        // Horizontal position (%)
  animationDuration: number;  // Fall speed (seconds)
  size: number;        // Size multiplier (em)
}
```

### Implementation
- 30 snowflakes generated with random properties
- Positioned absolutely with `pointer-events-none`
- Uses CSS animation for smooth performance
- Auto-cleanup after 7 seconds

## Customization

### Change Number of Snowflakes
```typescript
const newSnowflakes: Snowflake[] = Array.from({ length: 50 }, ...);
// Change 30 to any number
```

### Change Fall Duration
```typescript
animationDuration: 2 + Math.random() * 3, // 2-5 seconds
```

### Change Animation Length
```typescript
setTimeout(() => {
  setSnowflakes([]);
  setShowingHint(false);
}, 10000); // 10 seconds instead of 7
```

### Change Snowflake Style
Replace `❄️` with:
- `*` for stars
- `♥️` for hearts
- `🌸` for flowers
- Any emoji or text!

## Styling

### Hint Button
- Background: `bg-white/20` (semi-transparent)
- Backdrop blur for glass effect
- Hover: `bg-white/30` with scale effect
- Disabled state: 50% opacity, no pointer events

### Snowflakes
- Color: White (matches password scene theme)
- Opacity: 80-100% at start, fades to 40%
- Rotation: 0° to 360° during fall
- Pointer events disabled (doesn't interfere with interaction)

## Mobile Responsive

- Works on touch devices
- Button properly sized for mobile taps
- Animation performs well on mobile
- Snowflakes adjust to viewport height

## Browser Compatibility

✅ Modern browsers (Chrome, Firefox, Safari, Edge)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  
✅ Uses standard CSS animations (no special libraries)  
✅ Graceful degradation if animations disabled

## Testing

Visit: http://localhost:3000/vday

1. Click "💡 Hint" button
2. Watch snowflakes fall
3. Notice button is disabled during animation
4. Snowflakes disappear after falling
5. Try entering "snowflake" as password
6. Success!

## Tips

- The hint is subtle but clear - snowflakes hint at "snowflake"
- Animation is smooth and performant
- Doesn't block interaction after first second
- Creates a magical, romantic atmosphere
- Fits perfectly with Valentine's Day theme

## Future Enhancements

Possible additions:
- Sound effect on hint click
- Different snowflake shapes
- Accumulation at bottom (like snow piling up)
- Interactive snowflakes (click to remove)
- Multiple hint levels with different animations

---

**Created:** February 2026  
**Status:** ✅ Implemented & Working  
**Password:** `snowflake`
