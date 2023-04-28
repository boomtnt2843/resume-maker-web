import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { informationInterface } from "../models/IInformation";
import { skillInterface } from "../models/ISkill";
import { educationInterface } from "../models/IEducation";
import { exprienceInterface } from "../models/IExprience";
import { activityInterface } from "../models/IActivity";

import {BsPinMapFill,BsCalendar3,BsFillTelephoneFill,BsFacebook,BsLinkedin} from "react-icons/bs";
import {MdEmojiPeople,MdEmail,MdOutlineWork} from "react-icons/md"
import {FaSchool} from "react-icons/fa"

import '../css/resumeShow.css';
import '../css/resume1.css';

function Resume1() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const apiUrl = "http://localhost:4200";
    const resumeInfo = params.get("user");

    //const [resumeInfo, setinfo] = useState(params.get("user"))
    const [myInfo, setMyInfo] = useState<Partial<informationInterface>>({});

    const getMyInformation = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/information/all/${resumeInfo}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    setMyInfo(res[0]);
                } else {
                    console.log("else");
                }
            });
    };

    const convertType = (data: string) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const getMonthName = (monthNumber: string) => {
        const date = new Date();
        date.setMonth(convertType(monthNumber) - 1);
      
        return date.toLocaleString([], { month: 'long' });
      }
      

    const showpower = (power: number) =>{
        const imgPower = [];
        for (let i = 0; i < power; i++) {

            imgPower.push(<img className="ima-obj-star-power" key={i} src={require('../image/spaces/Star.png')} alt="star" />);
        }
        return(imgPower)
    }

    useEffect(()=>{
        getMyInformation();
    })

    return (
        <div className="space-container">
            <div className="header-name">
                <div className="text-name">
                    <h1>Hello! I'm</h1>
                    <h1>{myInfo.firstName}</h1>
                    <h1>{myInfo.lastName}</h1>  
                </div>
                <h1 className="position-job">{myInfo.position}</h1>
                <img className="ima-obj-plant01" src={require('../image/spaces/Planet01.png')} alt="plant01" />
                <img className="ima-obj-plant02" src={require('../image/spaces/Planet02.png')} alt="plant02" />
                <img className="ima-obj-spaceship" src={require('../image/spaces/Spaceship.png')} alt="spaceship" />
                <div className="star-group">
                    <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-star" src={require('../image/spaces/Star_falls.png')} alt="starFall" />
                    <img className="ima-obj-star" src={require('../image/spaces/Star_falls.png')} alt="starFall" />
                </div>
            </div>
            <div className="sec-aboutme">
                <div className="header-group">
                    <h1 className="head-topic">ABOUT ME</h1>
                    <img className="ima-obj-helfmoon" src={require('../image/spaces/Helf_Moon.png')} alt="helfmoon" />
                    <img className="ima-obj-star-in-name" src={require('../image/spaces/Star.png')} alt="star" />
                </div>
                <div className="detail-aboutme">

                    {myInfo.address !== undefined && myInfo.address !== "" ?(
                    <div className="group-address" id="group-address">
                        <h2><BsPinMapFill /> Address :</h2>
                        <p>{myInfo.address}</p>
                    </div>):(<div className="nothing" />)}

                    {myInfo.birthDay !== undefined && myInfo.birthDay !== "" ?(
                    <div className="birth-day-group" id="birth-day-group">
                        <h2><BsCalendar3 /> Birthday :</h2>
                        <input type="date" className="show-birthday" defaultValue={myInfo.birthDay===undefined?"":(myInfo.birthDay).slice(0,10)} disabled />
                    </div>):(<div className="nothing" />)}

                    {myInfo.age !== undefined && myInfo.age !== null ?(
                    <div className="age-group" id="age-group">
                        <h2><MdEmojiPeople /> Age :</h2>
                        <p>{myInfo.age}</p>
                    </div>):(<div className="nothing" />)}

                    <div className="email-group" id="age-group">
                        <h2><MdEmail /> Email :</h2>
                        <p>{myInfo.email}</p>
                    </div>

                    <div className="tel-group" id="age-group">
                        <h2><BsFillTelephoneFill /> Telephone :</h2>
                        <p>{myInfo.tel}</p>
                    </div>

                </div>
                {(myInfo.facebook === undefined || myInfo.facebook === "") && ( myInfo.linkedin === undefined || myInfo.linkedin === "") ?(<div className="nothing" />):(
                <div className="social-group">
                    {myInfo.facebook !== undefined && myInfo.facebook !== "" ?(
                    <div className="link-group" id="facebook-group">
                        <a className="facebook-link" href={"https://www.facebook.com/"+myInfo.facebook}><BsFacebook /></a>
                    </div>):(<div className="nothing" />)}

                    {myInfo.linkedin !== undefined && myInfo.linkedin !== "" ?(
                    <div className="link-group" id="linkedin-group">
                        <a className="linkedin-link" href={"https://www.linkedin.com/in/"+myInfo.linkedin}><BsLinkedin /></a>
                    </div>):(<div className="nothing" />)}

                    <h1>Social media</h1>
                </div>)}
            </div>
            {myInfo.hobby !== undefined && myInfo.hobby.length !== 0 ?(
            <div className="like-sec" id="hobby-group">
                <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                <h1>Hobby</h1>
                <div className="all-like">
                    {myInfo.hobby.map((item: string,index) =>(
                    <div className="like-item" key={index}>
                        <p>{"> "+item}</p>
                    </div>))}
                </div>
            </div>):(<div className="nothing" />)}

            {myInfo.interest !== undefined && myInfo.interest.length !== 0 ?(
            <div className="like-sec" id="interest-group">
                <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                <img className="ima-obj-star" src={require('../image/spaces/Star.png')} alt="star" />
                <img className="ima-obj-star" src={require('../image/spaces/Star_falls.png')} alt="star" />
                <h1>Interest</h1>
                <div className="all-like">
                    {myInfo.interest.map((item: string,index) =>(
                    <div className="like-item" key={index}>
                            <p>{"> "+item}</p>
                    </div>))}
                </div>
            </div>):(<div className="nothing" />)}

            <div className="connext-zone-01" />

            {myInfo.generalskills !== undefined && myInfo.generalskills.length !== 0 ?(
                <div className="general-skill-sec">
                    <h1>General Skills</h1>
                    <div className="skill-group">
                        <div className="tier-power">
                            <p></p>
                            <h3>poor</h3>
                            <h3>Fair</h3>
                            <h3>Average</h3>
                            <h3>Good</h3>
                            <h3>Excellent</h3>
                        </div>
                        {myInfo.generalskills.map((item: skillInterface,index) =>(
                        <div className="skill-item" key={index}>
                            <p>{item.name}</p>
                            {showpower(item.power)}
                        </div>))}
                    </div>
                    <div className="bar-footer" />
                </div>
            ):(<div className="nothing" />)}

            {myInfo.technicalskills !== undefined && myInfo.technicalskills.length !== 0 ?(
                <div className="technical-skill-sec">
                    <div className="skill-group">
                        <div className="tier-power">
                            <p></p>
                            <h3>poor</h3>
                            <h3>Fair</h3>
                            <h3>Average</h3>
                            <h3>Good</h3>
                            <h3>Excellent</h3>
                        </div>
                        {myInfo.technicalskills.map((item: skillInterface,index) =>(
                        <div className="skill-item" key={index}>
                            <p>{item.name}</p>
                            {showpower(item.power)}
                        </div>))}
                    </div>
                    <h1>Technical Skills</h1>
                    <div className="bar-footer" />
                </div>
            ):(<div className="nothing" />)}

            {myInfo.languages !== undefined && myInfo.languages.length !== 0 ?(
            <div className="languages-sec">
                <h1>Languages</h1>
                <div className="skill-group">
                    <div className="tier-power">
                        <p></p>
                        <h3>poor</h3>
                        <h3>Fair</h3>
                        <h3>Average</h3>
                        <h3>Good</h3>
                        <h3>Excellent</h3>
                    </div>
                    {myInfo.languages.map((item: skillInterface,index) =>(
                    <div className="skill-item" key={index}>
                        <p>{item.name}</p>
                        {showpower(item.power)}
                </div>))}
                </div>
                <div className="bar-footer" />
            </div>
            ):(<div className="nothing" />)}

            {myInfo.educations !== undefined && myInfo.educations.length !== 0 ?(
            <div className="education-sec">
                <div className="education-group">
                    <h1>Education</h1>
                    {myInfo.educations.map((item: educationInterface,index) => (
                    <div className="education-item" key={index}>
                        <p className="icon-edu"><FaSchool /></p>
                        <div className="detail-box-edu">
                            <h2>
                                {getMonthName(String(item.startDate).slice(5,7))}
                                {" "+String(item.startDate).slice(0,4)+" - "}
                                {getMonthName(String(item.endDate).slice(5,7))}
                                {" "+String(item.endDate).slice(0,4)}
                            </h2>
                            <h1>{item.name}</h1>
                            <h2>{item.degress}</h2>
                        </div>
                    </div>
                    ))}
                    <div className="bar-line" />
                    <img className="ima-obj-edu-planet" src={require('../image/spaces/Planet03.png')} alt="plant03" />
                    <img className="ima-obj-edu-spaceship" src={require('../image/spaces/Spaceship02.png')} alt="spaceship02" />
                </div>
                <div className="star-group-edu">
                    <img className="ima-obj-edu-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-edu-star" src={require('../image/spaces/Star_falls.png')} alt="star" />
                    <img className="ima-obj-edu-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-edu-star" src={require('../image/spaces/Star.png')} alt="star" />
                </div>
            </div>
             ):(<div className="nothing" />)}

            {myInfo.experiences !== undefined && myInfo.experiences.length !== 0 ?(
            <div className="exp-sec">
                <h1>Experiences</h1>
                {myInfo.experiences.map((item:exprienceInterface,index)=>(
                <div className={"exp-box-show form"+(index%2)} key={index} >
                    <div className="text-exp-show">
                        <h2>
                            {getMonthName(String(item.startDate).slice(5,7))}
                            {" "+String(item.startDate).slice(0,4)+" - "}
                            {getMonthName(String(item.endDate).slice(5,7))}
                            {" "+String(item.endDate).slice(0,4)}
                        </h2>
                        <h1><MdOutlineWork />{" "}{item.location}{" - "}{item.position}</h1>
                        <h2>{item.detail}</h2>
                    </div>
                    <img className="ima-obj-exp-planet" src={require('../image/spaces/Planet0'+(9-index)+'.png')} alt="star" />
                </div>
                ))}
            </div>
            ):(<div className="nothing" />)}

            {myInfo.activities !== undefined && myInfo.activities.length !== 0 ?(
            <div className="act-sec">
                <h1>Activity</h1>
                {myInfo.activities.map((item:activityInterface,index)=>(
                    <div className="act-item" key={index}>
                        <h2>
                            {getMonthName(String(item.startDate).slice(5,7))}
                            {" "+String(item.startDate).slice(0,4)}
                            {item.endDate!==null&&item.endDate!==undefined&&String(item.endDate) !== "" ? " - "+getMonthName(String(item.endDate).slice(5,7))+" "+String(item.endDate).slice(0,4):""}
                        </h2>
                        <h1>{item.nameHeader}</h1>
                        <h2>{item.detail}</h2>
                    </div>
                ))}
                <div className="ima-group-act">
                    <img className="ima-obj-act-planet" src={require('../image/spaces/Planet04.png')} alt="star" />
                    <img className="ima-obj-act-planet" src={require('../image/spaces/Planet07.png')} alt="star" />
                    <img className="ima-obj-act-planet" src={require('../image/spaces/Planet06.png')} alt="star" />
                    <img className="ima-obj-act-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-act-star" src={require('../image/spaces/Star_falls.png')} alt="star" />
                    <img className="ima-obj-act-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-act-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-act-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-act-star" src={require('../image/spaces/Star.png')} alt="star" />
                    <img className="ima-obj-act-star" src={require('../image/spaces/Star_falls.png')} alt="star" />
                    <img className="ima-obj-act-line" src={require('../image/spaces/line01.png')} alt="line" />
                </div>
            </div>
            ):(<div className="nothing" />)}
        </div>
        );
  }
  
export default Resume1;
