
# 💬 Real-Time Chat Application

A full-stack real-time chat application built using the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.io** for bi-directional communication. The application supports user authentication, persistent chat history, and responsive design.

---

## 🚀 Features

- Real-time messaging using **Socket.io**
- User authentication with **JWT**
- Responsive UI with **React.js**
- MongoDB for chat message and user storage
- Image upload support via **Cloudinary**
- Cross-Origin Resource Sharing (CORS) handled for multi-environment access
- Deployment ready on platforms like **Vercel** and **Azure Static Web Apps**

---

## 🧠 Tech Stack

**Frontend:** React.js, Vite, Axios, TailwindCSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.io  
**Cloud Services:** Cloudinary (for image uploads)  
**Authentication:** JWT (JSON Web Tokens)  
**Deployment:** Vercel (frontend), Azure App Service or Render (backend)

---

## 📁 Project Structure

```
real-time-chat-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeds/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css, App.css
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│   └── ...
```

---

## 🔐 Backend `.env` Configuration

Create a `.env` file inside the `backend/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

---

## 🌐 Frontend `.env` Configuration

Create a `.env` file inside the `frontend/` directory:

```env
VITE_API_BASE_URL=https://your-backend-api-url.com
```

---

## 🌍 Backend CORS Configuration

In `backend/src/index.js`, configure CORS:

```js
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-url.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

---

## 🔌 Socket.io CORS Configuration

Also in `backend/src/index.js` (or your server file):

```js
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://your-frontend-url.vercel.app"
    ],
    credentials: true,
  },
});
```

---
