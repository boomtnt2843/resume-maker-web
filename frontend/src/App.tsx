import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/SignUp';
import MyAccount from './components/MyAccount';
import AboutMe from './components/AboutMe';
import Skill from './components/Skill';
import Education from './components/Education';
import Activity from './components/Activity';
import Experience from './components/Experience';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup />}/>
        <Route path="/myaccount" element={<MyAccount />}/>
        <Route path="/myaccount/aboutme" element={<AboutMe />}/>
        <Route path="/myaccount/skill" element={<Skill />}/>
        <Route path="/myaccount/education" element={<Education />}/>
        <Route path="/myaccount/exp" element={<Experience />}/>
        <Route path="/myaccount/activity" element={<Activity />}/>
      </Routes>
    </Router>
  );
}

export default App;

