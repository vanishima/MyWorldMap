import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyMap from "./pages/Map";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MyMap />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
