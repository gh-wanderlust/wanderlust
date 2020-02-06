module.exports = {
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/_app' },
      '/api/listings': { page: '/api/listings' },
      '/api/listings/[id]': { page: '/api/listings/[id]' },
    };
  },
};
