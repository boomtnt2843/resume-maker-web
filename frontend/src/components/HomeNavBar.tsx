import '../css/homeCustom.css';
import logo from '../image/LogoSaynum.png'

function HomeNavBar() {
    return (
        <div className="Home-Navbar-container">
            <div className="Logo-Home">
              <img src={require('../image/LogoSaynum.png')} className="App-logo" alt="logo" />
              <a href="#home">SAYNUM</a>
            </div>
            <div className='Sign-btn' id='signBox'>
              <a href="/signup" className='Signup'>SIGN UP</a>
              <button className="Signin-link-btn"><a href="#signin">SIGN IN</a></button>
            </div>
        </div>
    );
  }
  
export default HomeNavBar;