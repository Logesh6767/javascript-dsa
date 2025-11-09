/**
 * DAY 27: Middleware, Authentication & Advanced Features
 * 
 * Topics:
 * - Next.js Middleware
 * - Authentication patterns
 * - Protected routes
 * - Environment variables
 * - Internationalization (i18n)
 * - Custom headers and redirects
 */

import { NextResponse } from 'next/server';

// ============================================
// 1. MIDDLEWARE BASICS
// ============================================

/**
 * Create middleware.js in root directory
 * Runs before every request
 */

// middleware.js
export function middleware(request) {
  // Access request
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  
  // Access headers
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');
  
  // Access cookies
  const token = request.cookies.get('token');
  
  console.log('Request to:', pathname);
  
  // Continue to page
  return NextResponse.next();
}

// Run middleware on specific paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

// ============================================
// 2. AUTHENTICATION MIDDLEWARE
// ============================================

// middleware.js - Protect routes
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes
  const publicPaths = ['/', '/login', '/register', '/about'];
  const isPublicPath = publicPaths.includes(pathname);

  // Redirect to login if not authenticated
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if authenticated and trying to access login
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
    '/register',
  ],
};

// ============================================
// 3. JWT VERIFICATION IN MIDDLEWARE
// ============================================

// middleware.js - Verify JWT token
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // Protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/protected')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify JWT
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Add user info to headers (accessible in API routes)
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.userId);
      requestHeaders.set('x-user-role', payload.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

// ============================================
// 4. ROLE-BASED ACCESS CONTROL
// ============================================

// middleware.js - Check user roles
export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const user = await verifyToken(token);

    // Admin-only routes
    if (pathname.startsWith('/admin') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Premium content
    if (pathname.startsWith('/premium') && !user.isPremium) {
      return NextResponse.redirect(new URL('/upgrade', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// ============================================
// 5. CUSTOM HEADERS
// ============================================

// middleware.js - Add custom headers
export function middleware(request) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // Add custom headers
  response.headers.set('X-Custom-Header', 'my-value');
  response.headers.set('X-Request-Time', Date.now().toString());

  return response;
}

// ============================================
// 6. GEOLOCATION & A/B TESTING
// ============================================

// middleware.js - Geolocation-based routing
export function middleware(request) {
  const country = request.geo?.country || 'US';
  const pathname = request.nextUrl.pathname;

  // Redirect to country-specific page
  if (pathname === '/' && !pathname.startsWith(`/${country.toLowerCase()}`)) {
    return NextResponse.redirect(
      new URL(`/${country.toLowerCase()}`, request.url)
    );
  }

  // A/B Testing
  const bucket = Math.random() < 0.5 ? 'A' : 'B';
  const response = NextResponse.next();
  response.cookies.set('ab-test', bucket);

  return response;
}

// ============================================
// 7. RATE LIMITING
// ============================================

// middleware.js - Simple rate limiting
const rateLimit = new Map();

export function middleware(request) {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100;

  // Get or create rate limit entry
  const record = rateLimit.get(ip) || { count: 0, resetTime: now + windowMs };

  // Reset if window expired
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  // Increment counter
  record.count++;
  rateLimit.set(ip, record);

  // Check limit
  if (record.count > maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', (maxRequests - record.count).toString());
  
  return response;
}

// ============================================
// 8. ENVIRONMENT VARIABLES
// ============================================

/**
 * .env.local - Local development
 * .env.development - Development
 * .env.production - Production
 * 
 * Access in code:
 * - process.env.VARIABLE_NAME
 * 
 * Public variables (exposed to browser):
 * - NEXT_PUBLIC_API_URL
 * 
 * Example .env.local:
 * 
 * DATABASE_URL=mongodb://localhost:27017/mydb
 * JWT_SECRET=your-secret-key
 * NEXT_PUBLIC_API_URL=https://api.example.com
 */

// Using environment variables
export default function Config() {
  // Server-side only
  const dbUrl = process.env.DATABASE_URL;
  const jwtSecret = process.env.JWT_SECRET;

  // Available on both server and client
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div>
      <p>API URL: {apiUrl}</p>
      {/* Don't expose secrets in client-side code! */}
    </div>
  );
}

// ============================================
// 9. INTERNATIONALIZATION (i18n)
// ============================================

// next.config.js
/**
 * module.exports = {
 *   i18n: {
 *     locales: ['en', 'es', 'fr'],
 *     defaultLocale: 'en',
 *     localeDetection: true,
 *   },
 * };
 */

// Accessing locale in components
import { useRouter } from 'next/router';

export default function I18nExample() {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  const changeLocale = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div>
      <p>Current locale: {locale}</p>
      <select value={locale} onChange={(e) => changeLocale(e.target.value)}>
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}

// Translation files structure
/**
 * locales/
 * ├── en/
 * │   └── common.json
 * ├── es/
 * │   └── common.json
 * └── fr/
 *     └── common.json
 */

// Using translations
import translations from '../locales/en/common.json';

export default function TranslatedPage() {
  const router = useRouter();
  const t = translations[router.locale] || translations.en;

  return (
    <div>
      <h1>{t.welcome}</h1>
      <p>{t.description}</p>
    </div>
  );
}

// ============================================
// 10. AUTHENTICATION PATTERNS
// ============================================

// pages/api/auth/login.js - Login endpoint
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Validate credentials (check database)
  const user = await validateUser(email, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT
  const token = sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set cookie
  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
  );

  res.status(200).json({ user: { id: user.id, email: user.email } });
}

// pages/api/auth/logout.js - Logout endpoint
export default function handler(req, res) {
  // Clear cookie
  res.setHeader(
    'Set-Cookie',
    'token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
  );

  res.status(200).json({ message: 'Logged out successfully' });
}

// pages/api/auth/me.js - Get current user
import { verify } from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.userId);

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Client-side auth context
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Protected component
export function ProtectedPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in</p>;

  return <div>Welcome, {user.email}!</div>;
}

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Implement Complete Authentication System
 * - Login/Register pages
 * - JWT-based authentication
 * - Protected routes with middleware
 * - Password hashing with bcrypt
 * - Refresh token mechanism
 */

/**
 * TODO 2: Build Role-Based Access Control
 * - User, Admin, Moderator roles
 * - Middleware to check permissions
 * - Role-specific pages
 * - API routes with role validation
 * - Admin dashboard
 */

/**
 * TODO 3: Create Multi-Language Website
 * - Support 3+ languages
 * - Translation files
 * - Language switcher
 * - Locale-specific routing
 * - SEO for different locales
 */

/**
 * TODO 4: Implement Rate Limiting
 * - IP-based rate limiting
 * - User-based rate limiting
 * - Different limits for different endpoints
 * - Rate limit headers
 * - Error handling
 */

/**
 * TODO 5: Build A/B Testing System
 * - Assign users to test groups
 * - Track conversion events
 * - Store results in database
 * - Admin dashboard to view results
 * - Middleware to route users
 */

export {
  middleware,
  Config,
  I18nExample,
  TranslatedPage,
  AuthProvider,
  useAuth,
  ProtectedPage,
};
