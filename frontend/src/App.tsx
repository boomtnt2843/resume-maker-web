import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/SignUp';
import MyAccount from './components/MyAccount';
import AboutMe from './components/AboutMe';
import Skill from './components/Skill';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup />}/>
        <Route path="/myaccount" element={<MyAccount />}/>
        <Route path="/myaccount/aboutme" element={<AboutMe />}/>
        <Route path="/myaccount/Skill" element={<Skill />}/>
      </Routes>
    </Router>
  );
}

export default App;

