import '../css/navbar.css';

function InfoNavBar() {


  const mobileMenu = () =>{
    const menu = document.getElementById('mobile-menu') as HTMLDivElement;
    const menulist = document.getElementById('menu-list') as HTMLDivElement;
    menu.classList.toggle('is-active');
    menulist.classList.toggle('is-active');
  }

  const logout = () => {
    localStorage.clear();
    window.location.href='/'
  }
    return (
        <div className="Navbar-container">
            <div className="Logo-Home">
              <a href="">SAYNUM</a>
            </div>
            <div className="navbar-toggle" onClick={mobileMenu} id="mobile-menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div className="menu-group" id="menu-list">
                <a href="/myaccount/aboutme" className="item-menu">About Me</a>
                <a href="/myaccount/skill" className="item-menu">Skill</a>
                <a href="/myaccount/education" className="item-menu">Education</a>
                <a href="/myaccount/exp" className="item-menu">Experience</a>
                <a href="/myaccount/activity" className="item-menu">Activity</a>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </div>
    );
  }
  
export default InfoNavBar;