# 📦 Goods Receipt Note (GRN) System

A simple and clean **Goods Receipt Note (GRN) Management System** built using:

- ⚛️ React + Vite (Frontend)
- 🎨 Tailwind CSS (UI)
- 🟢 Node.js + Express (Backend)
- 🍃 MongoDB + Mongoose (Database)
- 📄 pdfMake (PDF Generation)

This system allows users to create GRNs, add multiple items dynamically, store data in MongoDB, and download a professionally formatted GRN PDF.

---

## ✨ Features

✔ Create Goods Receipt Note (GRN)  
✔ Add multiple items dynamically  
✔ Auto calculate item totals  
✔ Auto calculate grand total  
✔ Convert grand total into words  
✔ Store GRN data in MongoDB  
✔ Download last saved GRN as PDF  
✔ Clean Tailwind UI  

---

## 🧱 Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**PDF**
- pdfMake
- number-to-words

---

## 📂 Project Structure

```

project-root/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── storegrnds.js
│   ├── controllers/
│   │   └── storegrn.controller.js
│   ├── routes/
│   │   └── storegrn.routes.js
│   └── server.js
│
└── frontend/
├── src/
│   ├── components/
│   │   └── GRNForm.jsx
│   ├── App.jsx
│   └── index.css
└── vite.config.js

````

---

## 🚀 Getting Started

---

### 🔹 1️⃣ Backend Setup

```bash
cd backend
npm install
````

Create `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

---

### 🔹 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Install dependencies:

```bash
npm install pdfmake number-to-words
```

Run frontend:

```bash
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 🧮 GRN Logic

✔ Dynamic item entry
✔ Auto item total calculation
✔ Grand total calculation
✔ Grand total converted into words
✔ Data persisted in MongoDB

---

## 📄 PDF Generation

* Uses **pdfMake**
* Structured GRN layout
* Items table
* Totals & signatures
* Downloads instantly

---

## 🛠 API Endpoints

| Method | Endpoint        |
| ------ | --------------- |
| POST   | `/api/storegrn` |
| GET    | `/api/storegrn` |

---

## ✅ Example Workflow

1️⃣ Fill GRN details
2️⃣ Add items
3️⃣ Totals auto calculated
4️⃣ Save GRN → stored in DB
5️⃣ Download PDF

---

## 📸 Future Improvements (Optional)

* Item dropdown from Item Master
* GRN listing page
* Edit/Delete GRN
* Authentication
* Print preview
* Company logo in PDF

---

## 👨‍💻 Author

**Mohan S Badiger**

---

## 📜 License

This project is for educational / demo purposes.


Just tell me 👍
```
