import { getAllTools, getAllCategories } from '@/lib/toolsData';
import { APP_DOMAIN } from '@/lib/constants';

const URL = `https://${APP_DOMAIN}`;

function generateSitemap() {
  const tools = getAllTools();
  const categoriesData = getAllCategories();

  const staticPages = [
    '', // Homepage
    '/tools',
    '/categories',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  staticPages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${URL}${page}</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`; // Current date as lastmod
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Tool pages
  tools.forEach(tool => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${URL}${tool.path}</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.9</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Category pages
  categoriesData.forEach(category => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${URL}${category.path}</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.7</priority>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;
  return sitemap;
}

export async function GET() {
  const sitemap = generateSitemap();
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
