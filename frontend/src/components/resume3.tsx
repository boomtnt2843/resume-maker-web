import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { informationInterface } from "../models/IInformation";
import { skillInterface } from "../models/ISkill";
import { educationInterface } from "../models/IEducation";
import { exprienceInterface } from "../models/IExprience";
import { activityInterface } from "../models/IActivity";

import {BsPinMapFill,BsCalendar3,BsFillTelephoneFill,BsFacebook,BsLinkedin,BsFillEmojiHeartEyesFill,BsFillLightningFill} from "react-icons/bs";
import {MdEmojiPeople,MdEmail} from "react-icons/md"
import {FaSchool,FaGraduationCap,} from "react-icons/fa"
import {RiBearSmileFill,RiBearSmileLine} from "react-icons/ri"

import '../css/resumeShow.css';
import '../css/resume3.css';

function Resume3() {
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
          imgPower.push(<h2 className="box-power-03" key={i} ><RiBearSmileFill /></h2>);
      }
      return(imgPower)
  }

  useEffect(()=>{
      getMyInformation();
  },[])

  return (
      <div className="bear-container">
            <div className="header-name-03">
                <h1>Hello</h1>
                <h1>I am {myInfo.firstName} {myInfo.lastName}</h1>
                <h2>{myInfo.position}</h2>
            </div>
            <div className="aboutme-sec-03">
              <div className="aboutme-box-03">
                  <h1>- About Me -</h1>

                  {myInfo.address !== undefined && myInfo.address !== "" ?(
                  <div className="group-address" id="group-address">
                      <h3><BsPinMapFill /></h3>
                      <h3>Address :</h3>
                      <p>{myInfo.address}</p>
                  </div>):(<div className="nothing" />)}

                  {myInfo.birthDay !== undefined && myInfo.birthDay !== "" ?(
                  <div className="birth-day-group" id="birth-day-group">
                      <h3><BsCalendar3 /></h3>
                      <h3> Birthday :</h3>
                      <input type="date" className="show-birthday-03" defaultValue={myInfo.birthDay===undefined?"":(myInfo.birthDay).slice(0,10)} disabled />
                  </div>):(<div className="nothing" />)}

                  {myInfo.age !== undefined && myInfo.age !== null ?(
                  <div className="age-group" id="age-group">
                      <h3><MdEmojiPeople /></h3>
                      <h3>Age :</h3>
                      <p>{myInfo.age}</p>
                  </div>):(<div className="nothing" />)}

                  <div className="email-group" id="age-group">
                      <h3><MdEmail /></h3>
                      <h3>Email :</h3>
                      <p>{myInfo.email}</p>
                  </div>

                  <div className="tel-group" id="age-group">
                      <h3><BsFillTelephoneFill /></h3>
                      <h3>Telephone :</h3>
                      <p>{myInfo.tel}</p>
                  </div>
              </div>
              {(myInfo.facebook === undefined || myInfo.facebook === "") && ( myInfo.linkedin === undefined || myInfo.linkedin === "") ?(<div className="nothing" />):(
              <div className="social-group-03">
                <h2>Social Media</h2>
                  
                {myInfo.facebook !== undefined && myInfo.facebook !== "" ?(
                <div className="link-group-03" id="facebook-group">
                    <a className="facebook-link" href={"https://www.facebook.com/"+myInfo.facebook}><BsFacebook /> Facebook</a>
                </div>):(<div className="nothing" />)}

                {myInfo.linkedin !== undefined && myInfo.linkedin !== "" ?(
                <div className="link-group-03" id="linkedin-group">
                    <a className="linkedin-link" href={"https://www.linkedin.com/in/"+myInfo.linkedin}><BsLinkedin /> Linkedin</a>
                </div>):(<div className="nothing" />)}
              </div>)}
              {myInfo.hobby !== undefined && myInfo.hobby.length !== 0 ?(
              <div className="like-sec-03" id="hobby-group">
                  <div className="text-like-group-03">
                        <h1>Hobby</h1>
                        <div className="all-like-03">
                        {myInfo.hobby.map((item: string,index) =>(
                            <div className="like-item-03" key={index}>
                                <p><BsFillLightningFill/></p>
                                <p>{item}</p>
                            </div>))}
                        </div>
                    </div>
                    <div className="footer-like">
                        <p><RiBearSmileFill /></p>
                        <div className="bar-footer-bear" />
                        <p><RiBearSmileFill /></p>
                    </div>
              </div>):(<div className="nothing" />)}

              {myInfo.interest !== undefined && myInfo.interest.length !== 0 ?(
              <div className="like-sec-03" id="interest-group">
                    <div className="text-like-group-03">
                        <h2>Interest</h2>
                        <div className="all-like-03">
                            {myInfo.interest.map((item: string,index) =>(
                            <div className="like-item-03" key={index}>
                                <p><BsFillEmojiHeartEyesFill/></p>
                                <p>{item}</p>
                            </div>))}
                        </div>
                    </div>
                    <div className="footer-like">
                        <p><RiBearSmileFill /></p>
                        <div className="bar-footer-bear" />
                        <p><RiBearSmileFill /></p>
                    </div>
              </div>):(<div className="nothing" />)}
            </div>

          {myInfo.generalskills !== undefined && myInfo.generalskills.length !== 0 ?(
              <div className="general-skill-sec-03">
                    <h1>General Skills</h1>
                    <div className="skill-group-03">
                        <div className="skill-zone-03">
                            <img className="ima-obj-bear" src={require('../image/bear/Bear1.png')} alt="bear01" />
                            <div className="tier-power-03">
                                <p></p>
                                <h3>poor</h3>
                                <h3>Fair</h3>
                                <h3>Average</h3>
                                <h3>Good</h3>
                                <h3>Excellent</h3>
                            </div>
                            {myInfo.generalskills.map((item: skillInterface,index) =>(
                            <div className="skill-item-03" id="general-tag" key={index}>
                                <p>{item.name}</p>
                                {showpower(item.power)}
                            </div>))}
                        </div>
                    </div>
              </div>
          ):(<div className="nothing" />)}

          {myInfo.technicalskills !== undefined && myInfo.technicalskills.length !== 0 ?(
              <div className="technical-skill-sec-03">
                    <h1>Technical Skills</h1>
                    <div className="skill-group-03" >
                        <div className="skill-zone-03">
                        <img className="ima-obj-bear" src={require('../image/bear/Bear2.png')} alt="bear02" />
                            <div className="tier-power-03" >
                                <p></p>
                                <h3>poor</h3>
                                <h3>Fair</h3>
                                <h3>Average</h3>
                                <h3>Good</h3>
                                <h3>Excellent</h3>
                            </div>
                            {myInfo.technicalskills.map((item: skillInterface,index) =>(
                            <div className="skill-item-03" id="technical-tag" key={index}>
                                <p>{item.name}</p>
                                {showpower(item.power)}
                            </div>))}
                        </div>
                    </div>
              </div>
          ):(<div className="nothing" />)}

          {myInfo.languages !== undefined && myInfo.languages.length !== 0 ?(
              <div className="languages-skill-sec-03">
                  <h1>Languages Skills</h1>
                  <div className="skill-group-03">
                      <div className="skill-zone-03">
                            <img className="ima-obj-bear" src={require('../image/bear/Bear3.png')} alt="bear03" />
                            <div className="tier-power-03">
                                <p></p>
                                <h3>poor</h3>
                                <h3>Fair</h3>
                                <h3>Average</h3>
                                <h3>Good</h3>
                                <h3>Excellent</h3>
                            </div>
                            {myInfo.languages.map((item: skillInterface,index) =>(
                            <div className="skill-item-03" id="languages-tag" key={index}>
                                <p>{item.name}</p>
                                {showpower(item.power)}
                            </div>))}
                      </div>
                  </div>
              </div>
          ):(<div className="nothing" />)}

      {myInfo.educations !== undefined && myInfo.educations.length !== 0 ?(
          <div className="education-sec-03">
                <div className="education-group-03">
                    <div className="edu-bar-timrline" />
                    <h1>Education</h1>
                    {myInfo.educations.map((item: educationInterface,index) => (
                    <div className="education-item-03" key={index}>
                        <p className="icon-edu-03"><FaSchool /></p>
                        <div className="detail-box-edu-03">
                            <p>
                                {getMonthName(String(item.startDate).slice(5,7))}
                                {" "+String(item.startDate).slice(0,4)+" - "}
                                {getMonthName(String(item.endDate).slice(5,7))}
                                {" "+String(item.endDate).slice(0,4)}
                            </p>
                            <h2>{item.name}</h2>
                            <p>{item.degress}</p>
                        </div>
                        <p className="footer-edu-03"><FaGraduationCap /></p>
                    </div>))}
                </div>
          </div>
           ):(<div className="nothing" />)}

      {myInfo.experiences !== undefined && myInfo.experiences.length !== 0 ?(
          <div className="exp-sec-03">
              <h1>Experiences</h1>
              {myInfo.experiences.map((item:exprienceInterface,index)=>(
              <div className={"exp-box-show-03"} key={index} >
                  <div className="text-exp-show-03">
                        <div className="exp-head-03">
                            <p>
                                {getMonthName(String(item.startDate).slice(5,7))}
                                {" "+String(item.startDate).slice(0,4)+" - "}
                                {getMonthName(String(item.endDate).slice(5,7))}
                                {" "+String(item.endDate).slice(0,4)}
                            </p>
                            <h2>
                                <RiBearSmileLine />{" "}{item.location}{" - "}{item.position}
                            </h2>
                        </div>
                        <p className="detail-txt-03" >{item.detail}</p>
                  </div>
              </div>
              ))}
          </div>
          ):(<div className="nothing" />)}

      {myInfo.activities !== undefined && myInfo.activities.length !== 0 ?(
          <div className="act-sec-03">
                <img className="ima-obj-bear" src={require('../image/bear/footprint3.png')} alt="bear01" />
                <img className="ima-obj-bear" src={require('../image/bear/footprint4.png')} alt="bear02" />
                <img className="ima-obj-bear" src={require('../image/bear/footprint4.png')} alt="bear03" />
                <img className="ima-obj-bear" src={require('../image/bear/footprint3.png')} alt="bear04" />
                <h1>Activity</h1>
                {myInfo.activities.map((item:activityInterface,index)=>(
                    <div className="act-item-03" key={index}>
                        <p>
                            {getMonthName(String(item.startDate).slice(5,7))}
                            {" "+String(item.startDate).slice(0,4)}
                            {item.endDate!==null&&item.endDate!==undefined&&String(item.endDate) !== "" ? " - "+getMonthName(String(item.endDate).slice(5,7))+" "+String(item.endDate).slice(0,4):""}
                        </p>
                        <h2>{item.nameHeader}</h2>
                        <p>{item.detail}</p>
                    </div>
                ))}
          </div>
      ):(<div className="nothing" />)}
  </div>
  );
}
export default Resume3;