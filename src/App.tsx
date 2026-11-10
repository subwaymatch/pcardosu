import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Overview from "./sections/Overview";
import Rhythm from "./sections/Rhythm";
import Categories from "./sections/Categories";
import Cardholders from "./sections/Cardholders";
import Vendors from "./sections/Vendors";
import Anatomy from "./sections/Anatomy";
import Refunds from "./sections/Refunds";
import Outliers from "./sections/Outliers";
import Method from "./sections/Method";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#overview">
        Skip to analysis
      </a>
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Rhythm />
        <Categories />
        <Cardholders />
        <Vendors />
        <Anatomy />
        <Refunds />
        <Outliers />
        <Method />
      </main>
      <Footer />
    </>
  );
}
