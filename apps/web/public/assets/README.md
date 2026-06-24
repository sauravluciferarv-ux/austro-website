# /public/assets — Desk365 Asset Library

All static assets for the Desk365 website are organized here.

## Directory Structure

```
/public/assets/
├── images/          — Page-specific photography and illustrations
│   ├── home/        — Hero, section, and feature images
│   ├── blog/        — Blog post cover images
│   ├── pricing/     — Pricing page visuals
│   └── about/       — Team and office photos
│
├── icons/           — UI icons (SVG preferred, 24×24 or 20×20)
│
├── logos/           — Brand logos of partner/integration companies
│   ├── customers/   — Customer company logos (trust bar)
│   └── integrations/ — Integration partner logos
│
├── backgrounds/     — Section background textures and patterns
│
└── videos/          — MP4 / WebM demo videos and walkthroughs
```

## Naming Conventions

- Use kebab-case: `hero-dashboard.png`
- Include size hint for large assets: `hero-dashboard-2x.png`
- Add `-dark` suffix for dark-mode variants: `logo-dark.svg`

## Asset Guidelines

| Type       | Format | Max size |
|------------|--------|----------|
| Photos     | WebP   | 200 KB   |
| Logos      | SVG    | 10 KB    |
| Icons      | SVG    | 4 KB     |
| OG images  | JPG    | 150 KB   |
| Videos     | MP4    | 5 MB     |

## Extracting from Desk365.io

Use browser DevTools → Network tab → filter by `img` and `media` to find
asset URLs, then download and place in the appropriate subdirectory here.
