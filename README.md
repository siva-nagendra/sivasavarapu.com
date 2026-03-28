# sivasavarapu.com

Personal portfolio for Siva Nagendra Savarapu, built with Next.js App Router, Tailwind CSS v4, GSAP, and Three.js.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- GSAP
- Three.js
- `next-sitemap`

## Local Development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

The site runs locally at [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
```

`npm run build` also generates sitemap files through `next-sitemap`.

## Project Structure

- `app/` contains the App Router entrypoints, metadata, and global styles.
- `components/` contains the portfolio sections and shared UI pieces.
- `public/images/` contains the hero photo and static image assets.

## Deployment

The site is deployed on Vercel.

- Production alias: [https://sivasavarapucom.vercel.app](https://sivasavarapucom.vercel.app)
- Custom domain: [https://sivasavarapu.com](https://sivasavarapu.com)

If the custom domain needs to be reconfigured outside Vercel, the current apex DNS points to:

```txt
A  sivasavarapu.com  76.76.21.21
```

`www.sivasavarapu.com` is also configured to point at Vercel.
