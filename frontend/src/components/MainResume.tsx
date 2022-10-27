import resume1 from "./resume1";
import resume2 from "./resume2";
import resume3 from "./resume3";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { informationInterface } from "../models/IInformation";

function MainResume() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const apiUrl = "http://localhost:4200";

    const [resumeInfo, setinfo] = useState(params.get("user"))
    const [myInfo, setMyInfo] = useState<Partial<informationInterface>>({});

    const getMyInformation = async () => {
        console.log(`${apiUrl}/information/${resumeInfo}`);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/information/${resumeInfo}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    console.log(res);
                    setMyInfo(res);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(()=>{
        getMyInformation();
        console.log(myInfo);
    },[])
    return (
        <div className="test-Display">
            <h1>{myInfo.format}</h1>
            <h2>{myInfo.firstName}</h2>
            <h2>{myInfo.lastName}</h2>
            <h2>{myInfo.birthDay}</h2>
            <h2>{"www.facebook.com/"+myInfo.facebook}</h2>
            <a href={"https://www.facebook.com/"+myInfo.facebook}>facebook</a>
            <h2>{myInfo.email}</h2>
            <h2>{myInfo.tel}</h2>
            <h2>Hobby</h2>
            {myInfo.hobby?.map((item: string,index) =>(
                <p key={index}>{item}</p>
            ))}
            <h2>Interesting</h2>
            {myInfo.interest?.map((item: string,index) =>(
                <p key={index}>{item}</p>
            ))}
        </div>
        );
}
export default MainResume;