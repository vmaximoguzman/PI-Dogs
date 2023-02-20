import "./App.css";
import { Route } from "react-router-dom";
//Rutas
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
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
