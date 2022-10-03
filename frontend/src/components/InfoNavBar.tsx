import '../css/navbar.css';

function InfoNavBar() {
    return (
        <div className="Navbar-container">
            <div className="Logo-Home">
              <img src={require('../image/LogoSaynum.png')} className="App-logo" alt="logo" />
              <a href="">SAYNUM</a>
            </div>
            <div className="menu-group">
                <a href="/myaccount/aboutme" className="item-menu">About Me</a>
                <a href="/myaccount/skill" className="item-menu">Skill</a>
                <a href="/myaccount/education" className="item-menu">Education</a>
                <a href="/myaccount/exp" className="item-menu">Experience</a>
                <a href="/myaccount/activity" className="item-menu">Activity</a>
            </div>
        </div>
    );
  }
  
export default InfoNavBar;