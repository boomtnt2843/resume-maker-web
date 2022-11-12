import Resume1 from "./Resume1";
import Resume2 from "./Resume2";
import Resume3 from "./Resume3";
import HomeNavBar from "./HomeNavBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { informationInterface } from "../models/IInformation";

function ExampleResume() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const format = params.get("format")

    if(format==='1'){
        return(
            <div>
                <HomeNavBar />
                <Resume1 />
            </div>
        );
    }

    if(format==='2'){
        return (
            <div>
                <HomeNavBar />
                <Resume2 />
            </div>
        );
    }

    if(format==='3'){
        return(
            <div>
                <HomeNavBar />
                <Resume3 />
            </div>
        );
    }

    return(
        <div className="error-container">
            <p>Loading. . .</p> 
            <a href="/">return to website</a>
        </div>
    )
}
export default ExampleResume;