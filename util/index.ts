export const apiUrl = (slug: string) => {
  let base;
  if (process.env.NODE_ENV === 'development') {
    console.log('we are in development');
    base = 'http://localhost:3000';
  } else base = 'https://gh-wanderlust.now.sh';

  return base + slug;
};
