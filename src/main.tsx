import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// 客户端 React 挂载完成后，平滑淡出并卸载静态首屏 Loading
const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  initialLoader.style.pointerEvents = 'none';
  initialLoader.style.transition = 'opacity 0.36s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.36s ease';
  initialLoader.style.opacity = '0';
  initialLoader.style.visibility = 'hidden';
  setTimeout(() => {
    initialLoader.remove();
  }, 400);
}

