
<p align="center">
  <img src="./public/Logo.png" alt="Gradora Logo" width="180" height="180" />
</p>

# Gradient Library

A beautiful gradient image library built with Next.js, featuring a modern UI and seamless user experience.

## Environment Setup

To fix the 500 Internal Server Error, you need to set up the following environment variables. Create a `.env.local` file in the root directory with:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/gradientlib

# Clerk Authentication (optional - for production)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# JWT Secret (for local development)
JWT_SECRET=your_jwt_secret_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB (local or cloud):
   - For local development: Install MongoDB and run `mongod`
   - For cloud: Use MongoDB Atlas and update MONGODB_URI

3. Set up Cloudinary (optional for image uploads):
   - Create a free account at cloudinary.com
   - Get your credentials and add them to .env.local

4. Run the development server:
   ```bash
   npm run dev
   ```

## Troubleshooting MongoDB Connection Issues

If you encounter `querySrv ETIMEOUT` errors when connecting to MongoDB Atlas:

### 1. Check Your Connection String
Make sure your MongoDB Atlas connection string is correct:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gradientlib?retryWrites=true&w=majority
```

### 2. Network Issues
- Check your internet connection
- Ensure your firewall isn't blocking MongoDB Atlas (port 27017)
- Try using a different network (mobile hotspot, VPN, etc.)

### 3. MongoDB Atlas Status
- Check if MongoDB Atlas is experiencing downtime
- Verify your cluster is running and accessible

### 4. DNS Resolution
- The error often indicates DNS resolution problems
- Try using a different DNS server (8.8.8.8 or 1.1.1.1)
- Restart your router/modem

### 5. Alternative Solutions
- Use a local MongoDB instance for development:
  ```env
  MONGODB_URI=mongodb://localhost:27017/gradientlib
  ```
- Try connecting with MongoDB Compass to test the connection string
- Check if your IP address is whitelisted in MongoDB Atlas

### 6. Connection String Format
For MongoDB Atlas, ensure your connection string includes:
- Correct username and password
- Proper cluster URL
- Database name (gradientlib)
- Query parameters for retry logic

## Authentication

The app supports both Clerk authentication and JWT tokens. For local development, JWT authentication is used by default.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
