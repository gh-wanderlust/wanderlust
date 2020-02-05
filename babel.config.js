module.exports = {
  presets: [
    'next/babel',
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@babel/env',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-transform-runtime',
  ],
};
