import { BrowserRouter, Route, Switch } from "react-router-dom"
import CustomerLogin from "./Components/Login/CustomerLogin/CustomerLogin";
import Login from "./Components/Login/Login";
import TechLogin from "./Components/Login/TechLogin/TechLogin";
import Navbar from "./Components/Navbar";
import CustomerRegister from "./Components/Registration/CustomerRegistration/CustomerRegister";
import Register from "./Components/Registration/Register";
import TechRegister from "./Components/Registration/TechRegistratoin/TechRegister";

function App() {
  return (
    <div >
      <BrowserRouter>
      
      <Navbar />

      
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Login/Customer" component={CustomerLogin} />
      <Route exact path="/Login/Technician" component={TechLogin} />

      <Route exact path="/register" component={Register} />
      <Route exact path="/Register/Customer" component={CustomerRegister} />
      <Route exact path="/Register/Technician" component={TechRegister} />
      


      </BrowserRouter>
    </div>
  );
}

export default App;
