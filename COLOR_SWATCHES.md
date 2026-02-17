# IMA Systems - Color Swatch Reference

## 🎨 Complete Color Palette

### PRIMARY BACKGROUNDS
```
┌──────────────────────────────────────────────────────────┐
│ DEEP INK - Main Background                               │
│ #0a0d1a                                                  │
│ RGB: 10, 13, 26                                          │
│ HSL: 216°, 45%, 7%                                       │
│ USE: Full page backgrounds, primary container            │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ MIDNIGHT BLUE - Secondary Background                     │
│ #0f1427                                                  │
│ RGB: 15, 20, 39                                          │
│ HSL: 219°, 44%, 10%                                      │
│ USE: Hero sections, large feature areas, gradients       │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ SLATE - Card & Container Background                      │
│ #1a1f35                                                  │
│ RGB: 26, 31, 53                                          │
│ HSL: 219°, 34%, 15%                                      │
│ USE: Cards, modals, highlighted sections                 │
└──────────────────────────────────────────────────────────┘
```

### ACCENT COLORS

```
┌──────────────────────────────────────────────────────────┐
│ BRILLIANT CYAN - Primary Accent                          │
│ #00e5ff                                                  │
│ RGB: 0, 229, 255                                         │
│ HSL: 186°, 100%, 50%                                     │
│ USE: Primary CTAs, active states, links, highlights      │
│ Contrast Ratio: 5.2:1                                    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ OCEAN BLUE - Secondary Accent                            │
│ #0099dd                                                  │
│ RGB: 0, 153, 221                                         │
│ HSL: 197°, 100%, 43%                                     │
│ USE: Secondary buttons, alternatives, hovers             │
│ Contrast Ratio: 4.8:1                                    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ EMERALD - Tertiary Accent (Premium/Success)              │
│ #00d47f                                                  │
│ RGB: 0, 212, 127                                         │
│ HSL: 151°, 100%, 42%                                     │
│ USE: Success states, confirmations, premium highlights   │
│ Contrast Ratio: 6.2:1                                    │
└──────────────────────────────────────────────────────────┘
```

### TEXT COLORS

```
┌──────────────────────────────────────────────────────────┐
│ PURE WHITE - Primary Text                                │
│ #ffffff                                                  │
│ RGB: 255, 255, 255                                       │
│ HSL: 0°, 0%, 100%                                        │
│ USE: Headlines, primary body text, emphasis              │
│ Contrast Ratio: 21:1 on deep ink                         │
│ WCAG Level: AAA ✅                                       │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ LIGHT GRAY - Secondary Text                              │
│ #d1d5db                                                  │
│ RGB: 209, 213, 219                                       │
│ HSL: 210°, 14%, 84%                                      │
│ USE: Supporting text, descriptions, secondary info       │
│ Contrast Ratio: 14:1 on deep ink                         │
│ WCAG Level: AA ✅                                        │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ MEDIUM GRAY - Tertiary Text                              │
│ #b0b5bc                                                  │
│ RGB: 176, 181, 188                                       │
│ HSL: 210°, 8%, 71%                                       │
│ USE: Disabled states, placeholders, muted text           │
│ Contrast Ratio: 9:1 on deep ink                          │
│ WCAG Level: AA ✅                                        │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ DARK GRAY - Muted Text                                   │
│ #6b7280                                                  │
│ RGB: 107, 114, 128                                       │
│ HSL: 210°, 9%, 46%                                       │
│ USE: Minimal contrast, hints, tooltips                   │
│ Contrast Ratio: 3.2:1 on deep ink                        │
│ WCAG Level: Large text only                              │
└──────────────────────────────────────────────────────────┘
```

### BORDER & SEMANTIC

```
┌──────────────────────────────────────────────────────────┐
│ SLATE GRAY - Borders & Dividers                          │
│ #2d3748                                                  │
│ RGB: 45, 55, 72                                          │
│ HSL: 210°, 23%, 23%                                      │
│ USE: Card borders, dividers, subtle backgrounds          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ SUCCESS - Positive States                                │
│ #10b981                                                  │
│ RGB: 16, 185, 129                                        │
│ HSL: 160°, 84%, 39%                                      │
│ USE: Confirmation messages, success badges               │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ WARNING - Alert States                                   │
│ #f59e0b                                                  │
│ RGB: 245, 158, 11                                        │
│ HSL: 38°, 92%, 50%                                       │
│ USE: Warning messages, alert badges                      │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ ERROR - Error States                                     │
│ #ef4444                                                  │
│ RGB: 239, 68, 68                                         │
│ HSL: 0°, 88%, 60%                                        │
│ USE: Error messages, critical alerts                     │
└──────────────────────────────────────────────────────────┘
```

---

## 📐 Gradient Combinations

### Hero Section Gradient
```css
background: linear-gradient(135deg, #0a0d1a 0%, #0f1427 100%);
/* From Deep Ink to Midnight Blue - Premium feel */
```

