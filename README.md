# Sarahah App Client

A modern frontend for the Sarahah App, built with [React](https://react.dev/) and [Vite](https://vitejs.dev/).

## Requirements

- Node.js 18 or newer
- npm (or yarn)

## Getting Started (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## Production Build

To build the app for production:
```bash
npm run build
```
The output will be in the `dist` folder.

To preview the production build locally:
```bash
npm run preview
```

## Docker

To build and run the app using Docker:
```bash
docker build -t sarahah-client .
docker run -p 80:80 sarahah-client
```
Then open [http://localhost](http://localhost) in your browser.

## Deploying to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/).
3. Vercel will auto-detect Vite settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click Deploy and your app will be live!

## Important Files & Folders

- `src/` — Main source code (React components, pages, etc.)
- `public/` — Static assets
- `Dockerfile` — For Docker production builds
- `.dockerignore` — Files/folders excluded from Docker builds
- `vite.config.js` — Vite configuration
- `tailwind.config.js` — Tailwind CSS configuration (if used)
- `.gitignore` — Files/folders excluded from git

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

## License

This project is licensed under the MIT License.
