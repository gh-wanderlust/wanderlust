module.exports = {
  presets: [
    'next/babel',
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@babel/env',
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
      },
    ],
    '@babel/plugin-transform-runtime',
  ],
};
