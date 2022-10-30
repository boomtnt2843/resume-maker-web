import Resume1 from "./Resume1";
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
            <Resume1 />
        );
}
export default MainResume;