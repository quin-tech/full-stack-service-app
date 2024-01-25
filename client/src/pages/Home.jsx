import ServiceList from "../components/ServiceList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

const Home = () => {

  const scrollTo = () => {
    scroll.scrollTo(100);
  }
  return (
    <div className="container" onScroll={scrollTo}>
      <CategoryMenu />
      <ServiceList />
      <Cart />
    </div>
  );
};

export default Home;
