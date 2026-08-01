# ForgeMind AI - React Frontend

This directory contains the React Frontend application built with Vite, React 19, React Router v7, TailwindCSS v4, and Lucide Icons.

## Project Structure

```
Frontend/
├── public/          # Static assets (favicon, icons)
├── src/
│   ├── api/         # Axios API client & mock endpoints
│   ├── assets/      # Image assets & SVG vector files
│   ├── components/  # Modular UI & domain components
│   ├── config/      # Navigation & theme configuration
│   ├── context/     # React Context state providers (Auth, Telemetry, Copilot, etc.)
│   ├── data/        # Mock datasets for offline / fallback operations
│   ├── hooks/       # Custom React hooks
│   ├── layouts/     # Application shell layouts (AppLayout, Navbar, Sidebar)
│   ├── pages/       # Page components for each route
│   ├── routes/      # AppRoutes router definitions & ProtectedRoute wrapper
│   ├── App.jsx      # Top-level application provider tree
│   ├── main.jsx     # Vite entry point
│   └── index.css    # Global CSS & Tailwind imports
├── index.html       # HTML host document
├── package.json     # Node.js dependencies and scripts
└── vite.config.js   # Vite bundle configuration
```

## Quick Start Instructions

Run all commands from within the `Frontend` directory:

1. **Navigate to the Frontend directory**:
   ```bash
   cd Frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Lint Source Files**:
   ```bash
   npm run lint
   ```
