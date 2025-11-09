/**
 * DAY 25: API Routes & Backend Functions
 * 
 * Topics:
 * - Creating API routes
 * - Request/Response handling
 * - HTTP methods (GET, POST, PUT, DELETE)
 * - Middleware patterns
 * - Authentication in API routes
 * - Database connections
 * - Error handling
 */

// ============================================
// 1. BASIC API ROUTES
// ============================================

// pages/api/hello.js - Simple GET endpoint
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API!' });
}

// pages/api/time.js - Return current time
export default function handler(req, res) {
  const currentTime = new Date().toISOString();
  
  res.status(200).json({
    timestamp: currentTime,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}

// ============================================
// 2. HTTP METHODS
// ============================================

// pages/api/posts.js - Handle multiple methods
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all posts
      return handleGet(req, res);
    
    case 'POST':
      // Create new post
      return handlePost(req, res);
    
    case 'PUT':
      // Update post
      return handlePut(req, res);
    
    case 'DELETE':
      // Delete post
      return handleDelete(req, res);
    
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handleGet(req, res) {
  const posts = [
    { id: 1, title: 'First Post' },
    { id: 2, title: 'Second Post' },
  ];
  
  res.status(200).json(posts);
}

function handlePost(req, res) {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const newPost = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  
  res.status(201).json(newPost);
}

function handlePut(req, res) {
  const { id, title, content } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Post ID is required' });
  }
  
  const updatedPost = {
    id,
    title,
    content,
    updatedAt: new Date().toISOString(),
  };
  
  res.status(200).json(updatedPost);
}

function handleDelete(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Post ID is required' });
  }
  
  res.status(200).json({ message: `Post ${id} deleted successfully` });
}

// ============================================
// 3. DYNAMIC API ROUTES
// ============================================

// pages/api/users/[id].js - Get user by ID
export default function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  if (method === 'GET') {
    // Simulate database lookup
    const user = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
    };
    
    res.status(200).json(user);
  } else if (method === 'DELETE') {
    res.status(200).json({ message: `User ${id} deleted` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/posts/[...slug].js - Catch-all API route
export default function handler(req, res) {
  const { slug } = req.query;
  
  // slug is an array
  // /api/posts/2024/01/my-post => slug = ['2024', '01', 'my-post']
  
  res.status(200).json({
    path: slug,
    fullPath: slug.join('/'),
  });
}

// ============================================
// 4. REQUEST HANDLING
// ============================================

// pages/api/form.js - Handle form submission
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Access request body
  const { name, email, message } = req.body;

  // Access headers
  const userAgent = req.headers['user-agent'];
  const contentType = req.headers['content-type'];

  // Access cookies
  const token = req.cookies.token;

  // Access query parameters
  const { source } = req.query;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'email', 'message'],
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Process form (send email, save to database, etc.)
  console.log('Form submitted:', { name, email, message, source, userAgent });

  res.status(200).json({
    success: true,
    message: 'Form submitted successfully',
  });
}

// ============================================
// 5. RESPONSE HANDLING
// ============================================

// pages/api/response-examples.js
export default function handler(req, res) {
  // Set status code
  res.status(200);

  // Send JSON
  res.json({ message: 'Success' });

  // Send text
  res.send('Hello World');

  // Send HTML
  res.setHeader('Content-Type', 'text/html');
  res.send('<h1>Hello World</h1>');

  // Redirect
  res.redirect(307, '/dashboard');

  // Set headers
  res.setHeader('X-Custom-Header', 'value');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  // Set cookies
  res.setHeader('Set-Cookie', 'token=abc123; HttpOnly; Secure; SameSite=Strict');

  // Send error
  res.status(404).json({ error: 'Not found' });
}

// ============================================
// 6. MIDDLEWARE PATTERN
// ============================================

// lib/middleware/auth.js - Authentication middleware
export function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      // Verify token (use JWT library in real app)
      const user = verifyToken(token);
      
      // Attach user to request
      req.user = user;

      // Call the actual handler
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// Usage
// pages/api/protected.js
import { withAuth } from '../../lib/middleware/auth';

function handler(req, res) {
  // req.user is available here
  res.status(200).json({
    message: 'Protected data',
    user: req.user,
  });
}

export default withAuth(handler);

// lib/middleware/cors.js - CORS middleware
export function withCors(handler) {
  return async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return handler(req, res);
  };
}

