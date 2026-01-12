/**
 * DAY 22: Next.js Basics & File-based Routing
 * 
 * Topics:
 * - Next.js project structure
 * - File-based routing
 * - Dynamic routes
 * - Link component
 * - useRouter hook
 * - Navigation patterns
 */

// ============================================
// 1. PROJECT STRUCTURE
// ============================================

/**
 * Next.js App Router Structure (Next.js 13+):
 * 
 * app/
 * ├── layout.js          # Root layout
 * ├── page.js            # Home page (/)
 * ├── loading.js         # Loading UI
 * ├── error.js           # Error UI
 * ├── not-found.js       # 404 page
 * ├── about/
 * │   └── page.js        # /about
 * ├── blog/
 * │   ├── page.js        # /blog
 * │   └── [slug]/
 * │       └── page.js    # /blog/[slug]
 * └── api/
 *     └── hello/
 *         └── route.js   # /api/hello
 * 
 * Pages Router Structure (Legacy):
 * 
 * pages/
 * ├── _app.js            # Custom App component
 * ├── _document.js       # Custom Document
 * ├── index.js           # Home page (/)
 * ├── about.js           # /about
 * ├── blog/
 * │   ├── index.js       # /blog
 * │   └── [slug].js      # /blog/[slug]
 * └── api/
 *     └── hello.js       # /api/hello
 */

// ============================================
// 2. PAGES ROUTER EXAMPLES
// ============================================

// pages/index.js - Home Page
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <p>This is the home page</p>
    </div>
  );
}

// pages/about.js - Static Route
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our company</p>
    </div>
  );
}

// pages/blog/index.js - Blog List Page
import Link from 'next/link';

export default function BlogIndex() {
  const posts = [
    { id: 1, slug: 'first-post', title: 'First Post' },
    { id: 2, slug: 'second-post', title: 'Second Post' },
  ];

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// pages/blog/[slug].js - Dynamic Blog Post Page
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>This is a dynamic route</p>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}

// ============================================
// 3. DYNAMIC ROUTES
// ============================================

// pages/products/[id].js - Single Dynamic Segment
export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Product {id}</h1>;
}

// pages/shop/[...slug].js - Catch-all Routes
export default function Shop() {
  const router = useRouter();
  const { slug } = router.query;
  
  // slug is an array
  // /shop/clothes/t-shirts => slug = ['clothes', 't-shirts']
  
  return (
    <div>
      <h1>Shop</h1>
      <p>Path: {slug?.join(' / ')}</p>
    </div>
  );
}

// pages/docs/[[...slug]].js - Optional Catch-all
export default function Docs() {
  const router = useRouter();
  const { slug } = router.query;

  // Matches /docs, /docs/getting-started, /docs/api/introduction
  
  return (
    <div>
      <h1>Documentation</h1>
      <p>Path: {slug ? slug.join(' / ') : 'Home'}</p>
    </div>
  );
}

// ============================================
// 4. LINK COMPONENT
// ============================================

import Link from 'next/link';

export default function NavigationExamples() {
  return (
    <div>
      {/* Basic Link */}
      <Link href="/about">About</Link>

      {/* Dynamic Link */}
      <Link href={`/blog/${postId}`}>Read Post</Link>

      {/* Link with Object */}
      <Link
        href={{
          pathname: '/blog/[slug]',
          query: { slug: 'my-post' },
        }}
      >
        My Post
      </Link>

      {/* Link with Custom Component */}
      <Link href="/about">
        <a className="custom-link">About Us</a>
      </Link>

      {/* Prefetch (default: true) */}
      <Link href="/dashboard" prefetch={false}>
        Dashboard
      </Link>

      {/* Replace instead of push */}
      <Link href="/login" replace>
        Login
      </Link>

      {/* Scroll to top (default: true) */}
      <Link href="/about" scroll={false}>
        About (No Scroll)
      </Link>
    </div>
  );
}

