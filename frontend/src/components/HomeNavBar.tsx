import '../css/navbar.css';

function HomeNavBar() {
    return (
        <div className="Navbar-container">
            <div className="Logo-Home">
              <a href="/#home">SAYNUM</a>
            </div>
            <div className='Sign-btn' id='signBox'>
              <a href="/signup" className='Signup'>SIGN UP</a>
              <button className="Signin-link-btn"><a href="/#signin">SIGN IN</a></button>
            </div>
        </div>
    );
  }
  
export default HomeNavBar;