// Combine multiple middlewares
function compose(...middlewares) {
  return (handler) => {
    return middlewares.reduceRight(
      (acc, middleware) => middleware(acc),
      handler
    );
  };
}

// Usage
export default compose(withAuth, withCors)(handler);

// ============================================
// 7. DATABASE INTEGRATION
// ============================================

// pages/api/todos.js - CRUD with database
import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const todos = await db.collection('todos').find({}).toArray();
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
      }
      break;

    case 'POST':
      try {
        const { title, completed = false } = req.body;
        
        if (!title) {
          return res.status(400).json({ error: 'Title is required' });
        }

        const result = await db.collection('todos').insertOne({
          title,
          completed,
          createdAt: new Date(),
        });

        res.status(201).json({
          id: result.insertedId,
          title,
          completed,
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
      }
      break;

    case 'PUT':
      try {
        const { id, title, completed } = req.body;
        
        await db.collection('todos').updateOne(
          { _id: new ObjectId(id) },
          { $set: { title, completed, updatedAt: new Date() } }
        );

        res.status(200).json({ message: 'Todo updated' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        
        await db.collection('todos').deleteOne({ _id: new ObjectId(id) });

        res.status(200).json({ message: 'Todo deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// ============================================
// 8. FILE UPLOAD
// ============================================

// pages/api/upload.js - Handle file uploads
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir: './public/uploads',
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    const file = files.file;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      await fs.unlink(file.filepath);
      return res.status(400).json({ error: 'Invalid file type' });
    }

    res.status(200).json({
      filename: file.newFilename,
      originalName: file.originalFilename,
      size: file.size,
      url: `/uploads/${file.newFilename}`,
    });
  });
}

// ============================================
// 9. EXTERNAL API PROXY
// ============================================

// pages/api/weather.js - Proxy to external API
export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();

    // Transform data before sending to client
    const weatherData = {
      city: data.name,
      temperature: Math.round(data.main.temp - 273.15), // Kelvin to Celsius
      description: data.weather[0].description,
      humidity: data.main.humidity,
    };

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

// ============================================
// 10. ERROR HANDLING
// ============================================

// lib/api-error-handler.js
export function errorHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.message,
        });
      }

      if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
          error: 'Unauthorized',
        });
      }

      if (error.name === 'NotFoundError') {
        return res.status(404).json({
          error: 'Resource not found',
        });
      }

      // Generic server error
      res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  };
}

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Build a RESTful Notes API
 * - GET /api/notes - List all notes
 * - POST /api/notes - Create note
 * - GET /api/notes/[id] - Get single note
 * - PUT /api/notes/[id] - Update note
 * - DELETE /api/notes/[id] - Delete note
 * - Add authentication middleware
 * - Connect to database
 */

/**
 * TODO 2: Create a User Authentication API
 * - POST /api/auth/register - Register user
 * - POST /api/auth/login - Login (return JWT)
 * - POST /api/auth/logout - Logout
 * - GET /api/auth/me - Get current user
 * - POST /api/auth/forgot-password - Password reset
 * - Hash passwords with bcrypt
 * - Generate and verify JWTs
 */

/**
 * TODO 3: Build a Contact Form API
 * - POST /api/contact - Submit form
 * - Validate input fields
 * - Send email using nodemailer
 * - Rate limiting (prevent spam)
 * - Store submissions in database
 */

/**
 * TODO 4: Create a Search API
 * - GET /api/search?q=term - Search content
 * - Implement pagination
 * - Add filters (category, date, etc.)
 * - Cache results with Redis
 * - Return results with metadata
 */

/**
 * TODO 5: Build a File Upload API
 * - POST /api/upload - Upload file
 * - Validate file type and size
 * - Store files in cloud (S3/Cloudinary)
 * - Generate thumbnails for images
 * - Return file URLs
 */

export default handler;
