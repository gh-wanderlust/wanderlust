import React from 'react';

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../store/store';

interface OurProps extends AppProps {
  store: any;
}

const MyApp = (props: OurProps) => {
  const { Component, pageProps, store } = props;
  console.log("THIS IS PAGE PROPS!!:", pageProps);
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default withRedux(initStore)(MyApp);