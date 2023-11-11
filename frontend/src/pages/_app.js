import '../styles/global.scss';
import {Root} from '../arroz-con-webo';

import Header from '../components/header';

export default function App({ Component, pageProps }) {
  return (
    <Root>
      <Header />
      <Component {...pageProps} />
    </Root>
  );
}
