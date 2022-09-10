import '../css/homeCustom.css';
import HomeNavBar from './HomeNavBar';

const toSignUp = () =>{
  window.location.href='/signup'
}

const toSignIn = () =>{
  window.location.href='#signin'
}

function Home() {
    return (
      <div>
        <HomeNavBar></HomeNavBar>
        <div className='Main-page' id='home'>
          <h1>SAYNUM</h1>
          <h2>WELCOME TO RESUME BUILDER</h2>
          <button className="Start-btn" onClick={toSignIn}>Let's Go</button>
        </div>
        <div className="Format-page1-container">
          <div className="Format1-detail">
            <h1>Format1</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorum ullam est unde impedit labore facilis quia deleniti earum in.</p>
          </div>
          <div className="Format1-For-btn">
            <button className="Example-format1-btn">Example 1</button>
          </div>
        </div>
        <div className="Format-page2-container">
          <div className="Format2-For-btn">
            <button className="Example-format2-btn">
              Example 2
            </button>
          </div>
          <div className="Format2-detail">
            <h1>Format2</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorum ullam est unde impedit labore facilis quia deleniti earum in.</p>
          </div>
        </div>
          <div className="SignIn-page-container" id='signin'>
            <h1 className='header-text'>SIGN IN...</h1>
            <form>
              <div className="box-signin">
                <h3>Username</h3>
                <input type="text" className="signin-input" placeholder='username...' />
                <h3>Password</h3>
                <input type="password" className="signin-input" placeholder='password...' />
              </div>
              <button className="signin-btn">
                SIGN IN
              </button>
            </form>
            <button className="signup-page-btn" onClick={toSignUp}>
              Do You want to get some account?
            </button>
          </div>
        <div className="foot-container" />
      </div>
      
    );
  }
  
export default Home;
  