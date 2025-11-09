/**
 * DAY 28: Week 4 Review & Full-Stack Mini Project
 * 
 * Review all Next.js concepts and build a comprehensive blog application
 * 
 * Topics Covered This Week:
 * - File-based routing and navigation
 * - Server-Side Rendering (SSR)
 * - Static Site Generation (SSG)
 * - API routes
 * - Data fetching strategies
 * - Middleware and authentication
 * - Optimization techniques
 */

// ============================================
// WEEK 4 REVIEW QUESTIONS
// ============================================

/**
 * REVIEW QUESTIONS - Answer these before starting the project
 * 
 * 1. What's the difference between SSR and SSG?
 * 2. When should you use getServerSideProps vs getStaticProps?
 * 3. What is Incremental Static Regeneration (ISR)?
 * 4. How do API routes work in Next.js?
 * 5. What is middleware and when do you use it?
 * 6. How does the Next.js Image component optimize images?
 * 7. What are the different fallback modes in getStaticPaths?
 * 8. How do you implement authentication in Next.js?
 * 9. What's the difference between client-side and server-side data fetching?
 * 10. How do you optimize bundle size in Next.js?
 */

// ============================================
// MINI PROJECT: FULL-STACK BLOG APPLICATION
// ============================================

/**
 * PROJECT REQUIREMENTS:
 * 
 * 1. PAGES & ROUTING
 *    - Home page (blog list)
 *    - Individual blog post pages
 *    - Author profile pages
 *    - About/Contact pages
 *    - Admin dashboard
 * 
 * 2. DATA FETCHING
 *    - Use SSG for blog posts (with ISR)
 *    - Use SSR for author profiles
 *    - Client-side for comments
 *    - Implement search with client-side filtering
 * 
 * 3. API ROUTES
 *    - CRUD operations for posts
 *    - Comment system
 *    - Like/reaction system
 *    - Search endpoint
 * 
 * 4. AUTHENTICATION
 *    - User login/register
 *    - Protected admin routes
 *    - JWT-based authentication
 *    - Middleware for route protection
 * 
 * 5. FEATURES
 *    - Rich text editor for posts
 *    - Image uploads (optimized with Next/Image)
 *    - Tags and categories
 *    - Reading time calculation
 *    - View counter
 *    - Related posts
 * 
 * 6. OPTIMIZATION
 *    - Image optimization
 *    - Code splitting
 *    - Font optimization
 *    - Lazy loading
 * 
 * BONUS FEATURES:
 * - Dark mode
 * - RSS feed
 * - SEO optimization
 * - Social sharing
 * - Newsletter subscription
 * - Analytics
 */

// ============================================
// PROJECT STRUCTURE
// ============================================

/**
 * blog-app/
 * ├── pages/
 * │   ├── index.js                    # Home - blog list (SSG with ISR)
 * │   ├── blog/
 * │   │   ├── [slug].js               # Blog post page (SSG)
 * │   │   └── category/[name].js      # Category page (SSG)
 * │   ├── author/[id].js              # Author profile (SSR)
 * │   ├── about.js                    # About page (Static)
 * │   ├── contact.js                  # Contact page (Static)
 * │   ├── search.js                   # Search page (SSR)
 * │   ├── admin/
 * │   │   ├── index.js                # Admin dashboard
 * │   │   ├── posts/
 * │   │   │   ├── index.js            # Posts list
 * │   │   │   ├── new.js              # Create post
 * │   │   │   └── [id]/edit.js        # Edit post
 * │   │   └── login.js                # Admin login
 * │   ├── api/
 * │   │   ├── posts/
 * │   │   │   ├── index.js            # List/create posts
 * │   │   │   ├── [id].js             # Get/update/delete post
 * │   │   │   └── [id]/comments.js    # Post comments
 * │   │   ├── auth/
 * │   │   │   ├── login.js            # Login
 * │   │   │   ├── register.js         # Register
 * │   │   │   └── me.js               # Get current user
 * │   │   ├── upload.js               # Image upload
 * │   │   └── search.js               # Search
 * │   ├── _app.js                     # Custom App
 * │   └── _document.js                # Custom Document
 * ├── components/
 * │   ├── Layout.js
 * │   ├── PostCard.js
 * │   ├── CommentList.js
 * │   ├── RichTextEditor.js
 * │   └── SEO.js
 * ├── lib/
 * │   ├── db.js                       # Database connection
 * │   ├── auth.js                     # Auth utilities
 * │   └── api.js                      # API helpers
 * ├── middleware.js                   # Route protection
 * └── next.config.js
 */

// ============================================
// IMPLEMENTATION GUIDE (Fill in the TODOs)
// ============================================

// ===== 1. HOME PAGE (SSG with ISR) =====

// pages/index.js
import Link from 'next/link';
import Image from 'next/image';

