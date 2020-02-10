export const apiUrl = (slug: string) => {
  let base;
  if (process.env.DEPLOY) {
    base = 'https://wanderlust-rwnchen.gh-wanderlust.now.sh';
  } else base = 'http://localhost:3000';

  return base + slug;
};
