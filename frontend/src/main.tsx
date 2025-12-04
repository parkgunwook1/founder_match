import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './router/AppRouter';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('root element를 찾을 수 없습니다.');
}

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  rootElement
);

