# Project Roadmap

## Current Phase
We are currently in **Phase 1: Minimum Viable Product (MVP)**.
The primary goal is to launch the core marketplace allowing students to find and request units.

## Completed Milestones
- [x] Monorepo Architecture setup
- [x] Database Schema design (Identity, Geography, Property, Unit, Marketplace)
- [x] Core shared packages (validation, types, constants)

## Upcoming Milestones
- [ ] Authentication Module (Firebase OTP)
- [ ] Property & Unit Management Endpoints
- [ ] Mobile App Core UI (React Native)
- [ ] Stay Request Workflow

## Future Architecture
### Backend
- Transition to microservices if domain bounds (e.g., Chat vs. Marketplace) require independent scaling.
- Integrate Redis for caching and session management.

### Mobile
- Push notifications via Firebase Cloud Messaging.
- Offline support for saved listings.

### Admin
- Next.js dashboard for customer support and KYC verifications.

### Deployment
- Hostinger VPS with Docker Compose for MVP.
- Future migration to Kubernetes if horizontal scaling is required.
