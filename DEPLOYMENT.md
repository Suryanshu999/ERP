# Deployment Guide for Render

This guide walks you through deploying the ERP application on Render.

## Prerequisites

- GitHub account with the ERP repository
- Render account (free tier available at https://render.com)
- MongoDB Atlas account (optional, for persistent database)

## Quick Deploy

### Option 1: Using render.yaml (Recommended)

1. **Prepare the repository:**
   - Ensure all changes are committed and pushed to GitHub
   - The repository already contains `render.yaml` with service definitions

2. **Deploy on Render:**
   - Go to https://dashboard.render.com
   - Click **New +** → **Blueprint**
   - Connect your GitHub repository
   - Select `render.yaml` as the blueprint file
   - Review the services (backend + frontend static site)
   - Click **Create New Blueprint**
   - Add environment variables:
     - **MONGO_URI**: Your MongoDB connection string (optional)
     - **JWT_SECRET**: A secure secret for JWT tokens
     - **DEFAULT_ADMIN_PWD**: Default admin password

3. **Monitor deployment:**
   - Render will automatically build and deploy both services
   - Backend will be available at `https://erp-backend.onrender.com`
   - Frontend will be available at the provided render domain

### Option 2: Manual Deployment (Without Blueprint)

#### Backend Service

1. Go to https://dashboard.render.com → **New +** → **Web Service**
2. Connect your GitHub repository
3. Enter these details:
   - **Name**: `erp-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or paid if needed)
4. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render assigns port automatically)
   - `MONGO_URI`: Your MongoDB URI
   - `JWT_SECRET`: Your JWT secret
   - `DEFAULT_ADMIN_PWD`: Admin password
5. Click **Create Web Service**

#### Frontend Service

1. Go to https://dashboard.render.com → **New +** → **Static Site**
2. Connect your GitHub repository
3. Enter these details:
   - **Name**: `erp-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add environment variable:
   - `VITE_API_URL`: `https://erp-backend.onrender.com/api` (replace with your backend URL)
5. Click **Create Static Site**

## Environment Variables

### Backend (.env)

```bash
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/erp
JWT_SECRET=your-secret-key
DEFAULT_ADMIN_PWD=admin123
```

### Frontend (.env.local)

```bash
VITE_API_URL=https://erp-backend.onrender.com/api
```

## Setting Up MongoDB (Optional)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add it to the `MONGO_URI` environment variable in Render

## Post-Deployment Steps

1. **Verify services are running:**
   - Backend: Visit `https://erp-backend.onrender.com/` (should show service running message)
   - Frontend: Visit the frontend URL (should load the ERP application)

2. **Test API connectivity:**
   - Check browser console for any CORS or connection errors
   - Frontend should be able to communicate with backend

3. **Set up admin credentials:**
   - Default admin email: `admin@nca.com`
   - Default admin password: Value from `DEFAULT_ADMIN_PWD` env var
   - Change credentials after first login

## Troubleshooting

- **Backend not starting**: Check logs in Render dashboard → Service → Logs
- **Frontend blank page**: Verify `VITE_API_URL` is correct and backend is running
- **Database connection errors**: Verify `MONGO_URI` is correct and IP whitelist includes Render IPs
- **CORS errors**: Ensure backend CORS is configured to allow frontend domain

## Updating Deployment

1. Make changes locally
2. Commit and push to GitHub
3. Render will automatically redeploy (if auto-deploy is enabled)

To manually redeploy:
- Go to Render dashboard → Service → Manual Deploy → Deploy Latest Commit

## Cost Notes

- **Free tier includes:**
  - Limited web service hours (300 hours/month)
  - Free static sites with unlimited hours
  - Shared resources
- **For production:** Consider upgrading to paid plans for better performance and reliability
