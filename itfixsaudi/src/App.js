import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import CustomerLogin from "./Components/Login/CustomerLogin/CustomerLogin";
import Login from "./Components/Login/Login";
import TechLogin from "./Components/Login/TechLogin/TechLogin";
import Navbar from "./Components/Navbar";
import CustomerRegister from "./Components/Registration/CustomerRegistration/CustomerRegister";
import Register from "./Components/Registration/Register";
import TechRegister from "./Components/Registration/TechRegistratoin/TechRegister";
import {decodeToken, isExpired} from "react-jwt"
import Services from "./Components/Services/Services";
import AllTechnicians from "./Components/Services/AllTechnicians";

function App() {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false)
  // console.log(decodeToken(localStorage.getItem("token")))
  useEffect(() => {
    loginFucntion()
  },[])

  const loginFucntion = () =>{
    let token = localStorage.getItem("token")
    let decodeUser = decodeToken(token)
    if(decodeUser?.customer){
      setUser(decodeUser.customer)
      setIsLogin(true)
    }else if(decodeUser?.technician){
      setUser(decodeUser.technician)
      setIsLogin(true)
    }else{
      setUser({})
      setIsLogin(false)
    }
  }

  return (
    <div >
      <BrowserRouter>
      
      <Navbar loginFucntion={loginFucntion} isLogin={isLogin} user={user}/>
      <Switch >
      
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Login/Customer" render={ () => <CustomerLogin loginFucntion={loginFucntion} />} />
      <Route exact path="/Login/Technician" render={() => <TechLogin loginFucntion={loginFucntion}/> }/>

      <Route exact path="/register" component={Register} />
      <Route exact path="/Register/Customer" component={CustomerRegister} />
      <Route exact path="/Register/Technician" component={TechRegister} />

      <Route exact path="/Services" component={Services} />
      <Route exact path="/Services/Technicians" component={AllTechnicians} />
      
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
