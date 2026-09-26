# Blank Canvas — Architecture

## 1. Architecture Overview

Blank Canvas uses a client-server architecture consisting of:

- React frontend
- NestJS backend
- PostgreSQL database
- Prisma ORM
- Socket.IO real-time communication
- Cloudinary image storage

The frontend communicates with the backend through REST APIs.

Real-time auction updates are delivered through WebSockets using Socket.IO.

---

## 2. High-Level Architecture

```text
                         BLANK CANVAS
                              |
              ┌───────────────┴───────────────┐
              |                               |
          REST API                        WebSocket
              |                               |
              └───────────────┬───────────────┘
                              |
                       NestJS Backend
                              |
             ┌────────────────┼────────────────┐
             |                |                |
          Prisma          Socket.IO       Cloudinary
             |                |                |
             ↓                ↓                ↓
       PostgreSQL       Real-Time Events    Images