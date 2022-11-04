import '../css/homeCustom.css';
import HomeNavBar from './HomeNavBar';
import { userInterface } from '../models/IUser';
import { useEffect, useState } from 'react';

function Home() {

  const [user, setUser] = useState<Partial<userInterface>>({});

  const signIn = () =>{
    const apiUrl = "http://localhost:4200/user/signin";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
    console.log(requestOptions);
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.status) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("id", res.result.id);
          localStorage.setItem("name",res.result.username);
          window.location.href='/myaccount'
        }else{
          var a = document.getElementById("incorrect") as HTMLDivElement;
          a.style.visibility = "visible";
          const expform = document.getElementById("exp-form") as HTMLFormElement;
          expform.reset();
        }
      });
  }


  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof user;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };
  
  const toSignUp = () =>{
    window.location.href='/signup'
  }
  const toSignIn = () =>{
    window.location.href='#signin'
  }

  const submitFormSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn();
    const expform = document.getElementById("sign-in-form") as HTMLFormElement;
    expform.reset();
}
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      window.location.href='/myaccount'
    }
},[])

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
            <h1>Space Resume Format</h1>
            <p>Space style it has many planets and stars</p>
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
            <form id="sign-in-form" onSubmit={submitFormSignIn}>
              <div className="box-signin">
                <h3>Username</h3>
                <input type="text" className="signin-input" placeholder='username...' id="username" onChange={handleInputChange} />
                <h3>Password</h3>
                <input type="password" className="signin-input" placeholder='password...' id="password" onChange={handleInputChange}  />
                <div className="incorrect-input" id='incorrect'>Incorrect username or password</div>
              </div>
              <button type='submit' className="signin-btn">
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
  