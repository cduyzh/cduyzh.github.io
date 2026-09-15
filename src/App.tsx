import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VisualBreak from './components/VisualBreak';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#fbf9f5] text-stone-900 selection:bg-[#c85a32] selection:text-white">
        {/* Custom Interactive Smooth Cursor (Automatically disables on touch / reduced-motion) */}
        <CustomCursor />

        {/* Fixed Navigation Bar */}
        <Navbar />

        {/* Main Content Order:
            1. Hero
            2. 关于我 (About)
            3. 一次摄影／视觉过渡 (VisualBreak)
            4. 最近做的一些东西 (ProjectsSection)
            5. 联系方式 (ContactSection)
        */}
        <main className="relative z-10 w-full">
          {/* Section 01: Three.js Light Silk/Liquid Glass 3D Hero */}
          <Hero />

          {/* Section 02: About / 关于我 */}
          <About />

          {/* Section 03: Photography Visual Transition */}
          <VisualBreak
            id="visual-manifesto"
            imageSrc="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop"
            imageAlt="极简空间自然采光与建筑几何摄影"
            badge="构想与实践"
            quote="“把想法落地为真正可用之物。”"
            subtext="技术不仅是代码的堆叠，更是解决具体痛点与创造细腻交互体验的媒介。"
            align="center"
          />

          {/* Section 04: Projects / 最近做的一些东西 (Two-column Grid) */}
          <ProjectsSection />

          {/* Section 05: Contact / 联系方式 */}
          <ContactSection />
        </main>

        {/* Studio Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
