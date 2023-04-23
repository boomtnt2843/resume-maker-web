import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { informationInterface } from "../models/IInformation";
import { skillInterface } from "../models/ISkill";
import { educationInterface } from "../models/IEducation";
import { exprienceInterface } from "../models/IExprience";
import { activityInterface } from "../models/IActivity";

import {BsFillStarFill,BsPinMapFill,BsCalendar3,BsFillTelephoneFill,BsFacebook,BsLinkedin,BsFillEmojiSmileFill,BsBicycle} from "react-icons/bs";
import {MdEmojiPeople,MdEmail,MdOutlineWork} from "react-icons/md"
import {FaSchool,FaTools,FaLanguage} from "react-icons/fa"

import '../css/resumeShow.css';
import '../css/resume2.css';

function Resume2() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const apiUrl = "http://localhost:4200";
    const resumeInfo = params.get("user");

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
            imgPower.push(<div className="box-power-02" key={i} />);
        }
        return(imgPower)
    }

    const showMore = (element : string) => {
        console.log(element);
        const detailEle = document.getElementById(element) as HTMLDivElement;
        detailEle.classList.toggle("show-more");
    }

    useEffect(()=>{
        getMyInformation();
    },[])
  
    return (
        <div className="shape-container">
            <div className="header-name-02">
                <div className="sq-name" />
                <div className="sq-name" />
                <div className="sq-name" />
                <div className="sq-name" />
                <h1>Hello,</h1>
                <h1>I am {myInfo.firstName} {myInfo.lastName}</h1>
                <h2>{myInfo.position}</h2>
                <div className="cir-name" />
            </div>
            <div className="aboutme-sec-02">
                <div className="aboutme-box-02">
                    <h1>- About Me -</h1>

                    {myInfo.address !== undefined && myInfo.address !== "" ?(
                    <div className="group-address" id="group-address">
                        <h2><BsPinMapFill /></h2>
                        <h2>Address :</h2>
                        <p>{myInfo.address}</p>
                    </div>):(<div className="nothing" />)}

                    {myInfo.birthDay !== undefined && myInfo.birthDay !== "" ?(
                    <div className="birth-day-group" id="birth-day-group">
                        <h2><BsCalendar3 /></h2>
                        <h2> Birthday :</h2>
                        <input type="date" className="show-birthday-02" defaultValue={myInfo.birthDay===undefined?"":(myInfo.birthDay).slice(0,10)} disabled />
                    </div>):(<div className="nothing" />)}

                    {myInfo.age !== undefined && myInfo.age !== null ?(
                    <div className="age-group" id="age-group">
                        <h2><MdEmojiPeople /></h2>
                        <h2>Age :</h2>
                        <p>{myInfo.age}</p>
                    </div>):(<div className="nothing" />)}

                    <div className="email-group" id="age-group">
                        <h2><MdEmail /></h2>
                        <h2>Email :</h2>
                        <p>{myInfo.email}</p>
                    </div>

                    <div className="tel-group" id="age-group">
                        <h2><BsFillTelephoneFill /></h2>
                        <h2>Telephone :</h2>
                        <p>{myInfo.tel}</p>
                    </div>
                </div>
                {(myInfo.facebook === undefined || myInfo.facebook === "") && ( myInfo.linkedin === undefined || myInfo.linkedin === "") ?(<div className="nothing" />):(
                <div className="social-group-02">
                    
                    {myInfo.facebook !== undefined && myInfo.facebook !== "" ?(
                    <div className="link-group-02" id="facebook-group">
                        <a className="facebook-link" href={"https://www.facebook.com/"+myInfo.facebook}><BsFacebook /> Facebook</a>
                    </div>):(<div className="nothing" />)}

                    {myInfo.linkedin !== undefined && myInfo.linkedin !== "" ?(
                    <div className="link-group-02" id="linkedin-group">
                        <a className="linkedin-link" href={"https://www.linkedin.com/in/"+myInfo.linkedin}><BsLinkedin /> Linkedin</a>
                    </div>):(<div className="nothing" />)}

                    <h1>Social Media</h1>
                </div>)}
                {myInfo.hobby !== undefined && myInfo.hobby.length !== 0 ?(
                <div className="like-sec-02" id="hobby-group-02">
                    <div className="ico-ima-02" />
                    <div className="text-like-group-02">
                        <h1>Hobby</h1>
                        <div className="all-like-02">
                            {myInfo.hobby.map((item: string,index) =>(
                            <div className="like-item-02" key={index}>
                                <p><BsBicycle/> {item}</p>
                            </div>))}
                        </div>
                    </div>
                </div>):(<div className="nothing" />)}

                {myInfo.interest !== undefined && myInfo.interest.length !== 0 ?(
                <div className="like-sec-02" id="interest-group-02">
                    <div className="text-like-group-02">
                        <h1>Interest</h1>
                        <div className="all-like-02">
                            {myInfo.interest.map((item: string,index) =>(
                            <div className="like-item-02" key={index}>
                                    <p><BsFillEmojiSmileFill/> {item}</p>
                            </div>))}
                        </div>
                    </div>
                    <div className="ico-ima-02">
                    </div>
                </div>):(<div className="nothing" />)}
            </div>

            {myInfo.generalskills !== undefined && myInfo.generalskills.length !== 0 ?(
                <div className="general-skill-sec-02">
                    <h1>General Skills</h1>
                    <div className="skill-group-02" id="general-ico">
                        <div className="ico-zone-02" id="general-ima">
                            <p><BsFillStarFill/></p>
                        </div>
                        <div className="skill-zone-02">
                            <div className="tier-power-02" id="gene-head">
                                <p></p>
                                <h3>poor</h3>
                                <h3>Fair</h3>
                                <h3>Average</h3>
                                <h3>Good</h3>
                                <h3>Excellent</h3>
                            </div>
                            {myInfo.generalskills.map((item: skillInterface,index) =>(
                            <div className="skill-item-02" id="general-item" key={index}>
                                <p>{item.name}</p>
                                {showpower(item.power)}
                            </div>))}
                        </div>
                    </div>
                </div>
            ):(<div className="nothing" />)}

            {myInfo.technicalskills !== undefined && myInfo.technicalskills.length !== 0 ?(
                <div className="technical-skill-sec-02">
                    <h1>Technical Skills</h1>
                    <div className="skill-group-02" id="technical-ico">
                        <div className="skill-zone-02">
                            <div className="tier-power-02" id="tech-head">
                                <p></p>
                                <h3>poor</h3>
                                <h3>Fair</h3>
                                <h3>Average</h3>
                                <h3>Good</h3>
                                <h3>Excellent</h3>
                            </div>
                            {myInfo.technicalskills.map((item: skillInterface,index) =>(
                            <div className="skill-item-02" id="technical-item" key={index}>
                                <p>{item.name}</p>
                                {showpower(item.power)}
                            </div>))}
                        </div>
                        <div className="ico-zone-02" id="technical-ima">
                            <p><FaTools/></p>
                        </div>
                    </div>
                </div>
            ):(<div className="nothing" />)}

            {myInfo.languages !== undefined && myInfo.languages.length !== 0 ?(
                <div className="languages-skill-sec-02">
                    <h1>Languages Skills</h1>
                    <div className="skill-group-02" id="languages-ico">
                        <div className="ico-zone-02" id="languages-ima">
                            <p><FaLanguage/></p>
                        </div>
                        <div className="skill-zone-02">
                            <div className="tier-power-02" id="lang-head">
                                <p></p>
                                <h3>poor</h3>
                                <h3>Fair</h3>
                                <h3>Average</h3>
                                <h3>Good</h3>
                                <h3>Excellent</h3>
                            </div>
                            {myInfo.languages.map((item: skillInterface,index) =>(
                            <div className="skill-item-02" id="languages-item" key={index}>
                                <p>{item.name}</p>
                                {showpower(item.power)}
                            </div>))}
                        </div>
                    </div>
                </div>
            ):(<div className="nothing" />)}

        {myInfo.educations !== undefined && myInfo.educations.length !== 0 ?(
            <div className="education-sec-02">
                <div className="education-group-02">
                    <h1>Education</h1>
                    {myInfo.educations.map((item: educationInterface,index) => (
                    <div className="education-item-02" key={index}>
                        <p className="icon-edu-02"><FaSchool /></p>
                        <div className="detail-box-edu-02">
                            <h2>
                                {getMonthName(String(item.startDate).slice(5,7))}
                                {" "+String(item.startDate).slice(0,4)+" - "}
                                {getMonthName(String(item.endDate).slice(5,7))}
                                {" "+String(item.endDate).slice(0,4)}
                            </h2>
                            <h1>{item.name}</h1>
                            <h2>{item.degress}</h2>
                        </div>
                    </div>))}
                </div>
                <div className="cir-edu" />
            </div>
             ):(<div className="nothing" />)}

        {myInfo.experiences !== undefined && myInfo.experiences.length !== 0 ?(
            <div className="exp-sec-02">
                <h1>Experiences</h1>
                {myInfo.experiences.map((item:exprienceInterface,index)=>(
                <div className={"exp-box-show-02 "+"form"+(index%3)} key={index} >
                    <div className="text-exp-show-02">
                        <div className="exp-head-02">
                            <h2>
                                {getMonthName(String(item.startDate).slice(5,7))}
                                {" "+String(item.startDate).slice(0,4)+" - "}
                                {getMonthName(String(item.endDate).slice(5,7))}
                                {" "+String(item.endDate).slice(0,4)}
                            </h2>
                            <h1>
                                <MdOutlineWork />{" "}{item.location}{" - "}{item.position}
                            </h1>
                        </div>
                        <div className="detail-exp-02" id={"exp-detail-"+item._id}>
                            <h2 className="more-detail-02" onClick={()=>showMore("exp-detail-"+item._id)}>More Detail</h2>
                            <h2 className="hidden-detail-02" onClick={()=>showMore("exp-detail-"+item._id)} >Hidden Detail</h2>
                            <h2 className="detail-txt-02" >{item.detail}</h2>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            ):(<div className="nothing" />)}

        {myInfo.activities !== undefined && myInfo.activities.length !== 0 ?(
            <div className="act-sec-02">
                <h1>Activity</h1>
                {myInfo.activities.map((item:activityInterface,index)=>(
                    <div className="act-item-02" key={index}>
                        <h2>{item.nameHeader}</h2>
                        <h3>
                            {getMonthName(String(item.startDate).slice(5,7))}
                            {" "+String(item.startDate).slice(0,4)}
                            {item.endDate!==null&&item.endDate!==undefined&&String(item.endDate) !== "" ? " - "+getMonthName(String(item.endDate).slice(5,7))+" "+String(item.endDate).slice(0,4):""}
                        </h3>
                        <p>{item.detail}</p>
                    </div>
                ))}
            </div>
        ):(<div className="nothing" />)}
    </div>
    );
}
export default Resume2;
