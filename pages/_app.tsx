import React from 'react';

import App, { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import Navbar from '../components/navbar'
import cookies from 'next-cookies';

import initStore from '../store/store';
import Global from '../util/Global';

interface OurProps extends AppProps {
  store: any;
  token: any;
}

class MyApp extends App<OurProps> {

  static async getInitialProps({ Component, ctx }: any) {
    // we can dispatch from here too
    // ctx.store.dispatch({ type: "FOO", payload: "foo" });
    let { token } = cookies(ctx);

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps, token };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Global />
        <Navbar token={this.props.token} />
        <Head>
          <title>Wanderlust</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700,800,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    );
  }

}

export default withRedux(initStore)(MyApp);
