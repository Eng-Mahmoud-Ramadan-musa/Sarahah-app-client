# Sarahah App Client

This is the frontend (React) for the Sarahah App.

## How to run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Build for production

```bash
npm run build
```

## Docker

To build and run with Docker:

```bash
docker build -t sarahah-client .
docker run -p 80:80 sarahah-client
```
