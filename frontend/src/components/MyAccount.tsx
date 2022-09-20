import '../css/myAccountCustom.css'
import { useEffect, useState } from "react";
import Home from "./Home";
import { informationInterface } from '../models/IInformation';

function MyAccount() {
    const [token, setToken] = useState<string>("");
    const [myId, setMyId] = useState<string>("");
    const [myName, setMyName] = useState<string>("");
    const [myInfo, setMyInfo] = useState<Partial<informationInterface>>({

    });

    const apiUrl = "http://localhost:4200";
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    const getMyInformation = async () => {
        console.log(`${apiUrl}/information/all/${myId}`);
        fetch(`${apiUrl}/information/all/${myId}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    console.log("ok2");
                    setMyInfo(res[0]);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const myID = localStorage.getItem("id")
        const name = localStorage.getItem("name")
        if(name) setMyName(name);
        if(myID) setMyId(myID);
        if(token) setToken(token);
        else window.location.href='/';
        if(myId) getMyInformation();
    },[myId])
    if(!myInfo._id){
        return(
            <div className="loading">
            </div>
        );
    }
    
    return (
        <div>
            <div className="container-header-into">
                <h1>Welcome 👋 {myName} </h1>
                <h2> 🔥 Let's input your information 🔥 </h2>
                <button className="move-btn">Let's Go!</button>
            </div>
            <div className="container-aboutme-form">
                <form className='aboutme-form'>    
                    <h1>📖MY INFORMATION</h1>
                    <h2>About Me</h2>
                    <div className="box-input">
                        <p>First Name {myInfo.firstName}</p>
                        <input type="text" className="info-input" id='firstName' defaultValue={""||myInfo.firstName} placeholder='your first name...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Last Name</p>
                        <input type="text" className="info-input" id='lastName' defaultValue={""||myInfo.lastName} placeholder='your last name...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Position</p>
                        <input type="text" className="info-input" id='position' defaultValue={""||myInfo.position} placeholder='your position...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Age</p>
                        <input type="number" className="info-input" id='age' min={0} defaultValue={null||myInfo.age} placeholder='your age...' /> 
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                            <p>Birth Day</p>
                            <input type="date" className="info-input" id='brithDay'  defaultValue={String(myInfo.birthDay).slice(0,10)} />
                            <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Email</p>
                        <input type="text" className="info-input" id='email' defaultValue={"" || myInfo.email} placeholder='your email...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Telephone</p>
                        <input type="text" className="info-input" id='tel' defaultValue={""||myInfo.tel} placeholder='your telephone number...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Facebook (not all url)</p>
                        <div className="group-link-input">
                            <small>https://www.facebook.com/</small>
                            <input type="text" className="info-input" id='facebook' defaultValue={""||myInfo.facebook} placeholder='your facebook...' />
                        </div>
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Linkedin (not all url)</p>
                        <div className="group-link-input">
                            <small>https://www.linkedin.com/in/</small>
                            <input type="text" className="info-input" id='linkedin' defaultValue={""||myInfo.linkedin} placeholder='your linkedin...' />
                        </div>
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Address</p>
                        <input type="text" className="info-input" id='address' defaultValue={""||myInfo.address} placeholder='your adress...' />
                        <small>something error</small>
                    </div>
                    <input type="submit" className="submit-aboutme" />
                </form>
            </div>
        </div>
    );
}
export default MyAccount;