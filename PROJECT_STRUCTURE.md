# Project Structure

Complete overview of the Valentine's Day interactive experience.

```
vday/
├── app/                              # Next.js App Router
│   ├── api/
│   │   └── vday/
│   │       ├── validate/
│   │       │   └── route.ts          # Server-side password validation
│   │       └── gift/
│   │           └── route.ts          # Server-side gift reveal (protected)
│   ├── vday/
│   │   ├── page.tsx                  # Main experience route (state machine)
│   │   └── admin/
│   │       └── reset/
│   │           └── page.tsx          # Admin route to reset progress
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Redirects to /vday
│   └── globals.css                   # Global styles + animations
│
├── components/
│   └── vday/
│       ├── scenes/                   # Main scene components
│       │   ├── PasswordGateScene.tsx     # Initial password entry
│       │   ├── IntroVideoScene.tsx       # Video playback
│       │   ├── ClickToOpenScene.tsx      # CTA transition
│       │   ├── CardOpenScene.tsx         # 3D card opening animation
│       │   ├── LyricSlideshowScene.tsx   # Music + synced lyrics + photos
│       │   ├── RevealSiteScene.tsx       # Main content hub + scavenger hunt
│       │   ├── FinalPasswordScene.tsx    # Final answer submission
│       │   └── GiftRevealScene.tsx       # Final gift display
│       │
│       ├── interactions/             # Scavenger hunt components
│       │   ├── TearReveal.tsx        # Drag to tear paper effect
│       │   ├── PocketOpen.tsx        # Click to open pocket
│       │   └── FlipPhoto.tsx         # Click to flip card
│       │
│       └── ui/                       # Reusable UI components
│           ├── SceneShell.tsx        # Scene wrapper layout
│           └── ModalLightbox.tsx     # Photo lightbox overlay
│
├── lib/
│   └── vday/
│       ├── config.ts                 # App configuration (passwords, keys)
│       ├── state.ts                  # State management + localStorage hook
│       └── data.ts                   # Data loading helpers
│
├── data/
│   └── vday/
│       ├── lyrics.json               # Song lyrics with timestamps
│       ├── poems.json                # Love poems
│       ├── notes.json                # Romantic notes
│       ├── clues.json                # Scavenger hunt clue definitions
│       └── photos.ts                 # Photo path exports
│
├── public/
│   └── vday/                         # Static assets (add your own!)
│       ├── intro.mp4                 # Intro video
│       ├── song.mp3                  # Background music
│       └── photos/                   # Photo collection
│           ├── 1.jpg
│           ├── 2.jpg
│           └── ...
│
├── scripts/
│   └── check-setup.js                # Setup validation script
│
├── .env.local                        # Environment variables (server secrets)
├── .env.example                      # Template for .env.local
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind CSS config
├── next.config.mjs                   # Next.js config
├── README.md                         # Project documentation
└── SETUP_GUIDE.md                    # Quick start guide
```

## State Flow

```
gate → video → click_open → card → lyrics → reveal → final_gate → gift
```

### State Descriptions

1. **gate** - Initial password entry
2. **video** - Intro video playback
3. **click_open** - Simple CTA before card
4. **card** - 3D card opening animation
5. **lyrics** - Song with synced lyrics + photo slideshow
6. **reveal** - Main content hub with scavenger hunt
7. **final_gate** - Final password to unlock gift
8. **gift** - Gift reveal (server-validated)

## Component Hierarchy

```
App
└── VdayPage (State Machine)
    ├── PasswordGateScene
    ├── IntroVideoScene
    ├── ClickToOpenScene
    ├── CardOpenScene
    ├── LyricSlideshowScene
    ├── RevealSiteScene
    │   ├── TearReveal × N
    │   ├── PocketOpen × N
    │   ├── FlipPhoto × N
    │   └── ModalLightbox (conditional)
    ├── FinalPasswordScene
    └── GiftRevealScene
```

## Data Flow

### Client State (localStorage)
- Current scene/state
- Found clue IDs
- Attempt counter
- Persists across refreshes

### Server State (cookies)
- Auth token after final password validation
- httpOnly, secure cookie
- Required for gift access

## Key Technologies

- **Next.js 14** - App Router, Server Components, API Routes
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **GSAP** - High-performance animations
- **Native HTML5** - `<audio>` and `<video>` elements

## Styling System

### Colors (Tailwind Config)
- `vday-pink` - #FFB3BA
- `vday-rose` - #FF6B9D
- `vday-purple` - #C77DFF
- `vday-lavender` - #E0BBE4
- `vday-cream` - #FFF5E1

### Custom Animations (globals.css)
- `animate-fadeIn` - Fade in with slide up
- `animate-shake` - Horizontal shake effect
- `animate-pulse` - Built-in Tailwind pulse
- `animate-bounce` - Built-in Tailwind bounce

## Security Model

### Client-Side
- Initial password check (cosmetic only)
- Progress saved in localStorage
- All content visible in source code

### Server-Side
- Final answer validation in API route
- Environment variable for correct answer
- httpOnly cookie for auth token
- Gift data only accessible with valid token

## Performance Considerations

- Static generation where possible
- Dynamic imports for heavy components
- Optimized images recommended
- Audio/video preloading
- Minimal bundle size (122 kB main route)

## Browser Compatibility

- Modern browsers (ES2017+)
- Mobile-first responsive design
- Touch and mouse interactions
- Autoplay fallbacks for audio/video

## Customization Points

1. **Colors** - `tailwind.config.ts`
2. **Passwords** - `lib/vday/config.ts` + `.env.local`
3. **Content** - `data/vday/*.json`
4. **Assets** - `public/vday/`
5. **Animations** - Component files + GSAP timelines
6. **Layout** - Component files + Tailwind classes
