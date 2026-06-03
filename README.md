# 🍔 Tasto — Premium AI-Powered Food Ordering & Management Platform

Tasto is a full-stack e-commerce web application featuring a smart AI assistant, seamless cart checkout (Cash-on-Delivery), a dedicated restaurant administration dashboard, and automated receipt generation.

---

## 🎥 Project Demo Video

Click on the image below to watch the full project demonstration on YouTube:

[![Tasto Project Demo](https://img.youtube.com/vi/MNKc8yCL5_M/maxresdefault.jpg)](https://youtu.be/MNKc8yCL5_M)

*(Or [click here](https://youtu.be/MNKc8yCL5_M) to watch the video directly)*

---

## 🚀 Key Features

### 1. Client App & Experience
* **Dynamic Menu & Filters:** Explore categories (Cakes, Pasta, Salads) with responsive frontend category filtering.
* **Reactive Shopping Cart:** Add items to cart and adjust quantities with real-time price totals updating instantly.
* **Cash-on-Delivery Checkout:** Secure order placement workflow that handles user information and triggers backend order logging.
* **Live Order Tracking:** Users can track their order status ("Food Processing" ➔ "Out for Delivery" ➔ "Delivered") in real-time.

### 2. "Tasto AI Chef" Assistant (Gemini AI)
* **Context-Aware Recommendations:** An integrated, elegant Glassmorphic chatbot powered by **Gemini 2.5 Flash**.
* **Live DB Querying:** The chatbot reads the actual food menu stored in MongoDB in real-time, recommending dishes matching user tastes or budgets.

### 3. Restaurant Admin Dashboard
* **Full CRUD Management:** Easily add, edit, or delete items from the menu, including image uploading.
* **Order Status Dashboard:** Monitor client orders and update their delivery state.
* **Automated PDF Invoices:** Instant generation of professional, print-ready PDF receipts for order packing and distribution.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, CSS3 (Glassmorphism & premium UI designs)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ODM
* **AI Integration:** Google Gemini AI API (`@google/genai` SDK)
* **Document Engine:** jsPDF (for automated PDF receipts)
* **State Management:** React Context API & Axios

---

## 📂 Project Structure

```text
├── admin/          # Admin Dashboard frontend (React + Vite)
├── backend/        # Node.js + Express API server, routes, and DB models
└── frontend/       # User-facing e-commerce storefront (React + Vite)