### Card Hover Gradient
```css
background: linear-gradient(135deg, #1a1f35 0%, #2d3748 100%);
/* From Slate to Slate Gray - Subtle depth */
```

### Accent Gradient
```css
background: linear-gradient(135deg, #00e5ff 0%, #0099dd 100%);
/* From Cyan to Ocean - Smooth accent blend */
```

---

## 🌟 Glow Effects

### Cyan Glow
```css
box-shadow: 0 0 24px rgba(0, 229, 255, 0.35);
/* Brilliant cyan, 35% opacity */
```

### Blue Glow
```css
box-shadow: 0 0 24px rgba(0, 153, 221, 0.30);
/* Ocean blue, 30% opacity */
```

### Emerald Glow
```css
box-shadow: 0 0 24px rgba(0, 212, 127, 0.25);
/* Premium emerald, 25% opacity */
```

---

## 🎯 Component Color Usage

### Buttons

**Primary Button**
```css
background-color: #00e5ff;           /* Brilliant Cyan */
color: #0a0d1a;                      /* Deep Ink text */
border: 1px solid #00e5ff;
```

**Secondary Button**
```css
background-color: transparent;
border: 1px solid #0099dd;           /* Ocean Blue */
color: #0099dd;
```

**Success Button**
```css
background-color: #00d47f;           /* Emerald */
color: #0a0d1a;
border: 1px solid #00d47f;
```

### Cards

**Card Container**
```css
background-color: #1a1f35;           /* Slate */
border: 1px solid #2d3748;           /* Slate Gray */
border-radius: 8px;
```

**Card Title**
```css
color: #ffffff;                      /* Pure White */
font-weight: 700;
```

**Card Text**
```css
color: #d1d5db;                      /* Light Gray */
font-weight: 400;
```

### Forms

**Input Background**
```css
background-color: #0a0d1a;           /* Deep Ink */
border: 1px solid #2d3748;           /* Slate Gray */
color: #ffffff;                      /* Pure White */
```

**Input Focus**
```css
border-color: #00e5ff;               /* Brilliant Cyan */
box-shadow: 0 0 12px rgba(0, 229, 255, 0.25);
```

**Placeholder**
```css
color: #b0b5bc;                      /* Medium Gray */
opacity: 0.7;
```

---

## 💾 CSS Variable Names

### Colors
```css
--color-deep-ink: #0a0d1a;
--color-midnight: #0f1427;
--color-slate: #1a1f35;
--color-cyan-bright: #00e5ff;
--color-ocean: #0099dd;
--color-emerald: #00d47f;
--color-slate-gray: #4a5568;
--color-white: #ffffff;
--color-light-gray: #f0f2f5;
--color-medium-gray: #b0b5bc;
--color-dark-gray: #6b7280;
```

### Text Colors
```css
--text-primary: #ffffff;
--text-secondary: #d1d5db;
--text-tertiary: #9ca3af;
```

### Backgrounds
```css
--bg-primary: #0a0d1a;
--bg-secondary: #0f1427;
--bg-tertiary: #1a1f35;
```

### Accents
```css
--accent: #00e5ff;
--accent-secondary: #0099dd;
--accent-tertiary: #00d47f;
```

### Other
```css
--border: #2d3748;
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
```

---

## 🔄 Copy-Paste Color Values

### Hex Codes
```
#0a0d1a #0f1427 #1a1f35 #00e5ff #0099dd #00d47f 
#4a5568 #ffffff #f0f2f5 #b0b5bc #6b7280 #2d3748
#d1d5db #9ca3af #10b981 #f59e0b #ef4444
```

### RGB Format
```
rgb(10, 13, 26)      rgb(15, 20, 39)      rgb(26, 31, 53)
rgb(0, 229, 255)     rgb(0, 153, 221)     rgb(0, 212, 127)
rgb(255, 255, 255)   rgb(209, 213, 219)   rgb(176, 181, 188)
```

### HSL Format
```
hsl(216, 45%, 7%)    hsl(219, 44%, 10%)   hsl(219, 34%, 15%)
hsl(186, 100%, 50%)  hsl(197, 100%, 43%)  hsl(151, 100%, 42%)
hsl(0, 0%, 100%)     hsl(210, 14%, 84%)   hsl(210, 8%, 71%)
```

---

## 📋 Tailwind Class Names

```html
<!-- Text Colors -->
<p class="text-white">Primary text</p>
<p class="text-light-gray">Secondary text</p>

<!-- Background Colors -->
<div class="bg-deep-ink">Deep ink bg</div>
<div class="bg-slate">Slate bg</div>

<!-- Accent Colors -->
<button class="bg-cyan-bright">Primary button</button>
<button class="bg-ocean">Secondary button</button>

<!-- Border Colors -->
<div class="border border-slate-gray">Card</div>
```

---

**Status: ✅ COMPLETE COLOR REFERENCE GUIDE**

All colors are production-ready and optimized for web accessibility.