export default function Home({ posts, categories }) {
  return (
    <div>
      <h1>Blog</h1>
      
      {/* Categories */}
      <div>
        {categories.map((category) => (
          <Link key={category.id} href={`/blog/category/${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </div>

      {/* Posts */}
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                width={600}
                height={400}
              />
            )}
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
            <span>{post.readingTime} min read</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // TODO: Fetch posts from database or CMS
  // TODO: Fetch categories
  // TODO: Sort posts by date
  
  const posts = []; // Replace with actual data
  const categories = []; // Replace with actual data

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
}

// ===== 2. BLOG POST PAGE (SSG) =====

// pages/blog/[slug].js
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function BlogPost({ post }) {
  const [views, setViews] = useState(post.views);

  // Fetch comments client-side
  const { data: comments } = useSWR(`/api/posts/${post.id}/comments`, fetcher);

  useEffect(() => {
    // Increment view count
    fetch(`/api/posts/${post.id}/view`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, [post.id]);

  return (
    <article>
      <h1>{post.title}</h1>
      <div>
        <span>By {post.author.name}</span>
        <span>{post.publishedAt}</span>
        <span>{post.readingTime} min read</span>
        <span>{views} views</span>
      </div>

      {/* Post content */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Tags */}
      <div>
        {post.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {/* Comments */}
      <div>
        <h3>Comments</h3>
        {/* TODO: Implement comment list and form */}
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  // TODO: Fetch all post slugs from database
  const posts = []; // Replace with actual data

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // Generate pages on-demand
  };
}

export async function getStaticProps({ params }) {
  // TODO: Fetch post by slug from database
  const post = {}; // Replace with actual data

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

// ===== 3. API ROUTES =====

// pages/api/posts/index.js - List/create posts
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // TODO: Fetch all posts from database
      // TODO: Support pagination (?page=1&limit=10)
      // TODO: Support filtering (?category=tech)
      break;

    case 'POST':
      // TODO: Validate authentication
      // TODO: Validate post data
      // TODO: Save post to database
      // TODO: Trigger revalidation
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/posts/[id].js - Get/update/delete post
export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      // TODO: Fetch post by ID
      break;

    case 'PUT':
      // TODO: Validate authentication
      // TODO: Update post
      // TODO: Trigger revalidation
      break;

    case 'DELETE':
      // TODO: Validate authentication
      // TODO: Delete post
      // TODO: Delete associated comments
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/posts/[id]/comments.js - Post comments
export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      // TODO: Fetch comments for post
      break;

    case 'POST':
      // TODO: Validate comment data
      // TODO: Save comment to database
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}

// ===== 4. MIDDLEWARE =====

// middleware.js - Protect admin routes
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // TODO: Verify JWT token
      const payload = verify(token, process.env.JWT_SECRET);
      
      // TODO: Check if user is admin
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

// ===== 5. ADMIN DASHBOARD =====

// pages/admin/index.js
export default function AdminDashboard({ stats }) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <div>
        <div>
          <h3>Total Posts</h3>
          <p>{stats.totalPosts}</p>
        </div>
        <div>
          <h3>Total Views</h3>
          <p>{stats.totalViews}</p>
        </div>
        <div>
          <h3>Total Comments</h3>
          <p>{stats.totalComments}</p>
        </div>
      </div>

      <Link href="/admin/posts/new">Create New Post</Link>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // TODO: Verify authentication
  // TODO: Fetch dashboard statistics
  
  const stats = {
    totalPosts: 0,
    totalViews: 0,
    totalComments: 0,
  };

  return {
    props: {
      stats,
    },
  };
}

// ===== 6. DATABASE CONNECTION =====

// lib/db.js
import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// ============================================
// SELF-ASSESSMENT CHECKLIST
// ============================================

/**
 * After completing the project, verify you've implemented:
 * 
 * ROUTING & PAGES:
 * ✓ Dynamic routes for blog posts
 * ✓ Catch-all routes for categories
 * ✓ Custom 404 page
 * ✓ Navigation with Link component
 * 
 * DATA FETCHING:
 * ✓ SSG with getStaticProps
 * ✓ SSR with getServerSideProps
 * ✓ ISR with revalidate
 * ✓ Client-side fetching with SWR
 * ✓ getStaticPaths with fallback
 * 
 * API ROUTES:
 * ✓ CRUD endpoints
 * ✓ Authentication endpoints
 * ✓ File upload endpoint
 * ✓ Error handling
 * ✓ Request validation
 * 
 * AUTHENTICATION:
 * ✓ JWT-based authentication
 * ✓ Login/register flow
 * ✓ Protected routes with middleware
 * ✓ Role-based access control
 * 
 * OPTIMIZATION:
 * ✓ Image optimization with Next/Image
 * ✓ Font optimization
 * ✓ Code splitting
 * ✓ Lazy loading
 * ✓ Caching strategies
 * 
 * BONUS:
 * ✓ SEO optimization
 * ✓ Analytics tracking
 * ✓ Error boundaries
 * ✓ Loading states
 * ✓ Responsive design
 */

// ============================================
// DEPLOYMENT CHECKLIST
// ============================================

/**
 * Before deploying to production:
 * 
 * 1. Environment variables configured
 * 2. Database connection tested
 * 3. Authentication working
 * 4. Images optimized
 * 5. Error handling implemented
 * 6. SEO meta tags added
 * 7. Analytics setup
 * 8. Performance tested (Lighthouse)
 * 9. Security headers configured
 * 10. HTTPS enabled
 * 
 * Deploy to Vercel:
 * 1. Push code to GitHub
 * 2. Import repository in Vercel
 * 3. Configure environment variables
 * 4. Deploy!
 */

export {
  Home,
  BlogPost,
  AdminDashboard,
  connectToDatabase,
};
