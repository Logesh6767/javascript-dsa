/**
 * DAY 26: Data Fetching Strategies & Optimization
 * 
 * Topics:
 * - Choosing the right data fetching method
 * - Client-side data fetching
 * - SWR and React Query
 * - Combining SSR/SSG with client-side
 * - Image optimization
 * - Font optimization
 * - Code splitting
 */

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

// ============================================
// 1. DATA FETCHING DECISION TREE
// ============================================

/**
 * WHEN TO USE EACH METHOD:
 * 
 * Static Site Generation (SSG):
 * - Marketing pages
 * - Blog posts
 * - Documentation
 * - E-commerce product listings
 * USE: getStaticProps + getStaticPaths
 * 
 * Server-Side Rendering (SSR):
 * - Personalized dashboards
 * - Real-time data displays
 * - User-specific content
 * USE: getServerSideProps
 * 
 * Client-Side Rendering (CSR):
 * - Interactive widgets
 * - User actions/updates
 * - Data that changes frequently
 * USE: useEffect + fetch or SWR/React Query
 * 
 * Incremental Static Regeneration (ISR):
 * - Content that updates periodically
 * - Large number of pages
 * - News sites, blogs
 * USE: getStaticProps with revalidate
 */

// ============================================
// 2. CLIENT-SIDE DATA FETCHING
// ============================================

// Basic client-side fetch with useEffect
export function ClientSideFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{/* Render data */}</div>;
}

// ============================================
// 3. SWR (stale-while-revalidate)
// ============================================

// Install: npm install swr

const fetcher = (url) => fetch(url).then((res) => res.json());

// Basic SWR usage
export function UserProfile({ userId }) {
  const { data, error, isLoading } = useSWR(
    `https://api.example.com/users/${userId}`,
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}

// SWR with automatic revalidation
export function LiveData() {
  const { data } = useSWR(
    'https://api.example.com/live-data',
    fetcher,
    {
      refreshInterval: 1000, // Refresh every second
      revalidateOnFocus: true, // Revalidate when window is focused
      revalidateOnReconnect: true, // Revalidate when connection is restored
    }
  );

  return <div>Count: {data?.count}</div>;
}

// SWR with mutations
export function TodoList() {
  const { data: todos, mutate } = useSWR('/api/todos', fetcher);

  const addTodo = async (title) => {
    // Optimistic update
    mutate([...todos, { title, completed: false }], false);

    // Send to server
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    // Revalidate
    mutate();
  };

  return (
    <div>
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <button onClick={() => addTodo('New Todo')}>Add</button>
    </div>
  );
}

// ============================================
// 4. COMBINING SSR/SSG WITH CLIENT-SIDE
// ============================================

// SSR for initial data + client-side for updates
export default function Dashboard({ initialPosts }) {
  // Use SWR with initial data from SSR
  const { data: posts } = useSWR('/api/posts', fetcher, {
    fallbackData: initialPosts,
    refreshInterval: 5000,
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/posts');
  const initialPosts = await res.json();

  return {
    props: {
      initialPosts,
    },
  };
}

// SSG for static content + client-side for dynamic
export default function ProductPage({ product }) {
  // Product info from SSG
  // Inventory from client-side (real-time)
  const { data: inventory } = useSWR(`/api/inventory/${product.id}`, fetcher, {
    refreshInterval: 3000,
  });

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      
      {inventory && (
        <p>
          {inventory.inStock ? `${inventory.quantity} in stock` : 'Out of stock'}
        </p>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: { product },
    revalidate: 3600, // ISR: revalidate every hour
  };
}

export async function getStaticPaths() {
  // Pre-render top 100 products
  const res = await fetch('https://api.example.com/products?limit=100');
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

// ============================================
// 5. IMAGE OPTIMIZATION
// ============================================

// Using Next.js Image component
export function OptimizedImages() {
  return (
    <div>
      {/* Local image */}
      <Image
        src="/images/hero.jpg"
        alt="Hero"
        width={800}
        height={600}
        priority // Load immediately
      />

      {/* Remote image */}
      <Image
        src="https://example.com/image.jpg"
        alt="Remote"
        width={400}
        height={300}
        loading="lazy" // Lazy load
      />

      {/* Fill container */}
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/images/banner.jpg"
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Responsive images */}
      <Image
        src="/images/product.jpg"
        alt="Product"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Placeholder blur */}
      <Image
        src="/images/photo.jpg"
        alt="Photo"
        width={600}
        height={400}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
    </div>
  );
}

// Configure image optimization in next.config.js
/**
 * module.exports = {
 *   images: {
 *     domains: ['example.com', 'cdn.example.com'],
 *     deviceSizes: [640, 750, 828, 1080, 1200],
 *     imageSizes: [16, 32, 48, 64, 96],
 *     formats: ['image/webp'],
 *   },
 * };
 */

// ============================================
// 6. FONT OPTIMIZATION
// ============================================

// Using @next/font (Next.js 13+)
import { Inter, Roboto_Mono } from 'next/font/google';

// Load Google Font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function FontExample() {
  return (
    <main className={`${inter.variable} ${robotoMono.variable}`}>
      <h1 className="font-sans">Sans Serif (Inter)</h1>
      <code className="font-mono">Monospace (Roboto Mono)</code>
    </main>
  );
}

// Local custom font
import localFont from 'next/font/local';

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
  variable: '--font-custom',
});

