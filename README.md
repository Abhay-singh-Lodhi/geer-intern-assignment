
# 🛍️ Geer Intern Assignment

This is a full-stack web application built for the **Geer internship assignment**, where users can view, add, and manage products with categories, images, and prices.

---

## 🚀 How to Run the Project

### 🔧 Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas)
- npm or yarn

---

### 📁 Project Structure

```
geer-intern-assignment/
├── backend/        # Express server + MongoDB
├── frontend/       # React client
└── README.md
```

---

### 📦 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with:

```
PORT=8000
MONGO_URL=your_mongo_connection_string
```

Then run:

```bash
npm start
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder with:

```
REACT_APP_API_URL=http://localhost:8000/api
```

Then run:

```bash
npm start
```

App will open at [http://localhost:3000](http://localhost:3000)

---

## 🧠 Tech Stack Used

- **Frontend**: React, Material-UI, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Styling**: MUI (with responsive design)
- **Others**: dotenv for config, CORS enabled

---

## 📝 Notes & Assumptions

- 📁 Products contain: `name`, `price`, `image`, and `category`
- 🌐 Product images are fetched from the Pixabay API using keywords
- ✅ `.env` files are excluded via `.gitignore`
- 🔐 Sensitive credentials (Mongo URI, API key) are environment-specific
- ✨ App is fully responsive and mobile-friendly
- 🔍 Product search supports category-based autocomplete

---

## 📎 Sample Pages

- `/` → Welcome Home Page  
- `/products` → Browse all products  
- `/products/:id` → Product details page  
- `/add-product` → Add a new product

---

## 🤝 Contribution

This project is part of an internship submission.  
Feel free to fork or explore for learning purposes!

---

## 📄 License

MIT
