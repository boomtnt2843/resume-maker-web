import Resume1 from "./Resume1";
import Resume2 from "./Resume2";
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

    if(myInfo.format===1){
        return(
            <Resume1 />
        );
    }

    if(myInfo.format===2){
        return (
            <Resume2 />
        );
    }
    return(
        <div className=""></div>
    )
}
export default MainResume;