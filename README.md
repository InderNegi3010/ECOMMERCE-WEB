# ECOMMERCE-WEB

A full-stack, modern e-commerce web application with separate admin and user interfaces, built using the MERN stack (MongoDB, Express, React, Node.js) and modern UI frameworks.

## 🌟 Live Demo

- **Frontend:** [https://ecommerce-frontend.onrender.com](https://ecommerce-frontend.onrender.com)
- **Admin Panel:** [https://ecommerce-admin.onrender.com](https://ecommerce-admin.onrender.com)
- **Backend API:** [https://ecommerce-backend.onrender.com](https://ecommerce-backend.onrender.com)

## 🚀 Features

### User (Frontend)

- Browse latest collections and best sellers
- Product search and filtering
- Product detail pages with images, sizes, and related products
- Add to cart, update cart, and checkout flow
- User authentication (login/register)
- Place orders and view order history
- Responsive design for all devices

### Admin Panel

- Secure admin login
- Add new products with images, categories, sizes, and best-seller flag
- View, edit, and delete products
- Manage orders and view order details

### Backend

- RESTful API built with Express.js
- MongoDB for data storage (products, users, orders, cart)
- JWT-based authentication for users and admins
- Image upload and storage via Cloudinary
- Payment integration with Stripe and Razorpay
- Environment variable support with dotenv

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, React Toastify
- **Admin:** React, Vite, Tailwind CSS, React Router, Axios, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Cloudinary, Stripe, Razorpay, Multer
- **Other:** ESLint, dotenv

## 📦 Installation

### Prerequisites

- Node.js >= 18.x
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)
- Stripe and/or Razorpay account (for payments)

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/InderNegi3010/ECOMMERCE-WEB.git
   cd ECOMMERCE-WEB
   ```

2. **Install dependencies:**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install

   # Admin
   cd ../admin
   npm install
   ```

3. **Environment Variables:**

   - Copy `backend/env.example` to `backend/.env`
   - Fill in your MongoDB, Cloudinary, Stripe, and Razorpay credentials

4. **Run the applications:**

   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev

   # Frontend (Terminal 2)
   cd frontend
   npm run dev

   # Admin (Terminal 3)
   cd admin
   npm run dev
   ```

## 🚀 Deployment on Render (Free)

### Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub with the `render.yaml` configuration file.

### Step 2: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

### Step 3: Set Up Cloudinary (Free)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your cloud name, API key, and API secret

### Step 4: Set Up Payment Gateways

1. **Stripe:** Create account at [stripe.com](https://stripe.com)
2. **Razorpay:** Create account at [razorpay.com](https://razorpay.com)

### Step 5: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Add your environment variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secret string
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `RAZORPAY_KEY_ID`: Your Razorpay key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay secret key

### Step 6: Update Frontend URLs

After deployment, update the `VITE_BACKEND_URL` in both frontend and admin services to point to your deployed backend URL.

## 📁 Project Structure

```
ECOMMERCE-Web/
├── admin/          # Admin dashboard (React)
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/        # Express API and database models
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── modules/
│   ├── routes/
│   └── server.js
├── frontend/       # User-facing e-commerce site (React)
│   ├── src/
│   ├── public/
│   └── package.json
├── render.yaml     # Render deployment configuration
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=8080
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

## 📸 Screenshots

_Add screenshots of your application here_

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Inder Negi**

- GitHub: [@InderNegi3010](https://github.com/InderNegi3010)

## 🙏 Acknowledgments

- React and Vite for the frontend framework
- Express.js for the backend API
- MongoDB for the database
- Tailwind CSS for styling
- Render for free hosting
