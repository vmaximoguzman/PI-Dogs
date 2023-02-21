import { Route } from "react-router-dom";
import axios from "axios";
//Rutas
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";

function App() {
  const onSearch = (dog) => {
    axios
      .get(`http://localhost:3001/dogs?name=${dog}`)
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/home">
        <Home onSearch={onSearch} />
      </Route>
    </div>
  );
}

export default App;
