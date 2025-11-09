/**
 * DAY 23: Server-Side Rendering (SSR) & getServerSideProps
 * 
 * Topics:
 * - What is SSR and why use it
 * - getServerSideProps function
 * - Server-side data fetching
 * - Dynamic SSR pages
 * - Error handling in SSR
 * - When to use SSR vs SSG
 */

// ============================================
// 1. SSR BASICS
// ============================================

/**
 * Server-Side Rendering (SSR):
 * - Page HTML is generated on each request
 * - Data is fetched on the server before sending HTML
 * - Good for: frequently changing data, personalized content, SEO
 * - Trade-off: Slower than SSG, more server resources
 * 
 * When to use SSR:
 * ✓ Data changes frequently
 * ✓ Content is user-specific
 * ✓ Need real-time data
 * ✓ SEO is important
 * 
 * When NOT to use SSR:
 * ✗ Static content that rarely changes
 * ✗ Data can be fetched client-side
 * ✗ Don't need SEO for the page
 */

// ============================================
// 2. BASIC getServerSideProps
// ============================================

// pages/users.js - Fetch users on every request
export default function Users({ users }) {
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// This function runs on the server on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  // Pass data to the page via props
  return {
    props: {
      users,
    },
  };
}

// ============================================
// 3. DYNAMIC SSR PAGES
// ============================================

// pages/users/[id].js - User profile with SSR
export default function UserProfile({ user, posts }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Website: {user.website}</p>

      <h2>Recent Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Access dynamic route parameter
  const { id } = context.params;

  // Fetch user data
  const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await userRes.json();

  // Fetch user's posts
  const postsRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  const posts = await postsRes.json();

  return {
    props: {
      user,
      posts,
    },
  };
}

// ============================================
// 4. ACCESSING REQUEST DATA
// ============================================

// pages/dashboard.js - Access request context
export default function Dashboard({ user, timestamp, userAgent }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Rendered at: {timestamp}</p>
      <p>Your browser: {userAgent}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Access request object
  const { req, res } = context;
  
  // Access query parameters
  const { query } = context;
  
  // Access route parameters (for dynamic routes)
  const { params } = context;
  
  // Access cookies
  const cookies = req.cookies;
  
  // Access headers
  const userAgent = req.headers['user-agent'];

  // Example: Check authentication
  const token = cookies.token;
  
  if (!token) {
    // Redirect to login
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Fetch user data (simulated)
  const user = { name: 'John Doe', id: 1 };

  return {
    props: {
      user,
      timestamp: new Date().toISOString(),
      userAgent,
    },
  };
}

// ============================================
// 5. ERROR HANDLING
// ============================================

// pages/posts/[id].js - Handle errors gracefully
export default function Post({ post, error }) {
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    if (!res.ok) {
      throw new Error('Post not found');
    }

    const post = await res.json();

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    // Return 404 page
    return {
      notFound: true,
    };

    // Or pass error to component
    // return {
    //   props: {
    //     error: error.message,
    //   },
    // };
  }
}

// ============================================
// 6. REDIRECTS IN SSR
// ============================================

