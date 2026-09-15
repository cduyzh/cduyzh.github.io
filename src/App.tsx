import { Suspense, lazy } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VisualBreak from './components/VisualBreak';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const SpatialCanvas = lazy(() => import('./components/SpatialCanvas'));

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#fbf9f5] text-stone-900 selection:bg-[#c85a32] selection:text-white overflow-x-hidden">
        {/* Continuous Spatial 3D Canvas (Follows Scroll Progress & Cursor across all sections) */}
        <Suspense
          fallback={
            <div
              className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50 bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,90,50,0.1),transparent_70%)]"
              aria-hidden="true"
            />
          }
        >
          <SpatialCanvas />
        </Suspense>

        {/* Custom Interactive Smooth Cursor (Auto-disabled on touch & reduced-motion) */}
        <CustomCursor />

        {/* Fixed Top Navigation Bar */}
        <Navbar />

        {/* Main Content Sections:
            1. Hero (Ambient 3D Silk Glass Orb)
            2. 关于我 / About (3D Orb drifts to top right)
            3. 空间过渡 / Visual Break (3D Ring deepens in center)
            4. 最近做的一些东西 / Projects (3D Light frames the 2-col grid + cards have 3D tilt & glare)
            5. 联系方式 / Contact (3D form anchors warm dusk glow)
        */}
        <main className="relative z-10 w-full">
          <Hero />

          <About />

          <VisualBreak
            id="visual-manifesto"
            imageSrc="/assets/visual-manifesto-architecture.png"
            fallbackSrc="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop"
            imageAlt="极简空间自然采光与建筑几何摄影"
            badge="构想与实践"
            quote="“把想法落地为真正可用之物。”"
            subtext="技术不仅是代码的堆叠，更是解决具体痛点与创造细腻交互体验的媒介。"
            align="center"
          />

          <ProjectsSection />

          <ContactSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