// ============================================
// 7. CODE SPLITTING
// ============================================

// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

// Load component only when needed
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading component...</p>,
  ssr: false, // Disable SSR for this component
});

export function CodeSplittingExample() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Load Heavy Component</button>
      {show && <HeavyComponent />}
    </div>
  );
}

// Load library only when needed
export function MapExample() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Load Leaflet only on client-side
    import('leaflet').then((L) => {
      const mapInstance = L.map('map').setView([51.505, -0.09], 13);
      setMap(mapInstance);
    });
  }, []);

  return <div id="map" style={{ height: '400px' }} />;
}

// ============================================
// 8. PREFETCHING
// ============================================

// Link prefetching (automatic)
export function Navigation() {
  return (
    <nav>
      {/* Prefetch on hover (default) */}
      <Link href="/about">About</Link>
      
      {/* Disable prefetch */}
      <Link href="/heavy-page" prefetch={false}>
        Heavy Page
      </Link>
      
      {/* Programmatic prefetch */}
      <PrefetchButton />
    </nav>
  );
}

function PrefetchButton() {
  const router = useRouter();

  const handleMouseEnter = () => {
    router.prefetch('/dashboard');
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={() => router.push('/dashboard')}
    >
      Go to Dashboard
    </button>
  );
}

// ============================================
// 9. PERFORMANCE MONITORING
// ============================================

// pages/_app.js - Add performance monitoring
export function reportWebVitals(metric) {
  console.log(metric);

  // Send to analytics
  switch (metric.name) {
    case 'FCP': // First Contentful Paint
      // Log to analytics
      break;
    case 'LCP': // Largest Contentful Paint
      // Log to analytics
      break;
    case 'CLS': // Cumulative Layout Shift
      // Log to analytics
      break;
    case 'FID': // First Input Delay
      // Log to analytics
      break;
    case 'TTFB': // Time to First Byte
      // Log to analytics
      break;
    default:
      break;
  }
}

// ============================================
// 10. BUNDLE ANALYSIS
// ============================================

/**
 * Analyze bundle size:
 * 
 * 1. Install: npm install @next/bundle-analyzer
 * 
 * 2. Update next.config.js:
 * 
 * const withBundleAnalyzer = require('@next/bundle-analyzer')({
 *   enabled: process.env.ANALYZE === 'true',
 * });
 * 
 * module.exports = withBundleAnalyzer({
 *   // your config
 * });
 * 
 * 3. Run: ANALYZE=true npm run build
 */

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Build an Optimized Blog
 * - Use SSG for blog posts
 * - Add ISR with 1-hour revalidation
 * - Optimize images with Next/Image
 * - Implement view count with SWR
 * - Add related posts with client-side fetch
 */

/**
 * TODO 2: Create a Real-time Dashboard
 * - Use SSR for initial data
 * - Add SWR for real-time updates
 * - Optimize chart library loading
 * - Implement auto-refresh
 * - Add performance monitoring
 */

/**
 * TODO 3: Build an E-commerce Product Page
 * - SSG for product details
 * - Client-side for inventory
 * - Optimize product images
 * - Lazy load reviews section
 * - Prefetch related products
 */

/**
 * TODO 4: Implement Image Gallery
 * - Use Next/Image for thumbnails
 * - Lazy load full-size images
 * - Add blur placeholders
 * - Optimize for mobile
 * - Implement lightbox with dynamic import
 */

/**
 * TODO 5: Create a News Aggregator
 * - Use ISR for news articles
 * - Client-side filtering/sorting
 * - Optimize font loading
 * - Code split category pages
 * - Add infinite scroll with SWR
 */

export {
  ClientSideFetch,
  UserProfile,
  LiveData,
  TodoList,
  Dashboard,
  ProductPage,
  OptimizedImages,
  FontExample,
  CodeSplittingExample,
  MapExample,
  Navigation,
};
