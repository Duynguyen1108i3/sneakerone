# WebSneaker Fullstack

## Structure

- `frontend/`: static assets, storefront layout, client-side logic
- `backend/`: Express API, MongoDB models, auth, cart, orders, wishlist, admin product CRUD

## Features

- Pixel-matched storefront based on the provided design
- Search, sort, category filtering, and favorites view
- Product detail drawer with size and stock selection
- JWT authentication with register, login, and protected cart/order routes
- Server-synced wishlist for logged-in users
- Checkout with shipping address and payment method
- Admin dashboard for create, edit, and delete product inventory

## Run

1. Copy `backend/.env.example` to `backend/.env`
2. Update at least `JWT_SECRET`
3. Optional: set `MONGODB_URI` if you want to use your own MongoDB instance
4. Install dependencies:

```bash
cd backend
npm install
```

5. Start the server:

```bash
cd backend
npm start
```

6. Open:

```text
http://localhost:5000
```

## Default Admin

- Email: `admin@toxi.com`
- Password: `admin123`

Change these values in `backend/.env` using `ADMIN_EMAIL` and `ADMIN_PASSWORD` if needed.

## Notes

- If `MONGODB_URI` is empty, the server starts an in-memory MongoDB instance automatically.
- The backend seeds the initial Vans and Converse products, plus a default admin account.
- JWT token and client fallback wishlist state are stored in browser `localStorage`.
- If port `5000` is already in use on your machine, set a different `PORT` value in `backend/.env`.

## Deploy on Render

This repo now includes [render.yaml](C:\Users\Lap4all\Downloads\WebSneaker\render.yaml).

1. Push the whole project to GitHub
2. In Render, choose **New +** -> **Blueprint**
3. Connect your GitHub repo
4. Render will read `render.yaml`
5. Provide:
   - `MONGODB_URI`: your MongoDB Atlas connection string
   - `ADMIN_PASSWORD`: your admin password
6. Deploy

Important: keep the service running from the repo root. Do not set Render's Root Directory to `backend`, because this app serves the frontend from `../frontend`.
