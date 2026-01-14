

export default function robots() {
  const baseUrl = "https://seap.com.ng";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/" ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    //host: baseUrl,
  };
}
