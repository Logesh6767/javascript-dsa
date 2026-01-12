/**
 * DAY 24: Static Site Generation (SSG) & getStaticProps
 * 
 * Topics:
 * - What is SSG and why use it
 * - getStaticProps function
 * - getStaticPaths for dynamic routes
 * - Incremental Static Regeneration (ISR)
 * - When to use SSG vs SSR
 * - Fallback modes
 */

// ============================================
// 1. SSG BASICS
// ============================================

/**
 * Static Site Generation (SSG):
 * - Pages are pre-rendered at build time
 * - HTML is generated once and reused for each request
 * - Fastest performance, served from CDN
 * - Good for: content that doesn't change often
 * 
 * When to use SSG:
 * ✓ Content is the same for all users
 * ✓ Content doesn't change frequently
 * ✓ SEO is important
 * ✓ Maximum performance needed
 * 
 * When NOT to use SSG:
 * ✗ Content is user-specific
 * ✗ Content changes very frequently
 * ✗ Large number of dynamic pages
 */

// ============================================
// 2. BASIC getStaticProps
// ============================================

// pages/blog.js - Static blog list
export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// This function runs at BUILD TIME
export async function getStaticProps() {
  // Fetch data from API
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Optional: Revalidate every 60 seconds (ISR)
    revalidate: 60,
  };
}

// ============================================
// 3. DYNAMIC ROUTES WITH getStaticPaths
// ============================================

// pages/blog/[slug].js - Individual blog post
export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p className="date">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Generate list of paths at build time
export async function getStaticPaths() {
  // Fetch list of posts
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  // Generate paths for each post
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // Return 404 for paths not returned by getStaticPaths
  };
}

// Fetch data for specific post at build time
export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

// ============================================
// 4. FALLBACK MODES
// ============================================

// fallback: false - Only paths from getStaticPaths are pre-rendered
// Any other path returns 404

// fallback: true - Paths not in getStaticPaths will:
// 1. Show fallback UI on first request
// 2. Generate page in background
// 3. Cache for future requests

// pages/products/[id].js with fallback: true
import { useRouter } from 'next/router';

