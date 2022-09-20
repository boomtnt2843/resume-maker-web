import '../css/signUpCustom.css';
import { useState } from 'react';
import { userInterface } from '../models/IUser';

function Signup() {

    const [user, setUser] = useState<Partial<userInterface>>({});
    const [re_password, setRe_password] = useState('');

    const signUp = () =>{
        const apiUrl = "http://localhost:4200/user/signup";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }
        if(user.password===re_password){
            console.log(requestOptions);
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.message) {
                    console.log("ok");
                    window.location.href='/'
                }else{
                    console.log("error");
                }
            })
        }else{
            console.log("error");
        };
    }

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof user;
        const { value } = event.target;
        setUser({ ...user, [id]: value });
    };

    const headleInputChange_repassword = (
        event: React.ChangeEvent<{ id: string; value: any }>
    ) => {
        const {value} = event.target;
        setRe_password(value);
        console.log(re_password);
    }

    const toHome = () =>{
        window.location.href='/'
      }

    return (
        <div className="container-signup">
            <h1>SIGN UP...</h1>
            <form className="form-signup" id='signUpForm'>
                <div className="box-signup">
                    <h2>username</h2>
                    <input type="text" className="signUp-input" id='username' onChange={handleInputChange} placeholder='username...' pattern='[A-Za-z]{}' title='Hi' required/>
                    <h2>password</h2>
                    <input type="password" className="signUp-input" id='password' onChange={handleInputChange} placeholder='password...' pattern='[0-9]{}' title='Hi' required/>
                    <h2>repeat password</h2>
                    <input type="password" className="signUp-input" id='re_password' onChange={headleInputChange_repassword} placeholder='repeat password...' />
                    <p className="errorInput" id='errorInput'>Error</p>
                </div>
                <button type="button" className="enter-signup-btn" onClick={signUp}>SIGN UP</button>
            </form>
            <button className="back-home-btn" onClick={toHome}>BACK HOME</button>
        </div>
    );
  }
export default Signup;