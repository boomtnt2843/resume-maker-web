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
                    localStorage.setItem("Info_id", res._id);
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
                    localStorage.setItem("Info_id", res.new_info._id);
                    window.location.href='/myaccount/aboutme'
                } else {
                    console.log("else");
                    localStorage.clear()
                    window.location.href='/'
                }
            });
        
    };

    const toResume = () =>{
        window.open('http://localhost:3000/resume?user='+myId)
    }

    const toAboutMe = () =>{
        window.location.href='/myaccount/aboutme';
    }

    const copyLink = () =>{
        navigator.clipboard.writeText('http://localhost:3000/resume?user='+myId);
        const copyButton = document.getElementById("copy-button") as HTMLButtonElement;
        copyButton.className = "copied"
        setTimeout(function(){copyButton.className=""},2000);
    }

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const myID = localStorage.getItem("id")
        const name = localStorage.getItem("name")
        if(name) setMyName(name);
        if(myID) setMyId(myID);
        if(token) setToken(token);
        else window.location.href='/';
        if(myId) {getMyInformation();}
    },[myId])

    if(!myInfo._id){
        return(
            <div>
                <div className="container-header-into">
                    <div className="text-none">
                        <h1>Hello, 👋 {myName} </h1>
                        <h2> 🔥 Let's create your Resume 🔥 </h2>
                    </div>
                    <button className="let-first-btn" onClick={createNewAcc}>Let's Go!</button>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <InfoNavBar></InfoNavBar>
            <div className="container-header-into">
                {myInfo.firstName !== undefined && myInfo.firstName !== "" ?(
                <div className="text-already">
                    <div className="text-already-zone">
                        <div className="only-txt-ready">
                            <h1>Welcome back, 👋 {myName} </h1>
                            <h3> 🔥 Let's input your information 🔥 </h3>
                        </div>
                        <button className="move-btn" onClick={toResume}>Let's Go To Resume</button>
                        <div className="copy-link">
                            <input type="text" className="link-to-resume" defaultValue={"http://localhost:3000/resume?user="+myId} disabled />
                            <button id="copy-button" onClick={copyLink}>Copy</button>
                        </div>
                    </div>
                    <div className="qrcode-zone">
                        <img id='barcode' 
                            src={"https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=http://localhost:3000/resume?user="+myId}
                            alt={"http://localhost:3000/resume?user="+myId}
                            title={"http://localhost:3000/resume?user="+myId}
                            width="100" 
                            height="100" />
                        <a id="download-button" href={'https://api.qrserver.com/v1/create-qr-code/?https://api.qrserver.com/v1/create-qr-code/?margin=0&download=1&size=170x170&data=http://localhost:3000/resume?user='+myId} >DOWNLOAD QRCODE</a>
                    </div>
                </div>):(
                <div className="text-not-ready">
                    <div className="first-txt">
                        <h1>First Step</h1>
                        <h3>Let's input some detail</h3>
                    </div>
                    <button className="go-to-about-me" onClick={toAboutMe}> Let's Start Click Me</button>
                </div>)}
            </div>
        </div>
    );
}
export default MyAccount;