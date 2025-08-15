# Digital Magazines Subscription Management System

## Stack

- Fastify
- TypeScript
- PostgreSQL (via Prisma ORM)
- Nodemailer (email notifications)
- JWT (authentication)
- node-cron (task scheduling)

## Features

- User, Magazine, Article, Subscription, Payment, Comment, Activity Log management
- Role-based access (Subscriber, Publisher, Admin)
- Monthly/Yearly subscriptions
- Email notifications for expiring subscriptions
- Commenting system with moderation
- Scheduled jobs for access control and reporting
- RESTful API (testable via Postman)

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Configure `.env` with your PostgreSQL and email credentials.
3. Run Prisma migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API

- All endpoints will be documented in a Postman collection.

---

Replace placeholder values in `.env` before running the project.
