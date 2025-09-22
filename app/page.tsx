import Home from "@/components/sections/Homepage"
import About from "@/components/sections/AboutPage"
import Blog from "@/components/sections/BlogPage"
import Projects from "@/components/sections/ProjectPage"
import Contact from "@/components/sections/ContactPage"
import Navbar from "@/components/sections/Navbar"
import Services from "@/components/sections/ServicePage"
import Testimonials from "@/components/sections/Testimonail"
import Footer from "@/components/sections/Footer"




export default function Landing() {
  return (
    <main>
      <Navbar/>
      <Home />
      <About />
      <Blog />
      <Services/>
      <Projects />
      <Testimonials/>
      <Contact />
      <Footer/>
    </main>
  )
}
