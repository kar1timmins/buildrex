/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.buildrex.ie',
  generateRobotsTxt: true,
  exclude: ['/thankYou'],
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/about': 0.8,
      '/contact': 0.8,
      '/socialHousing': 0.8,
      '/emergencyHousing': 0.8,
      '/commercialResidential': 0.8,
      '/projects': 0.8,
      '/socialHousingRL': 0.6,
    };
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorities[path] ?? 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
  