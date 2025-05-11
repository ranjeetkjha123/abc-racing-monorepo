# ABC Racing Frontend

This is the frontend application for the ABC Racing project, built with Next.js and Tailwind CSS. It features racing news, driver stats, upcoming races, and PWA support.

## Features
- Next.js 14 app directory structure
- Tailwind CSS for styling
- PWA support (service worker, manifest)
- Dynamic image optimization with next/image
- Modular components (drivers, races, news, etc.)
- Internationalization support

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- pnpm (or npm/yarn)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

The app will be available at `http://localhost:3000` by default.

## Example Usage

### Displaying an Optimized Image
```tsx
import Image from 'next/image';

<Image
  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
  alt="Race Day"
  width={800}
  height={533}
  className="rounded-lg shadow-lg"
/>
```

### Using a Component
```tsx
import TopDrivers from '../components/top-drivers';

<TopDrivers />
```

## Configuration Notes
- External images from `images.unsplash.com` are allowed via `next.config.js`:
  ```js
  images: {
    domains: ['images.unsplash.com'],
  },
  ```
- Tailwind CSS is configured in `tailwind.config.ts`.
- Service worker is registered via `lib/register-sw.ts`.

## Project Structure
- `app/` - Next.js app directory (pages, routes)
- `components/` - Reusable UI and feature components
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and service worker registration
- `public/` - Static assets and icons
- `styles/` - Global and component styles

---

For more details, see the source code and comments in each file.
