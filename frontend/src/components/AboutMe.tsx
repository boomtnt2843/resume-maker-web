import { useEffect, useState } from "react";
import InfoNavBar from "./InfoNavBar";
import { informationInterface } from '../models/IInformation';
function AboutMe() {

    const [token, setToken] = useState<string>("");
    const [myId, setMyId] = useState<string>("");
    const [myInfo, setMyInfo] = useState<Partial<informationInterface>>({});

    const apiUrl = "http://localhost:4200";

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    //submit for update Information
    function submitAboutMe() {
        let data = {
            format: convertType(myInfo.format),
            firstName: myInfo.firstName,
            lastName: myInfo.lastName,
            position: myInfo.position,
            age: convertType(myInfo.age),
            birthDay: myInfo.birthDay,
            email: myInfo.email,
            tel: myInfo.tel,
            facebook: myInfo.facebook,
            linkedin: myInfo.linkedin,
            address: myInfo.address
        };
        console.log(JSON.stringify(data))
        const requestOptionsPost = {
            method: "PUT",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/information/edit/${myId}`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    console.log(res);
                } else {
                    console.log("error");
                }
            });
    }

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof myInfo;
        const { value } = event.target;
        setMyInfo({ ...myInfo, [id]: value });
    };

    //use for get Information of user
    const getMyInformation = async () => {
        console.log(`${apiUrl}/information/${myId}`);
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

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const myID = localStorage.getItem("id")
        if(myID) setMyId(myID);
        if(token) setToken(token);
        else window.location.href='/';
        if(myId) getMyInformation();
        console.log(myInfo);
    },[myId])
    return (
        <div>
            <InfoNavBar></InfoNavBar>
            <div className="container-aboutme">
            <form className='aboutme-form'
                    onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        submitAboutMe();
                    }}>    
                    <h1>About Me</h1>
                    <div className="box-input">
                        <p>First Name</p>
                        <input type="text" className="info-input" id='firstName' defaultValue={""||myInfo.firstName} onChange={handleInputChange} placeholder='your first name...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Last Name</p>
                        <input type="text" className="info-input" id='lastName' defaultValue={""||myInfo.lastName} onChange={handleInputChange} placeholder='your last name...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Position</p>
                        <input type="text" className="info-input" id='position' defaultValue={""||myInfo.position} onChange={handleInputChange} placeholder='your position...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Age</p>
                        <input type="number" className="info-input" id='age' min={0} defaultValue={null||myInfo.age} onChange={handleInputChange} placeholder='your age...' /> 
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Birth Day</p>
                        <input type="date" className="info-input" id='birthDay' defaultValue={myInfo.birthDay===undefined?"":(myInfo.birthDay).slice(0,10)} onChange={handleInputChange} />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Email</p>
                        <input type="text" className="info-input" id='email' defaultValue={"" || myInfo.email} onChange={handleInputChange} placeholder='your email...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Telephone</p>
                        <input type="text" className="info-input" id='tel' defaultValue={""||myInfo.tel} onChange={handleInputChange} placeholder='your telephone number...' />
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Facebook (not all url)</p>
                        <div className="group-link-input">
                            <small>https://www.facebook.com/</small>
                            <input type="text" className="info-input" id='facebook' defaultValue={""||myInfo.facebook} onChange={handleInputChange} placeholder='your facebook...' />
                        </div>
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Linkedin (not all url)</p>
                        <div className="group-link-input">
                            <small>https://www.linkedin.com/in/</small>
                            <input type="text" className="info-input" id='linkedin' defaultValue={""||myInfo.linkedin} onChange={handleInputChange} placeholder='your linkedin...' />
                        </div>
                        <small>something error</small>
                    </div>
                    <div className="box-input">
                        <p>Address</p>
                        <input type="text" className="info-input" id='address' defaultValue={""||myInfo.address} onChange={handleInputChange} placeholder='your adress...' />
                        <small>something error</small>
                    </div>
                    <button type="submit" className="submit-aboutme" >save</button>
                </form>
            </div>
        </div>
    );
  }
export default AboutMe;