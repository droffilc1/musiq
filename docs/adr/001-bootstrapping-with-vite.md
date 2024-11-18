# Bootstrapping with Vite
- **Status:** Accepted
- **Date:** 2024-11-18

## Context
I need to choose a build tool to bootstrap my Spotify client project. Key considerations include speed, ease of use with React and TypeScript, and modern tooling support. The primary options are Vite, Create React App (CRA), and Next.js.

## Decision
I will use Vite to bootstrap the project.

## Consequences
### Positive
- Faster build times due to Vite’s use of ESBuild for development and Rollup for production.
- Excellent support for React + TypeScript projects.
- Lightweight setup compared to CRA, allowing more control over the project structure.

### Negative
- Requires more manual configuration for features like SSR compared to Next.js.

## Alternatives Considered
### Create React App (CRA)
**Pros:**
- Time-tested and beginner-friendly.
- Out-of-the-box React setup.

**Cons:**
- Slower build times.
- Larger configuration files compared to Vite.

### Next.js
**Pros:**
- Built-in SSR and API routes.
- Strong ecosystem for full-stack development.

**Cons:**
- Overhead for features like SSR, which I don't need in a single-page app.

## References
- [Vite Documentation](https://vitejs.dev/)
- [Why Vite is Faster](https://vitejs.dev/guide/why.html)
