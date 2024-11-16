import './App.css';
import Navbar from './Components/Navbar';
import Userlog from './Components/Users/Userlog';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserSignup from './Components/Users/UserSignup';
function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <br></br>
      <br></br>
      <br></br>
      <Switch>
          <Route exact path="/User-Login">
            <Userlog/>
          </Route>
          <Route exact path="/Driver-Login">
            <Userlog/>
          </Route>
          <Route exact path="/User-Signup">
            <UserSignup/>
          </Route>
          <Route exact path="/Driver-Login">
            <Userlog/>
          </Route>
        </Switch>
      
      </Router>
    </>
  );
}

export default App;
