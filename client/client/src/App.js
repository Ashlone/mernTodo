import "./App.css";
import Registration from "./Pages/Registration";
import LogIn from "./Pages/LogIn";
import Home from "./Pages/Home";
import PrivateRoute from "./routing/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={PrivateRoute} />
          <Route exact path="/login" component={LogIn} />
          <Route path="/register" component={Registration} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
