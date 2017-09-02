import { renderApp } from '@phenomic/preset-react-app/lib/client';

import App, { routes } from './src';

export default App;

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
