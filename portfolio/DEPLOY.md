# Deployment Guide - Devesh Portfolio

## Project Structure

```
Portfolio/
├── index.html          # Development version
├── css/
│   └── styles.css      # Development CSS
├── js/
│   └── main.js         # Development JS
└── dist/               # Production build
    ├── index.html      # Minified references
    ├── css/
    │   └── styles.min.css  # Minified CSS (28KB)
    └── js/
        └── main.min.js     # Minified JS (7KB)
```

## Quick Deploy

### Option 1: Deploy `dist/` Folder (Recommended)
Upload the entire `dist/` folder contents to your web server.

### Option 2: Deploy Root Folder
For development/testing, deploy the root `Portfolio/` folder directly.

---

## Antigravity Deployment Steps

### Step 1: Prepare Files
1. Open terminal in `Portfolio/` directory
2. Verify `dist/` folder contains:
   - `index.html`
   - `css/styles.min.css`
   - `js/main.min.js`

### Step 2: Deploy to Antigravity
```bash
# Navigate to project
cd c:\Users\deves\Documents\Portfolio

# Deploy the dist folder
antigravity deploy ./dist
```

### Step 3: Configure Domain (Optional)
```bash
antigravity domain set yourdomain.com
```

---

## Pre-Deployment Checklist

- [x] CSS minified (40KB → 28KB)
- [x] JavaScript minified (11KB → 7KB)
- [x] Mobile responsive verified
- [x] All internal links valid (#home, #about, etc.)
- [x] External links open in new tab
- [x] Meta tags configured (SEO)
- [x] Smooth scroll enabled
- [x] Form validation working
- [x] Animations lightweight (no libraries)

## Performance

| Metric | Value |
|--------|-------|
| HTML | 35KB |
| CSS (min) | 28KB |
| JS (min) | 7KB |
| **Total** | **~70KB** |
| Fonts | Google Fonts (Poppins) |

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Notes

- No backend required
- Contact form simulates submission (no server)
- Replace placeholder links with actual URLs:
  - `devesh@example.com`
  - `github.com/devesh`
  - `linkedin.com/in/devesh`
