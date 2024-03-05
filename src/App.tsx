import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import HostRoom from "./pages/HostRoom";
import JoinRoom from "./pages/JoinRoom";
import Account from "./pages/Account";
import Login from "./pages/Login";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import "./stylesheet.scss";
import RoomHost from "./pages/RoomHost";
import RoomUser from "./pages/RoomUser";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <NavigationBar/>
        <div id="pages">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="host" element={<HostRoom/>}/>
          <Route 
              path="host/:code"
              element={<RoomHost/>}
          />
          <Route path="join" element={<JoinRoom/>}/>
          <Route 
              path="join/:code"
              element={<RoomUser/>}
          />
          <Route path="account" element={<Account/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="logout"/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
