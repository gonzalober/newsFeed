import "./App.css";
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <div id="app">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/bookmarks">
          <Bookmarks />
        </Route>
      </Router>
    </div>
  );
};
export default App;
