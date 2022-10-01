import '../css/myAccountCustom.css'
import { useEffect, useState } from "react";
import { informationInterface } from '../models/IInformation';
import InfoNavBar from './InfoNavBar';

function MyAccount() {
    const [token, setToken] = useState<string>("");
    const [myId, setMyId] = useState<string>("");
    const [myName, setMyName] = useState<string>("");
    const [myInfo, setMyInfo] = useState<Partial<informationInterface>>({});

    const apiUrl = "http://localhost:4200";

    const getMyInformation = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/information/${myId}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    setMyInfo(res);
                } else {
                    console.log("else");
                }
            });
    };

    const createNewAcc = async () => {
        let data = {
            owner : myId
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : token
            },
            body: JSON.stringify(data),
        };
        fetch(`${apiUrl}/information/create`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    console.log(res);
                    window.location.href='/myaccount/aboutme'
                } else {
                    console.log("else");
                    localStorage.clear()
                    window.location.href='/'
                }
            });
        
    };

    const toAboutMe = () =>{
        window.location.href='/myaccount/aboutme'
    }

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const myID = localStorage.getItem("id")
        const name = localStorage.getItem("name")
        if(name) setMyName(name);
        if(myID) setMyId(myID);
        if(token) setToken(token);
        else window.location.href='/';
        if(myId) getMyInformation();
        console.log(myInfo);
    },[myId])

    if(!myInfo._id){
        return(
            <div>
                <div className="container-header-into">
                    <h1>Hello, 👋 {myName} </h1>
                    <h2> 🔥 Let's create your Resume 🔥 </h2>
                    <button className="move-btn" onClick={createNewAcc}>Let's Go!</button>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <InfoNavBar></InfoNavBar>
            <div className="container-header-into">
                <h1>Welcome back, 👋 {myName} </h1>
                <h2> 🔥 Let's input your information 🔥 </h2>
                <button className="move-btn" onClick={toAboutMe}>Let's Go!</button>
            </div>
        </div>
    );
}
export default MyAccount;