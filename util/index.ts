export const apiUrl = (slug: string) => {
  let base;
  if (process.env.NODE_ENV === 'development') {
    base = 'http://localhost:3000';
  } 
  // else base = '';

  return base + slug;
};

// 'https://wanderlust-git-deployment.gh-wanderlust.now.sh/'