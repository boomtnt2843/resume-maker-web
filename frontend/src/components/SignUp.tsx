import '../css/signUpCustom.css';
import { useState } from 'react';
import { userInterface } from '../models/IUser';

function Signup() {

    const [user, setUser] = useState<Partial<userInterface>>({});
    const [re_password, setRe_password] = useState('');

    const signUp = () =>{
        const errorTxt = document.getElementById('errorInput') as HTMLParagraphElement;
        const apiUrl = "http://localhost:4200/user/signup";
        user.username=user.username?.trim()
        user.password=user.password?.trim()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }
        if(user.username === "" && user.username === undefined){
            errorTxt.className = 'errorInput show-error';
            errorTxt.innerText = 'Please Input Your Username';
            return
        }

        if(user.username === undefined? true : user.username.length < 4){
            errorTxt.className = 'errorInput show-error';
            errorTxt.innerText = 'Please Input Username more then 3 characters';
            return
        }

        if(user.password === undefined? true : user.password.length < 4){
            errorTxt.className = 'errorInput show-error';
            errorTxt.innerText = 'Please Input Password more then 3 characters';
            return
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
                    errorTxt.className = 'errorInput show-error';
                    errorTxt.innerText = 'Username Already Exists';
                }
            })
        }else{
            errorTxt.className = 'errorInput show-error';
            errorTxt.innerText = 'Password Not Matching';
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
                    <input type="text" className="signUp-input" id='username' onChange={handleInputChange} placeholder='username...' />
                    <h2>password</h2>
                    <input type="password" className="signUp-input" id='password' onChange={handleInputChange} placeholder='password...' />
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