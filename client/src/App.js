import { Route } from "react-router-dom";
//Rutas
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";

function App() {
  return (
    <div>
      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>

      <Route path="/dogs/:dogId">
        <Detail />
      </Route>

      <Route exact path="/createDog">
        <Form />
      </Route>
    </div>
  );
}

export default App;
