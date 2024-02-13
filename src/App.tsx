import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import HostRoom from "./pages/HostRoom";
import JoinRoom from "./pages/JoinRoom";
import Account from "./pages/Account";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import "./stylesheet.scss";


function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="host" element={<HostRoom/>}/>
          <Route path="join" element={<JoinRoom/>}/>
          <Route path="account" element={<Account/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="create-account" element={<CreateAccount/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
