Title: Dynamic Product Configuration & Pricing Platform

A full-stack web application that allows users to dynamically configure products, calculate prices based on selected options, and place orders.
The system is designed with a strong backend focus, keeping all business logic, pricing, and validation on the server side.

📌 Problem Statement

Many businesses sell customizable products (such as shoes, laptops, furniture, or apparel) where the final price depends on multiple user-selected options like size, color, or add-ons.
Handling dynamic pricing, configuration validation, and order creation in a scalable way is a real-world backend challenge.

This project aims to solve that problem with a clean, database-driven, and extensible architecture.

✨ Features

🔐 Email-based Authentication

JWT authentication with HttpOnly cookies

No hardcoded users

Secure user session handling

🛍️ Dynamic Product Configuration

Products with base prices

Multiple option categories (e.g., Size, Color)

Options with individual price modifiers

Fully database-driven (no hardcoded values)

💰 Backend-Driven Pricing Engine

Final price calculated on the backend

Based on base price + selected options

Centralized pricing logic for scalability

📦 Order Management

Users can place orders after configuration

Orders store final price and configuration

Supports future extension (order status, history)

🌐 Full-Stack & Deployed

Next.js App Router for frontend & backend

Prisma ORM with PostgreSQL

Deployed on Vercel

🧱 Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

Backend

Next.js API Routes

Prisma ORM

JWT Authentication

Database

PostgreSQL (Production)

SQLite (Local development)

Deployment

Vercel

🏗️ System Design Highlights

No hardcoded business logic

Pricing and validation handled entirely in the backend

Secure authentication using HttpOnly cookies

Clean relational database schema

Clear separation between UI, APIs, and business logic

🔄 Application Flow

User logs in using email

Products are fetched dynamically from the database

User selects configuration options

Backend calculates final price

User places an order

Order is stored with configuration and pricing details

🔗 Live Demo & Repository

Live Application: https://thob-studios-project.vercel.app/

GitHub Repository: https://github.com/tani066/thob-studios-project