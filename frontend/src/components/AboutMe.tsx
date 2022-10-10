import { useEffect, useState } from "react";
import InfoNavBar from "./InfoNavBar";
import { informationInterface } from '../models/IInformation';
import '../css/AboutMe.css'

function AboutMe() {

    const [token, setToken] = useState<string>("");
    const [myId, setMyId] = useState<string>("");
    const [myInfo, setMyInfo] = useState<Partial<informationInterface>>({});
    const [hobby, setHobby] = useState<string[]>([]);
    const [itemHobby, setItemHobby] = useState<string>("");
    const [interest, setInterest] = useState<string[]>([]);
    const [itemInterest, setItemInterest] = useState<string>("");

    const apiUrl = "http://localhost:4200";

    const firstnameInput = document.getElementById('firstName') as HTMLInputElement;
    const lastnameInput = document.getElementById('lastName') as HTMLInputElement;
    const positionInput = document.getElementById('position') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const telInput = document.getElementById('tel') as HTMLInputElement;
    const facebookInput = document.getElementById('facebook') as HTMLInputElement;
    const linkedinInput = document.getElementById('linkedin') as HTMLInputElement;

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    //submit for update Information
    function submitAboutMe() {
        let data = {
            format: convertType(myInfo.format),
            firstName: myInfo.firstName?.trim(),
            lastName: myInfo.lastName?.trim(),
            position: myInfo.position?.trim(),
            age: convertType(myInfo.age),
            birthDay: myInfo.birthDay,
            email: myInfo.email?.toLowerCase(),
            tel: myInfo.tel?.trim(),
            facebook: myInfo.facebook?.trim(),
            linkedin: myInfo.linkedin?.trim(),
            address: myInfo.address,
            hobby: hobby
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
                    setHobby(res.hobby);
                    setInterest(res.interest);
                    setMyInfo(res);
                } else {
                    console.log("else");
                }
            });
    };

    const validateName = (name : string) => {
        return String(name)
          .toLowerCase()
          .trim()
          .match(
            /^([a-zA-Z]{1,})$/
          );
      };

    const validateUrl = (url : string) => {
        return String(url)
          .trim()
          .match(
            /^((?!www.facebook.com)|(?!www.linkedin.com))+([-a-zA-Z0-9@:%_\+~.#?&=]{0,})$/
          );
      };

    const validateEmail = (email : string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const validateTel = (tel : string) => {
        return String(tel)
          .toLowerCase()
          .match(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
          );
      };

    const addHobby = () => {
        const hobbyInputBox = document.getElementById("input-hobby") as HTMLInputElement;
        if(hobbyInputBox.value === ""){
            textError(hobbyInputBox,"plase input hobby");
        }else{
            textcorrect(hobbyInputBox);
            setHobby(arr => [...arr, itemHobby]);
            hobbyInputBox.value = "";
        }
    }
    const addInterest = () => {
        const interestInputBox = document.getElementById("input-interest") as HTMLInputElement;
        if(interestInputBox.value === ""){
            textError(interestInputBox,"plase input interest");
        }else{
            textcorrect(interestInputBox);
            setInterest(arr => [...arr, itemInterest]);
            interestInputBox.value = "";
        }
    }


    const removeThisHobby = (index: number) => {
        setHobby(arr => arr.filter((ihobby,i) => {return i !== index}))
    };

    const removeThisInterest = (index: number) => {
        setInterest(arr => arr.filter((iInterrest,i) => {return i !== index}))
    };

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errorInputCheck = false;
        //name validation
        if(firstnameInput.value === ""){
            textError(firstnameInput,"plase input your first name");
            errorInputCheck = true;
        }else if(!validateName(firstnameInput.value)){
            textError(firstnameInput,"it's not name");
            errorInputCheck = true;
        }else{
            textcorrect(firstnameInput);
        }
        if(lastnameInput.value === ""){
            textError(lastnameInput,"plase input your last name");
            errorInputCheck = true;
        }else if(!validateName(lastnameInput.value)){
            textError(lastnameInput,"it's not name");
            errorInputCheck = true;
        }else{
            textcorrect(lastnameInput);
        }

        //position validation
        if(positionInput.value === ""){
            textError(positionInput,"plase input your position");
            errorInputCheck = true;
        }else{
            textcorrect(positionInput);
        }

        //email validation
        if(emailInput.value == ""){
            textError(emailInput,"plase input your email");
            errorInputCheck = true;
        }else if(!validateEmail(emailInput.value)){
            textError(emailInput,"it's not email");
            errorInputCheck = true;
        }else{
            textcorrect(emailInput);
        }

        //tel validation
        if(telInput.value == ""){
            textError(telInput,"plase input your telephone number");
            errorInputCheck = true;
        }else if(!validateTel(telInput.value)){
            textError(telInput,"it's not Telephone number");
            errorInputCheck = true;
        }else{
            textcorrect(telInput);
        }

        //facebook validation
        if(!validateUrl(facebookInput.value)){
            textError(facebookInput,"it's not url");
            errorInputCheck = true;
        }else{
            textcorrect(facebookInput);
        }

         //linkedin validation
         if(!validateUrl(linkedinInput.value)){
            textError(linkedinInput,"it's not url");
            errorInputCheck = true;
        }else{
            textcorrect(facebookInput);
        }

        if(!errorInputCheck) submitAboutMe();
    }

    const textError = (element : HTMLInputElement,message : string) => {
        const parentElement = element.parentElement as HTMLDivElement;
        parentElement.className = 'box-input error';
        const small = parentElement.querySelector('small') as HTMLSpanElement;
        small.innerText = message
    }

    const textcorrect = (element : HTMLInputElement) => {
        const parentElement = element.parentElement as HTMLDivElement;
        parentElement.className = 'box-input';
    }

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
                <form className='aboutme-form'onSubmit={submitForm}>
                    <div className="header-section">
                        <h1>About Me</h1>
                    </div>
                    <div className="add-info-section">
                        <div className="name-zone">
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
                        </div>
                        <div className="box-input">
                            <p>Position</p>
                            <input type="text" className="info-input" id='position' defaultValue={""||myInfo.position} onChange={handleInputChange} placeholder='your position...' />
                            <small>something error</small>
                        </div>
                        <div className="date-zone">
                            <div className="box-input">
                                <p>Age</p>
                                <input type="number" className="info-input" id='age' min={1} defaultValue={null||myInfo.age} onChange={handleInputChange} placeholder='your age...' /> 
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>Birth Day</p>
                                <input type="date" className="info-input" id='birthDay' defaultValue={myInfo.birthDay===undefined?"":(myInfo.birthDay).slice(0,10)} onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                        </div>
                        <div className="box-input">
                            <p>Address</p>
                            <input type="text" className="info-input" id='address' defaultValue={""||myInfo.address} onChange={handleInputChange} placeholder='your adress...' />
                            <small>something error</small>
                        </div>
                        <div className="mailNtel-zone">
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
                        </div>
                        <div className="link-zone">
                            <div className="group-link-input">
                                <p>Facebook (not all url)</p>
                                <div className="box-input" id='link-input'>
                                    <p>https://www.facebook.com/</p>
                                    <input type="text" className="info-input" id='facebook' defaultValue={""||myInfo.facebook} onChange={handleInputChange} placeholder='your facebook...' />
                                    <small>something error</small>
                                </div>
                            </div>
                            <div className="group-link-input">
                                <p>Linkedin (not all url)</p>
                                <div className="box-input" id='link-input'>
                                    <p>https://www.linkedin.com/in/</p>
                                    <input type="text" className="info-input" id='linkedin' defaultValue={""||myInfo.linkedin} onChange={handleInputChange} placeholder='your linkedin...' />
                                    <small>something error</small>
                                </div>
                            </div>
                        </div>
                        <div className="hobby-section">
                            <p>Hobby</p>
                            <div className="hobby-board">
                                {hobby.map((item: string,index) =>(
                                    <div className="hobby-card" key={index}>
                                        <p>{item}</p>
                                        <button type="button" className="delete-hobby" onClick={()=>removeThisHobby(index)}>x</button>
                                    </div>
                                ))}
                            </div>
                            <div className="add-hobby">
                                <div className="box-input">
                                    <p>add hobby</p>
                                    <input type="text" className="info-input" id="input-hobby" onChange={e => setItemHobby(e.target.value)} placeholder='your hobby...' />
                                    <small>something error</small>
                                </div>
                                <button type="button" onClick={addHobby} className="submit-hobby">add</button>
                            </div>
                        </div>  
                        <div className="interest-section">
                            <p>interest</p>
                            <div className="interest-board">
                                {interest.map((item: string,index) =>(
                                    <div className="interest-card" key={index}>
                                        <p>{item}</p>
                                        <button type="button" className="delete-interest" onClick={()=>removeThisInterest(index)}>x</button>
                                    </div>
                                ))}
                            </div>
                            <div className="add-interest">
                                <div className="box-input">
                                    <p>add interest</p>
                                    <input type="text" className="info-input" id="input-interest" onChange={e => setItemInterest(e.target.value)} placeholder='your interest...' />
                                    <small>something error</small>
                                </div>
                                <button type="button" onClick={addInterest} className="submit-interest">add</button>
                            </div>
                        </div>
                    </div>    
                    <button type="submit" className="submit-aboutme" >save</button>
                </form>
            </div>
        </div>
    );
}
export default AboutMe;