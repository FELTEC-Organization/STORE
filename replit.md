# Store Feltec - Replit Setup

## Overview
This is a modern e-commerce store application built with Next.js 15, React 19, and Tailwind CSS. The application features a complete product catalog, administrative functionality, and user authentication.

## Project Status
- ✅ Successfully imported from GitHub 
- ✅ Dependencies installed (npm install completed)
- ✅ Development server configured for Replit environment
- ✅ Workflow configured and running on port 5000
- ✅ Deployment configuration set up
- ✅ Next.js configured for Replit proxy compatibility

## Architecture
- **Frontend Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI components with shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Authentication**: Mock authentication system (ready for real integration)

## Key Features
- Modern responsive design
- Product catalog and management
- User administration
- Authentication system (login/password renewal)
- Administrative panels for products and users
- Interactive components with animations
- Toast notifications

## Configuration
- Server runs on `0.0.0.0:5000` for Replit compatibility
- Next.js configured with CORS headers for proxy environment
- Build process optimized with `--no-lint` flag
- Development mode uses standard Next.js (Turbopack disabled for stability)

## Deployment
- **Target**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npm start`
- Ready for production deployment via Replit's publish feature

## Recent Changes
- 2025-09-29: Initial Replit environment setup completed
- Fixed Next.js configuration for proxy compatibility
- Removed Turbopack due to compatibility issues
- Configured proper CORS headers and host binding