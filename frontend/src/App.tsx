import Footer from "./components/Footer";
import Header from "./components/Header";
import Body from "./components/Body";
import "./App.css";

/**
 * The main component that renders the app.
 */
const App = () => (
  <div className="app__container">
    <Header />
    <Body />
    <Footer />
  </div>
);

export default App;
