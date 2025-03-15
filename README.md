# 🚀 Zaytoun - Djezzy Code Fest Submission (Frontend)

## 🏆 Team Name

**Zaytoun**

## 📖 Project Description

Algeria, like many other countries, faces a significant food waste crisis. Despite food insecurity affecting parts of the population, large quantities of edible food go to waste due to:

- Inefficient food distribution between suppliers, restaurants, and consumers.
- Lack of awareness about food conservation and sustainable consumption.
- Surplus food in supermarkets and restaurants that is discarded instead of redistributed.

Our web application built with NextJS gives solution to that.

It features a modern UI with **ShadCN**, handles state management and API requests efficiently with **React Query**, and implements **cookie-based authentication** for secure user sessions.

## Tech Stack

- **Next.js** - React framework for server-side rendering and static site generation.
- **ShadCN** - UI components for a clean and accessible design.
- **React Query** - Data fetching, caching, and synchronization.
- **Tailwind CSS** - Utility-first CSS framework.
- **Axios** - HTTP client for API requests.
- **Yup** - Schema validation.
- **Cookies** - Used for authentication and session management.

## Features

- Secure authentication system with **cookie-based auth**.
- Optimized API fetching and caching with **React Query**.
- Modern and accessible UI with **ShadCN components**.
- Responsive and fast-loading pages with **Next.js optimizations**.

## Pages & Routes

### 1. Landing Page (`/`)

- Introduction to the platform.
- Call-to-action buttons.

### 2. Authentication Pages

- **Sign In (`/signin`)**: Login form with email/password authentication.
- **Sign Up (`/signup`)** (if applicable): User registration.

### 3. Dashboard (`/dashboard`)

- **Regular**: User-specific data summary.
- **Restaurants**: Page for restaurants.
- **Organizations**: Page for orgs.

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/ramzy1453/djezzy-code-fest-front
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```
   The app should now be running on `http://localhost:3000`.

## Authentication Flow

- The user signs in via the `/signin` page.
- A cookie containing the authentication token is set.
- Protected routes (e.g., `/dashboard`) check for the valid cookie.
- Users can log out, clearing the authentication cookie.
