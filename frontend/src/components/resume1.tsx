import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { informationInterface } from "../models/IInformation";
import planet01 from "../image/Planet01.png"

import '../css/resumeShow.css'
import '../css/resume1.css'

function Resume1() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const apiUrl = "http://localhost:4200";

    const [resumeInfo, setinfo] = useState(params.get("user"))
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

    const checkNoText = () => {
        const addressEle = document.getElementById("show-address") as HTMLParagraphElement;
        const facebookEle = document.getElementById("show-facebook") as HTMLParagraphElement;
        const linkedinEle = document.getElementById("show-linkedin") as HTMLParagraphElement;
        const hobbyEle = document.getElementById("show-hobby") as HTMLDivElement;
        if(myInfo.address === "" || myInfo.linkedin === undefined){
            addressEle.className = "nothing"
        }
        if(myInfo.facebook === "" || myInfo.linkedin === undefined){
            facebookEle.className = "nothing"
        }
        if(myInfo.linkedin === "" || myInfo.linkedin === undefined){
            linkedinEle.className = "nothing"
        }
        if(myInfo.hobby?.length == 0){
            hobbyEle.className = "nothing"
        }
    }

    useEffect(()=>{
        getMyInformation();
        //checkNoText()
        console.log(myInfo);
    },[myInfo.firstName])

    return (
        <div className="space-container">
          <div className="header-name">
                <div className="text-name">
                    <h1>Hello! I'm</h1>
                    <h1>{myInfo.firstName}</h1>
                    <h1>{myInfo.lastName}</h1>  
                </div>
                <h1 className="position-job">{myInfo.position}</h1>
                <img className="ima-obj-plant01" src={require('../image/Planet01.png')} />
                <img className="ima-obj-plant02" src={require('../image/Planet02.png')} />
                <img className="ima-obj-spaceship" src={require('../image/Spaceship.png')} />
                <div className="star-group">
                    <img className="ima-obj-star" src={require('../image/Star.png')} />
                    <img className="ima-obj-star" src={require('../image/Star.png')} />
                    <img className="ima-obj-star" src={require('../image/Star.png')} />
                    <img className="ima-obj-star" src={require('../image/Star_falls.png')} />
                    <img className="ima-obj-star" src={require('../image/Star_falls.png')} />
                </div>
          </div>
        </div>
        );
  }
  
export default Resume1;