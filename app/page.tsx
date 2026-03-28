import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Artwork from "@/components/Artwork";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ThreeScene from "@/components/ThreeScene";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.82]">
        <ThreeScene />
      </div>
      <main className="site-flow relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Artwork />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
