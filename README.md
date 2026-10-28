# Mitijen Interiors — Residential & Commercial Interior Architecture

An architectural, editorial web portfolio and digital presence for **Mitijen Interiors**, a premier interior architecture studio based in Tamil Nadu (Coimbatore & Krishnagiri), India. 

Designed with a high-end luxury editorial aesthetic inspired by Scandinavian minimalism, monolithic geometry, and warm material tactility.

---

## 🏛️ Studio Overview

Mitijen Interiors specializes in contemporary residential architecture, luxury villas, apartment transformations, commercial retail venues, and corporate executive workspaces. The studio combines turnkey execution, bespoke joinery, monolithic natural stone, and tailored illumination.

- **Primary Studio**: Coimbatore, Tamil Nadu
- **Consultation Hub**: Krishnagiri, Tamil Nadu
- **Direct Line**: `+91 89405 55526` / `+91 94443 28555`
- **Email**: `hello@mitijeninteriors.com`

---

## ✨ Key Features & Architecture

### 1. Cinematic Hero Banner
- **WebGL Displacement Transitions**: Directional liquid distortion shader built with Three.js for seamless switching between residential architectural concepts.
- **365 Grotesk & Typewriting Animation**: Headline text and studio branding feature character-by-character typewriter animations with glowing architectural cursors.
- **Interactive Concept Tabs**: Explore residential categories (*Residential Studio*, *Contemporary Architecture*, *Monolithic Living*) with synchronized text masks.

### 2. Mobile-Optimized Navigation
- **Classic 3-Bar Hamburger Menu (`≡`)**: Custom animated SVG/CSS button morphing cleanly into an `✕` close indicator.
- **Full-Screen Dark Architectural Drawer**: Safe-area padded menu featuring studio directory links, an expandable services accordion, quick contact metadata, and direct WhatsApp links.
- **Background Scroll Locking**: Eliminates scroll leakage when the mobile drawer is open.

### 3. Comprehensive Project Monograph & Portfolio
- **Multiple Layout Modes**: Switch dynamically between *Editorial*, *Full Showcase*, and *Index List* viewports.
- **Category Filter Matrix**: Filter projects across *All*, *Living*, *Kitchen*, *Bedrooms*, *Joinery*, and *Bathrooms*.
- **Interactive 3D Study Canvas**: Explore viewpoints and rotational angles of curated interior spaces.
- **Before & After Visualizer**: Touch-friendly split-screen interactive slider showing raw civil stages vs. white-glove handovers.

### 4. Zero-Scroll Single-Screen Project Enquiry Dialog
- **Universal Global Context (`useInquiry`)**: Triggerable from any page, CTA button, or monograph.
- **1-Screen Zero-Scroll Ergonomics**: Compact dual-column desktop layout and streamlined single-column mobile view with adaptive form controls for instant, frustration-free conversions.

### 5. Architectural Service Showcases
- Dedicated landing pages for:
  - **Residential Interior Design** (`/services/residential-interior-design`)
  - **Commercial Interior Design** (`/services/commercial-interior-design`)
  - **Corporate Interior Design** (`/services/corporate-interior-design`)
- Includes room-by-room breakdowns, material palette specifications, 5-step delivery process, and interactive FAQ accordions.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Motion & Dynamics** | [GSAP](https://greensock.com/gsap/) (GreenSock) + ScrollTrigger |
| **3D & Shaders** | [Three.js](https://threejs.org/) (GLSL WebGL displacement shaders) |
| **Styling** | Vanilla CSS with scoped design tokens & responsive fluid typography |
| **SEO & Head Management** | Custom lightweight `<SEO />` document metadata component |

---

## 🎨 Design System & Palette

- **Ivory (`#F5F2EC`)**: Soft gallery walls, linen textures, daylight surfaces.
- **Ink (`#242522`)**: Architectural contrast, structural lines, dark drawer backdrops (`#151614`).
- **Sand / Champagne (`#D8C8B4` / `#C5A059`)**: Travertine stone, brass accents, interactive highlights.
- **Olive (`#777B61`)**: Biophilic botanical accents and subtle hover states.
- **Warm Wood / Brown (`#493B30`)**: Natural smoked oak and walnut timber tones.

### Typography
- **Architectural Display**: `365 Grotesk` / `Space Grotesk`
- **Editorial Headings**: `Cormorant Garamond`
- **Body & Content**: `Manrope` / `Inter`
- **Studio Monogram**: `Baskervville SC`

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. Clone or extract the repository:
   ```bash
   git clone <repository-url>
   cd mitijen-interiors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📦 Available Scripts

- **`npm run dev`**: Starts the Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Runs type checking (`tsc -b`) and bundles production assets into `dist/`.
- **`npm run preview`**: Locally serves the production build from `dist/` to verify optimization.
- **`npm run lint`**: Runs Oxlint for ultra-fast static code analysis.

---

## 📁 Project Directory Structure

```text
mitijen-interiors/
├── public/                     # Static assets, floor plans, and photography
│   ├── assets/                 # High-resolution interior project photography
│   │   ├── mitijen/            # Studio projects, before/after captures, panoramas
│   │   └── transformations/    # Transformation before/after comparison imagery
│   └── favicon.svg             # Studio architectural monogram favicon
├── src/
│   ├── assets/                 # SVGs and inline branding assets
│   ├── components/             # Reusable UI sections & architecture components
│   │   ├── common/             # SEO, SectionLabel, Breadcrumbs, WebGL Canvases
│   │   ├── Header.tsx          # Mobile-optimized header with 3-bar hamburger drawer
│   │   ├── Footer.tsx          # Studio directory footer
│   │   ├── HeroSection.tsx     # Cinematic WebGL hero banner with typewriter text
│   │   ├── InquiryDialog.tsx   # 1-screen responsive project enquiry modal
│   │   └── ...
│   ├── context/                # Global state (InquiryContext)
│   ├── data/                   # Structured portfolio, materials, and services data
│   ├── hooks/                  # Reveal observers, scroll synchronization hooks
│   ├── pages/                  # Page routes (Home, Projects, About, Contact, Services)
│   ├── styles/                 # Scoped stylesheets, design tokens, responsive queries
│   │   ├── ArchitecturalHero.css
│   │   ├── Header.css
│   │   ├── InquiryDialog.css
│   │   ├── variables.css
│   │   └── ...
│   ├── App.tsx                 # Route configuration & context providers
│   └── main.tsx                # React root mount
├── .gitignore                  # Git ignore rules for node, dist, and OS files
├── index.html                  # HTML5 entry with Google Fonts & preconnects
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite bundler configuration
```

---

## 📄 License

Private commercial portfolio for **Mitijen Interiors**. All photography, architectural designs, and studio branding assets are copyrighted by Mitijen Interiors.
