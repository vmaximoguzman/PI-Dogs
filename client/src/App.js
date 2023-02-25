import { Route } from "react-router-dom";
import axios from "axios";
//Rutas
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
