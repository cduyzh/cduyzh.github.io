import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
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
