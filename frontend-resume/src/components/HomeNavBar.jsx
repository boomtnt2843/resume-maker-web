import '../css/homeCustom.css';
import logo from '../image/LogoSaynum.png'

function HomeNavBar() {
    return (
        <div className="Home-Navbar-container">
            <div className="Logo-Home">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>SAYNUM</h1>
            </div>
            <div className='Sign-btn'>
              <a href="" className='Signup'>SIGN UP</a>
              <button className="Signin-btn">SIGN IN</button>
            </div>
        </div>
    );
  }
  
export default HomeNavBar;