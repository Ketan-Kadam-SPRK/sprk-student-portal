// generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { meta } from "./metaConfig.js"; // adjust path if needed

const hostname = "https://student.sprktechnologies.in"; // 👈 replace with your subdomain

(async () => {
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream("./public/sitemap.xml");

  sitemap.pipe(writeStream);

  Object.values(meta).forEach((page) => {
    sitemap.write({
      url: page.url,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log("✅ Sitemap generated at public/sitemap.xml");
})();
