# The Shaky Razor Barbershop

A clean, single-page scrolling website for The Shaky Razor Barbershop in San Ramon, CA.

## Tech Stack

- Plain HTML5, CSS3, and vanilla JavaScript
- No frameworks, no build step
- Google Fonts (Cinzel + Lato)
- Fully responsive (mobile-first)

## Project Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # JavaScript functionality
├── images/
│   ├── Logo.PNG        # Shop logo
│   └── barbers/
│       └── Gregory.png # Barber photos
└── README.md           # This file
```

## Local Development

1. Clone the repository
2. Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## Deployment (Vercel)

1. Push this repo to GitHub
2. Connect to Vercel at [vercel.com](https://vercel.com)
3. Import the repository
4. Deploy (no build settings needed - it's static)

## Updating Content

### Placeholder Items to Update

The following items are marked with comments in the code for easy updating:

#### 1. Service Prices (`index.html`)
Look for `PLACEHOLDER PRICES - UPDATE WITH ACTUAL PRICING` in the services section.

#### 2. Gregory's Bio (`js/main.js`)
Look for `PLACEHOLDER BIO - UPDATE WITH ACTUAL CONTENT` in the `barbersData` array.

#### 3. Individual Booking Links (`js/main.js`)
Look for `INDIVIDUAL BOOKING LINK - UPDATE WHEN AVAILABLE`. Replace the general Vagaro link with individual barber booking pages.

#### 4. Barber Gallery Images (`js/main.js`)
Look for `GALLERY IMAGES - ADD WHEN AVAILABLE`. Replace `null` with an array of image objects:
```javascript
gallery: [
    { src: 'images/gallery/cut1.jpg', alt: 'Fade haircut' },
    { src: 'images/gallery/cut2.jpg', alt: 'Beard trim' }
]
```

### Adding a New Barber

1. Add their photo to `images/barbers/`
2. Add a new card in `index.html` (copy the Gregory card structure)
3. Add their data to the `barbersData` array in `js/main.js`

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Dark Green | `#1a2e1a` | Main background |
| Secondary Green | `#2d4a2d` | Alternate sections |
| Gold | `#c9a84c` | Accents, buttons, headings |
| Cream | `#e8dcc8` | Body text |
| White | `#ffffff` | High-contrast text |

## Features

- Sticky header with blur effect
- Mobile hamburger menu
- Smooth scroll navigation
- Barber profile modals
- Fade-in scroll animations
- Keyboard accessible
- Reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari / Chrome

## Contact

The Shaky Razor Barbershop
2438 San Ramon Valley Blvd
San Ramon, CA 94583
(925) 718-5995

- [Instagram](https://www.instagram.com/shakyrazorbarbershop)
- [Yelp](https://www.yelp.com/biz/the-shaky-razor-barbershop-san-ramon)
- [Book Online](https://www.vagaro.com/theshakyrazorbarbershop)
