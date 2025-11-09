# Next.js Interview Questions

## Fundamentals

### Q1: What is Next.js?
**Answer**: A React framework for production that provides server-side rendering, static site generation, file-based routing, and API routes out of the box.

### Q2: What's the difference between Next.js and Create React App?
**Answer**:
- Next.js: SSR/SSG, file-based routing, API routes, built-in optimization
- CRA: Client-side only, requires additional setup for routing and optimization

### Q3: What is file-based routing?
**Answer**: Pages are automatically routed based on file structure in the `pages/` directory.
```
pages/
├── index.js → /
├── about.js → /about
└── blog/
    └── [id].js → /blog/:id
```

## Rendering Methods

### Q4: What is Server-Side Rendering (SSR)?
**Answer**: HTML is generated on each request at runtime. Use `getServerSideProps`.
```javascript
export async function getServerSideProps(context) {
    const data = await fetchData();
    return { props: { data } };
}
```

### Q5: What is Static Site Generation (SSG)?
**Answer**: HTML is generated at build time. Use `getStaticProps`.
```javascript
export async function getStaticProps() {
    const data = await fetchData();
    return { props: { data }, revalidate: 60 };
}
```

### Q6: What is Incremental Static Regeneration (ISR)?
**Answer**: Updates static pages after deployment without rebuilding entire site. Use `revalidate` in `getStaticProps`.

### Q7: When to use SSR vs SSG?
**Answer**:
- **SSR**: Data changes frequently, personalized content, real-time data
- **SSG**: Static content, blog posts, documentation, landing pages

### Q8: What is Client-Side Rendering (CSR) in Next.js?
**Answer**: Using useEffect to fetch data after component mounts, like traditional React.

## Data Fetching

### Q9: What is getStaticProps?
**Answer**: Runs at build time, fetches data for static generation.
```javascript
export async function getStaticProps() {
    return {
        props: {},
        revalidate: 10
    };
}
```

### Q10: What is getServerSideProps?
**Answer**: Runs on every request, fetches data server-side.
```javascript
export async function getServerSideProps(context) {
    const { params, query, req, res } = context;
    return { props: {} };
}
```

### Q11: What is getStaticPaths?
**Answer**: Defines dynamic routes to pre-render at build time.
```javascript
export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }
        ],
        fallback: false
    };
}
```

### Q12: What does fallback mean in getStaticPaths?
**Answer**:
- `false`: 404 for paths not returned
- `true`: Show fallback, generate page on-demand
- `'blocking'`: SSR page on first request, then cache

## API Routes

### Q13: What are API Routes?
**Answer**: Backend endpoints in the `pages/api/` directory.
```javascript
// pages/api/users.js
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ users: [] });
    }
}
```

### Q14: How do you handle different HTTP methods in API routes?
**Answer**:
```javascript
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            // Handle GET
            break;
        case 'POST':
            // Handle POST
            break;
        default:
            res.status(405).end();
    }
}
```

## Optimization

### Q15: What is next/image?
**Answer**: Built-in image optimization component.
```javascript
import Image from 'next/image';

<Image
    src="/photo.jpg"
    width={500}
    height={300}
    alt="Photo"
    priority
/>
```

### Q16: What is next/link?
**Answer**: Client-side navigation between pages.
```javascript
import Link from 'next/link';

<Link href="/about">
    <a>About</a>
</Link>
```

### Q17: What is Code Splitting in Next.js?
**Answer**: Automatically splits code by page. Use dynamic imports for components.
```javascript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Hello'));
```

### Q18: What is next/head?
**Answer**: Component for modifying `<head>` section.
```javascript
import Head from 'next/head';

<Head>
    <title>Page Title</title>
    <meta name="description" content="Description" />
</Head>
```

## Advanced Features

### Q19: What is Middleware in Next.js?
**Answer**: Code that runs before a request is completed. Used for auth, redirects, etc.
```javascript
// middleware.js
export function middleware(request) {
    if (!isAuthenticated) {
        return NextResponse.redirect('/login');
    }
}
```

### Q20: What is the App Directory (Next.js 13+)?
**Answer**: New routing system with layouts, loading states, and React Server Components.

### Q21: What are React Server Components?
**Answer**: Components that run only on the server, reducing client bundle size.

### Q22: What is next.config.js?
**Answer**: Configuration file for Next.js.
```javascript
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['example.com']
    },
    env: {
        API_URL: process.env.API_URL
    }
};
```

## Deployment

### Q23: How do you deploy Next.js?
**Answer**:
- Vercel (recommended)
- Netlify
- AWS/Azure/GCP
- Docker containers

### Q24: What is the difference between next build and next start?
**Answer**:
- `next build`: Creates production build
- `next start`: Runs production server

## Coding Challenges

### Challenge 1: Dynamic Blog with ISR
```javascript
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
    const post = await getPost(params.slug);
    return {
        props: { post },
        revalidate: 60 // ISR: revalidate every 60 seconds
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    return {
        paths: posts.map(post => ({
            params: { slug: post.slug }
        })),
        fallback: 'blocking'
    };
}
```

### Challenge 2: Protected API Route
```javascript
// pages/api/protected.js
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });
    
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    res.status(200).json({ data: 'Protected data' });
}
```

### Challenge 3: Custom App with Global State
```javascript
// pages/_app.js
import { useState } from 'react';
import { ThemeContext } from '../context/theme';

export default function MyApp({ Component, pageProps }) {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Component {...pageProps} />
        </ThemeContext.Provider>
    );
}
```

## Best Practices

1. **Data Fetching**
   - Use ISR for frequently updated content
   - Use SSG for static content
   - Use SSR only when necessary

2. **Performance**
   - Optimize images with next/image
   - Use dynamic imports for large components
   - Implement proper caching strategies

3. **SEO**
   - Use Head component for meta tags
   - Generate sitemaps
   - Implement structured data

4. **Project Structure**
   ```
   project/
   ├── pages/
   ├── public/
   ├── components/
   ├── lib/
   ├── styles/
   └── utils/
   ```

5. **Environment Variables**
   - Use `.env.local` for secrets
   - Prefix with `NEXT_PUBLIC_` for client-side access
