import React, { FC, lazy, memo, Suspense } from 'react';
import ReactDOM                            from 'react-dom';
import { Provider }                        from 'react-redux';
import { BrowserRouter }                   from 'react-router-dom';

let Root: FC<{
  store: ReturnType<typeof import('./store').configureStore>;
}> = props => {

  const App = lazy(() => import(/*webpackChunkName:"c.App"*/'./App'));

  return (
    <Provider store={props.store}>
      <Suspense fallback={null}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
};

Root = memo(Root);

export default Root;


export async function render(rootNode: HTMLElement): Promise<void> {
  const store = await import(/*webpackChunkName:"store"*/'./store').then(m => m.configureStore({}));

  ReactDOM.render(<Root store={store}/>, rootNode);
}
