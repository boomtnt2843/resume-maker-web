import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/SignUp';
import MyAccount from './components/MyAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup />}/>
        <Route path="/myaccount" element={<MyAccount />}/>
      </Routes>
    </Router>
  );
}

export default App;

