# ⚡ CTD-RC – Real-Time Online Judge Platform (Frontend)

🧑‍💻 CTD-RC (Code • Test • Debug – Real-time Collaboration)
A modern desktop-first online judge platform that brings coding, collaboration, and competition together — built with React.js and Tailwind CSS.

<p align="center"> <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" /> <img src="https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge" /> <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" /> </p>

## 🚀 Overview

CTD-RC is a real-time competitive coding frontend built for desktop users, providing:

📡 Server-sent events for live execution results

💻 Optimized editor layout using Tailwind CSS

⚙️ Real-time code execution support

🪟 Secure environment via window event control (disable reloads, shortcuts, right-click)

🏆 Contest-ready interface with instant verdicts and updates

🎯 Designed for coding competitions, classrooms, and real-time problem-solving sessions.

## ✨ Features at a Glance
Feature	Description

⚡ Live Collaboration	Real-time sockets connect participants instantly

💻 Desktop-First Design	Optimized for large screens & productivity

🧠 Code Execution Integration	Seamless link to backend compilers (Judge0 / Node sandbox)

🪟 Window Event Protection	Prevents refresh, right-click, or tab switch during contests

📊 Dynamic Problem Display	Instantly shows problem details, inputs, and verdicts

🧩 Lightweight Build	Fast load times and scalable UI architecture

## 🧠 Tech Stack

Frontend
⚛️ React.js

Styling
🎨 Tailwind CSS

Real-Time
📡 Server-sent events

Language
🟨 JavaScript (ES6)

Utility
🪟 Window Event API



# ⚙️ Getting Started
## Clone the repository
git clone https://github.com/Harshal-belgamwar/CTD-RC-Frontend-2025

## Navigate into the project folder
cd CTD-RC-Frontend-2025

## Install dependencies
npm install

## Start the development server
npm run dev

## Run with Docker
docker build -t ctd-rc-frontend .
docker run --rm -p 8080:80 ctd-rc-frontend

Open http://localhost:8080. The container proxies `/api` and submission SSE requests to the backend at `http://host.docker.internal:3000`.

video: https://youtu.be/CtzCkZDIG1s


## 👨‍💻 Author

**Harshal Belgamwar**  

📧 **Email:** [harshalbelgamwar@gmail.com](mailto:harshalbelgamwar@gmail.com)  

💼 **LinkedIn:** [Harshal Belgamwar](https://www.linkedin.com/in/harshal-belgamwar/)