// pages/profile.js - Redirect if not authenticated
export default function Profile({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  // Redirect to login if not authenticated
  if (!token) {
    return {
      redirect: {
        destination: '/login?redirect=/profile',
        permanent: false, // 307 temporary redirect
      },
    };
  }

  // Fetch user data
  const user = await getUserFromToken(token);

  // Redirect if user is banned
  if (user.status === 'banned') {
    return {
      redirect: {
        destination: '/banned',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
}

// ============================================
// 7. NOT FOUND PAGES
// ============================================

// pages/products/[id].js - Return 404 if not found
export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`https://api.example.com/products/${id}`);

  if (!res.ok) {
    // Return notFound to show 404 page
    return {
      notFound: true,
    };
  }

  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}

// ============================================
// 8. CACHING WITH HEADERS
// ============================================

// pages/news.js - Cache SSR page
export default function News({ articles }) {
  return (
    <div>
      <h1>Latest News</h1>
      {articles.map((article) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </article>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { res } = context;

  // Set cache headers (cache for 60 seconds)
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  );

  const response = await fetch('https://api.example.com/news');
  const articles = await response.json();

  return {
    props: {
      articles,
    },
  };
}

// ============================================
// 9. PARALLEL DATA FETCHING
// ============================================

// pages/overview.js - Fetch multiple data sources
export default function Overview({ user, stats, notifications }) {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      
      <section>
        <h2>User: {user.name}</h2>
      </section>

      <section>
        <h2>Statistics</h2>
        <p>Views: {stats.views}</p>
        <p>Clicks: {stats.clicks}</p>
      </section>

      <section>
        <h2>Notifications ({notifications.length})</h2>
        {notifications.map((notif) => (
          <p key={notif.id}>{notif.message}</p>
        ))}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  // Fetch all data in parallel
  const [userRes, statsRes, notifsRes] = await Promise.all([
    fetch(`https://api.example.com/users/${id}`),
    fetch(`https://api.example.com/stats/${id}`),
    fetch(`https://api.example.com/notifications/${id}`),
  ]);

  const [user, stats, notifications] = await Promise.all([
    userRes.json(),
    statsRes.json(),
    notifsRes.json(),
  ]);

  return {
    props: {
      user,
      stats,
      notifications,
    },
  };
}

// ============================================
// 10. REAL-WORLD PATTERNS
// ============================================

// pages/search.js - Search results with SSR
export default function SearchResults({ results, query, page, totalPages }) {
  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <p>Page {page} of {totalPages}</p>

      <div>
        {results.map((result) => (
          <article key={result.id}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
          </article>
        ))}
      </div>

      <div>
        {page > 1 && (
          <Link href={`/search?q=${query}&page=${page - 1}`}>
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/search?q=${query}&page=${page + 1}`}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, page = '1' } = context.query;

  if (!query) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `https://api.example.com/search?q=${query}&page=${page}`
  );
  const data = await res.json();

  return {
    props: {
      results: data.results,
      query,
      page: parseInt(page),
      totalPages: data.totalPages,
    },
  };
}

// ============================================
// 11. SSR VS CLIENT-SIDE RENDERING
// ============================================

// SSR Example (data available immediately)
export default function SSRExample({ posts }) {
  return (
    <div>
      <h1>Posts (SSR)</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
  };
}

// Client-Side Rendering Example (for comparison)
import { useState, useEffect } from 'react';

export default function CSRExample() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Posts (CSR)</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Build a Weather Dashboard
 * - Create /weather/[city] route with SSR
 * - Fetch weather data from API
 * - Display current weather and forecast
 * - Handle city not found errors
 * - Add caching headers (5 minutes)
 */

/**
 * TODO 2: Create a News Feed
 * - Fetch news articles with getServerSideProps
 * - Implement pagination
 * - Add category filtering via query params
 * - Cache results appropriately
 * - Handle API errors gracefully
 */

/**
 * TODO 3: Build an E-commerce Product Page
 * - Create /products/[slug] with SSR
 * - Fetch product details and reviews
 * - Show real-time inventory status
 * - Redirect if product is out of stock
 * - Return 404 if product doesn't exist
 */

/**
 * TODO 4: Implement a Protected Dashboard
 * - Check authentication in getServerSideProps
 * - Redirect to login if not authenticated
 * - Fetch user-specific data
 * - Handle different user roles
 * - Preserve intended destination URL
 */

/**
 * TODO 5: Create a Real-time Leaderboard
 * - Fetch leaderboard data on every request
 * - Display user rankings
 * - Show live scores
 * - Add filters (time period, category)
 * - Implement pagination
 */

export {
  Users,
  UserProfile,
  Dashboard,
  Post,
  Profile,
  Product,
  News,
  Overview,
  SearchResults,
  SSRExample,
  CSRExample,
};
