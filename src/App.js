import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login/Login";
import Page404 from "./Pages/Page404/Page404";
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard/add-question" element={
          <PrivateRoute requiredLevel={2} >
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<Page404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
