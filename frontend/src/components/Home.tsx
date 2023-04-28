import "../css/homeCustom.css";
import HomeNavBar from "./HomeNavBar";
import { userInterface } from "../models/IUser";
import { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState<Partial<userInterface>>({});

  const signIn = () => {
    const apiUrl = "http://localhost:4200/user/signin";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    console.log(requestOptions);
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.status) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("id", res.result.id);
          localStorage.setItem("name", res.result.username);
          window.location.href = "/myaccount";
        } else {
          var a = document.getElementById("incorrect") as HTMLDivElement;
          a.style.visibility = "visible";
          const expform = document.getElementById(
            "exp-form"
          ) as HTMLFormElement;
          expform.reset();
        }
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof user;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const toSignUp = () => {
    window.location.href = "/signup";
  };
  const toSignIn = () => {
    window.location.href = "#signin";
  };

  const submitFormSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn();
    const expform = document.getElementById("sign-in-form") as HTMLFormElement;
    expform.reset();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/myaccount";
    }
  }, []);

  return (
    <div>
      <HomeNavBar></HomeNavBar>
      <div className="Main-page" id="home">
        <h1>SAYNUM</h1>
        <h2>WELCOME TO RESUME BUILDER</h2>
        <button className="Start-btn" onClick={toSignIn}>
          Let's Go
        </button>
      </div>
      <div className="example-1">
        <div className="header-name">
          <div className="text-name">
            <h1>Format 1</h1>
            <h1>Space</h1>
            <h2>#Space #Planet</h2>
          </div>
          <h1 className="position-job">
            <a href="/example?user=example&format=1" className="txt-example">
              More Detail
            </a>
          </h1>
          <img
            className="ima-obj-plant01"
            src={require("../image/spaces/Planet01.png")}
            alt="plant01"
          />
          <img
            className="ima-obj-plant02"
            src={require("../image/spaces/Planet02.png")}
            alt="plant02"
          />
          <img
            className="ima-obj-spaceship"
            src={require("../image/spaces/Spaceship.png")}
            alt="spaceship"
          />
          <div className="star-group">
            <img
              className="ima-obj-star"
              src={require("../image/spaces/Star.png")}
              alt="star"
            />
            <img
              className="ima-obj-star"
              src={require("../image/spaces/Star.png")}
              alt="star"
            />
            <img
              className="ima-obj-star"
              src={require("../image/spaces/Star.png")}
              alt="star"
            />
            <img
              className="ima-obj-star"
              src={require("../image/spaces/Star_falls.png")}
              alt="starFall"
            />
            <img
              className="ima-obj-star"
              src={require("../image/spaces/Star_falls.png")}
              alt="starFall"
            />
          </div>
        </div>
      </div>
      <div className="header-name-02">
        <div className="sq-name" />
        <div className="sq-name" />
        <div className="sq-name" />
        <div className="sq-name" />
        <h1>Format 2</h1>
        <h1>SHAPE</h1>
        <h2>#Shape #Black #Blue #Pink</h2>
        <a href="/example?user=example&format=2">More Detail</a>
        <div className="cir-name" />
      </div>
      <div className="header-name-03">
        <h1>Format 3 Bear</h1>
        <h1>#Brown #White #Bear</h1>
        <h2 id="home-click">
          <a href="/example?user=example&format=3" className="txt-example">
            More Detail
          </a>
        </h2>
      </div>
      <div className="SignIn-page-container" id="signin">
        <h1 className="header-text">SIGN IN...</h1>
        <form id="sign-in-form" onSubmit={submitFormSignIn}>
          <div className="box-signin">
            <h3>Username</h3>
            <input
              type="text"
              className="signin-input"
              placeholder="username..."
              id="username"
              onChange={handleInputChange}
            />
            <h3>Password</h3>
            <input
              type="password"
              className="signin-input"
              placeholder="password..."
              id="password"
              onChange={handleInputChange}
            />
            <div className="incorrect-input" id="incorrect">
              Incorrect username or password
            </div>
          </div>
          <button type="submit" className="signin-btn">
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
