import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import HostRoom from "./pages/HostRoom";
import JoinRoom from "./pages/JoinRoom";
import NavigationBar from "./components/NavigationBar";


function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="host" element={<HostRoom/>}/>
          <Route path="join" element={<JoinRoom/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