// ============================================
// 5. useRouter HOOK
// ============================================

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RouterExamples() {
  const router = useRouter();

  // Navigate programmatically
  const handleNavigation = () => {
    router.push('/dashboard');
  };

  const handleNavigationWithQuery = () => {
    router.push({
      pathname: '/search',
      query: { q: 'nextjs' },
    });
  };

  // Replace (doesn't add to history)
  const handleReplace = () => {
    router.replace('/home');
  };

  // Go back
  const handleBack = () => {
    router.back();
  };

  // Reload page
  const handleReload = () => {
    router.reload();
  };

  // Access router properties
  useEffect(() => {
    console.log('Current pathname:', router.pathname);
    console.log('Query params:', router.query);
    console.log('Full URL:', router.asPath);
    console.log('Is ready:', router.isReady);
  }, [router]);

  // Listen to route changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('App is changing to:', url);
    };

    const handleRouteChangeComplete = (url) => {
      console.log('Route changed to:', url);
    };

    const handleRouteChangeError = (err, url) => {
      console.error('Error changing route to:', url, err);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return (
    <div>
      <button onClick={handleNavigation}>Go to Dashboard</button>
      <button onClick={handleNavigationWithQuery}>Search</button>
      <button onClick={handleReplace}>Replace with Home</button>
      <button onClick={handleBack}>Go Back</button>
      <button onClick={handleReload}>Reload</button>
    </div>
  );
}

// ============================================
// 6. CUSTOM _app.js
// ============================================

// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Global side effects
  useEffect(() => {
    // Track page views
    const handleRouteChange = (url) => {
      // analytics.page(url)
      console.log('Page view:', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Layout */}
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </header>

      {/* Page Component */}
      <main>
        <Component {...pageProps} />
      </main>

      {/* Global Footer */}
      <footer>
        <p>© 2024 My App</p>
      </footer>
    </>
  );
}

// ============================================
// 7. CUSTOM _document.js
// ============================================

// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global meta tags */}
        <meta name="description" content="My Next.js app" />
        
        {/* Global fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Global scripts */}
        <script src="https://example.com/script.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// ============================================
// 8. CUSTOM 404 PAGE
// ============================================

// pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  );
}

// ============================================
// 9. NAVIGATION PATTERNS
// ============================================

// Active Link Component
import { useRouter } from 'next/router';
import Link from 'next/link';

function ActiveLink({ href, children }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a
        style={{
          color: isActive ? 'blue' : 'black',
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        {children}
      </a>
    </Link>
  );
}

// Breadcrumbs Component
function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(Boolean);

  return (
    <nav>
      <Link href="/">Home</Link>
      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        return (
          <span key={href}>
            {' / '}
            <Link href={href}>{segment}</Link>
          </span>
        );
      })}
    </nav>
  );
}

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Create a Multi-level Navigation
 * - Create pages: /products, /products/electronics, /products/electronics/phones
 * - Build a breadcrumb component
 * - Add active link highlighting
 * - Implement back button functionality
 */

/**
 * TODO 2: Build a Blog with Categories
 * - Create /blog route
 * - Create /blog/[category] route
 * - Create /blog/[category]/[slug] route
 * - Add navigation between posts
 * - Implement "Previous" and "Next" links
 */

/**
 * TODO 3: Create a Search Feature
 * - Create /search route
 * - Accept query parameters (?q=term)
 * - Display search term from URL
 * - Update URL when search term changes
 * - Implement search history using query params
 */

/**
 * TODO 4: Build a Dashboard with Tabs
 * - Create /dashboard route
 * - Use query params for tabs (?tab=overview)
 * - Create tabs: overview, analytics, settings
 * - Preserve tab state in URL
 * - Add deep linking support
 */

/**
 * TODO 5: Implement Protected Routes
 * - Create a wrapper component for auth
 * - Redirect to /login if not authenticated
 * - Preserve intended destination URL
 * - Redirect back after login
 */

/**
 * To practice:
 * 1. Create a new Next.js app: npx create-next-app@latest my-app
 * 2. Create the files in the pages/ directory
 * 3. Test navigation between pages
 * 4. Experiment with dynamic routes
 * 5. Practice using useRouter hook
 */

export {
  Home,
  About,
  BlogIndex,
  BlogPost,
  NavigationExamples,
  RouterExamples,
  ActiveLink,
  Breadcrumbs,
};
