import React from "react";

import App, { AppProps } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import initStore from "../store/store";

interface OurProps extends AppProps {
  store: any;
}

// const MyApp = (props: OurProps) => {
//   const { Component, pageProps, store } = props;
//   console.log("THIS IS PAGE PROPS!!:", pageProps);

//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// };

class MyApp extends App<OurProps> {
  static async getInitialProps({ Component, ctx }: any) {
    // we can dispatch from here too
    // ctx.store.dispatch({ type: "FOO", payload: "foo" });

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(initStore)(MyApp);
