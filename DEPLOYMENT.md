# Deployment Guide

This guide will help you deploy your Gradient Library project to production.

## Prerequisites

1. **MongoDB Atlas Account**: Set up a MongoDB Atlas cluster
2. **Cloudinary Account**: For image storage and optimization
3. **Clerk Account**: For authentication (optional)
4. **Hosting Platform**: Vercel, Netlify, or similar

## Environment Variables

Set these environment variables in your hosting platform:

### Required Variables

```bash
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/gradientlib

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Next.js Configuration
NODE_ENV=production
```

### Optional Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Base URL
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster (M0 Free tier is sufficient for small projects)
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace `your_username`, `your_password`, and `your_cluster` with your actual values
6. Add your IP address to the IP Access List (or use 0.0.0.0/0 for all IPs)

## Cloudinary Setup

1. Create a Cloudinary account at https://cloudinary.com
2. Get your cloud name, API key, and API secret from the dashboard
3. Configure image transformations as needed

## Deployment Steps

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Set environment variables in Netlify dashboard
6. Deploy

### Other Platforms

1. Build the project: `npm run build`
2. Start the production server: `npm start`
3. Set environment variables in your hosting platform
4. Deploy the built files

## Features Enabled

### 1. Manual Routing
- Configured in `next.config.ts`
- Ensures proper routing behavior in production

### 2. MongoDB Atlas Production Configuration
- Enhanced connection options for production
- SSL/TLS encryption enabled
- Increased timeouts and connection pool size
- Automatic retry mechanisms

### 3. Smooth Scrolling with Lenis
- Smooth scrolling animation throughout the app
- Optimized for performance
- Touch-friendly on mobile devices

## Troubleshooting

### Database Connection Issues

1. Check your MongoDB Atlas connection string
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify database user credentials
4. Check network connectivity

### Build Issues

1. Ensure all dependencies are installed: `npm install`
2. Check for TypeScript errors: `npm run lint`
3. Verify environment variables are set correctly

### Performance Issues

1. Enable caching in your hosting platform
2. Optimize images using Cloudinary
3. Monitor MongoDB Atlas performance
4. Check for memory leaks in the application

## Monitoring

- Set up MongoDB Atlas monitoring
- Configure error tracking (Sentry, etc.)
- Monitor application performance
- Set up uptime monitoring

## Security

- Keep environment variables secure
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use HTTPS in production
- Implement rate limiting if needed 