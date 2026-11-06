import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // 确保真实 DOM 节点挂载、字体与布局渲染就绪后，在双 rAF 帧后平滑淡出并卸载静态首屏 Loading
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
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
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <a className="skip-link" href="#projects">跳到作品</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