export default function Product({ product }) {
  const router = useRouter();

  // Show loading state while page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // Only pre-render most popular products
  const res = await fetch('https://api.example.com/products?popular=true');
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: true, // Enable fallback for other products
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  
  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const product = await res.json();

  return {
    props: {
      product,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

// fallback: 'blocking' - Same as true, but:
// - Doesn't show fallback UI
// - Waits for full generation before sending HTML
// - Better for SEO (no loading state)

export async function getStaticPaths() {
  const paths = []; // Pre-render no pages at build time

  return {
    paths,
    fallback: 'blocking', // Generate pages on-demand
  };
}

// ============================================
// 5. INCREMENTAL STATIC REGENERATION (ISR)
// ============================================

// pages/news/[id].js - News article with ISR
export default function NewsArticle({ article, timestamp }) {
  return (
    <article>
      <h1>{article.title}</h1>
      <p className="meta">
        Published: {article.publishedAt} | Last updated: {timestamp}
      </p>
      <div>{article.content}</div>
    </article>
  );
}

export async function getStaticPaths() {
  // Pre-render top 10 articles
  const res = await fetch('https://api.example.com/news?limit=10');
  const articles = await res.json();

  const paths = articles.map((article) => ({
    params: { id: article.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/news/${params.id}`);
  const article = await res.json();

  return {
    props: {
      article,
      timestamp: new Date().toISOString(),
    },
    // Revalidate every 10 seconds
    // After 10 seconds, next request triggers regeneration
    // Stale content served while regenerating
    revalidate: 10,
  };
}

// ============================================
// 6. ON-DEMAND REVALIDATION
// ============================================

// pages/api/revalidate.js - API route to trigger revalidation
export default async function handler(req, res) {
  // Check for secret to confirm valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Revalidate specific path
    await res.revalidate('/blog');
    await res.revalidate(`/blog/${req.query.slug}`);
    
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}

// Trigger revalidation from webhook (e.g., when CMS content updates)
// POST /api/revalidate?secret=YOUR_SECRET&slug=my-post

// ============================================
// 7. MULTIPLE DATA SOURCES
// ============================================

// pages/portfolio.js - Fetch from multiple sources
export default function Portfolio({ projects, skills, testimonials }) {
  return (
    <div>
      <section>
        <h2>Projects</h2>
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Testimonials</h2>
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.id}>
            <p>{testimonial.text}</p>
            <cite>- {testimonial.author}</cite>
          </blockquote>
        ))}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch from multiple sources in parallel
  const [projectsRes, skillsRes, testimonialsRes] = await Promise.all([
    fetch('https://api.example.com/projects'),
    fetch('https://api.example.com/skills'),
    fetch('https://api.example.com/testimonials'),
  ]);

  const [projects, skills, testimonials] = await Promise.all([
    projectsRes.json(),
    skillsRes.json(),
    testimonialsRes.json(),
  ]);

  return {
    props: {
      projects,
      skills,
      testimonials,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

// ============================================
// 8. READING FROM FILE SYSTEM
// ============================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // Parse markdown frontmatter

// pages/docs/[slug].js - Docs from markdown files
export default function DocPage({ content, frontmatter }) {
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p className="meta">{frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}

export async function getStaticPaths() {
  const docsDirectory = path.join(process.cwd(), 'docs');
  const filenames = fs.readdirSync(docsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'docs', `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse markdown frontmatter
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML (use remark or marked)
  const htmlContent = content; // Simplified - use markdown parser in real app

  return {
    props: {
      frontmatter: data,
      content: htmlContent,
    },
  };
}

// ============================================
// 9. ERROR HANDLING IN SSG
// ============================================

// pages/authors/[id].js - Handle errors in SSG
export default function Author({ author }) {
  return (
    <div>
      <h1>{author.name}</h1>
      <p>{author.bio}</p>
      <p>Books written: {author.bookCount}</p>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch('https://api.example.com/authors');
    const authors = await res.json();

    const paths = authors.map((author) => ({
      params: { id: author.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching authors:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://api.example.com/authors/${params.id}`);

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const author = await res.json();

    return {
      props: {
        author,
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching author:', error);
    return {
      notFound: true,
    };
  }
}

// ============================================
// 10. SSG VS SSR COMPARISON
// ============================================

/**
 * COMPARISON TABLE:
 * 
 * Feature              | SSG                  | SSR
 * ---------------------|----------------------|---------------------
 * When rendered        | Build time           | Request time
 * Performance          | Fastest (CDN)        | Fast
 * Data freshness       | Stale until rebuild  | Always fresh
 * Build time           | Can be slow          | N/A
 * Server load          | None (static files)  | High
 * Use case             | Blogs, docs, landing | Dashboards, feeds
 * Personalization      | No                   | Yes
 * SEO                  | Excellent            | Excellent
 * Cost                 | Low (CDN)            | Higher (server)
 */

// ============================================
// PRACTICE EXERCISES
// ============================================

/**
 * TODO 1: Build a Static Blog
 * - Create blog posts from markdown files
 * - Generate list of all posts
 * - Create individual post pages
 * - Add tags and categories
 * - Implement related posts
 */

/**
 * TODO 2: Create a Product Catalog
 * - Use getStaticPaths to generate product pages
 * - Implement ISR with 1-hour revalidation
 * - Add fallback: 'blocking' for new products
 * - Show product recommendations
 * - Handle out-of-stock products
 */

/**
 * TODO 3: Build a Documentation Site
 * - Read docs from markdown files
 * - Generate navigation sidebar
 * - Implement search functionality
 * - Add version support
 * - Create table of contents
 */

/**
 * TODO 4: Create a Portfolio Site
 * - Fetch projects from CMS
 * - Generate project detail pages
 * - Add on-demand revalidation API route
 * - Implement ISR for frequently updated content
 * - Add sitemap generation
 */

/**
 * TODO 5: Build a Recipe Website
 * - Pre-render popular recipes at build time
 * - Use fallback for less popular recipes
 * - Implement ISR with 24-hour revalidation
 * - Add recipe categories and tags
 * - Create search with SSG
 */

export {
  Blog,
  BlogPost,
  Product,
  NewsArticle,
  Portfolio,
  DocPage,
  Author,
};
