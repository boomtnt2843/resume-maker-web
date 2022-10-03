import InfoNavBar from "./InfoNavBar";
import { useEffect,useState } from "react";
import { exprienceInterface } from "../models/IExprience";
import { FaTrashAlt } from "react-icons/fa"

function Experience() {
    const [token, setToken] = useState<string>("");
    const [myInfoId, setInfoID] = useState<string>("");
    const [experiences, setExperiences] = useState<exprienceInterface[]>([]);
    const [experience, setExperience] = useState<Partial<exprienceInterface>>({});

    const apiUrl = "http://localhost:4200";

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
          const id = event.target.id as keyof typeof experience;
          const { value } = event.target;
          setExperience({ ...experience, [id]: value });
          console.log(experience);
      };

    const getExpriences = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/exprience/${myInfoId}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                  console.log(res.length);
                  setExperiences(res)
                } else {
                  console.log("else");
                }
            });
      };

      const deleteExprience = async (id: String) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/exprience/deleteOne/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    getExpriences();
                } else {
                  console.log("else");
                }
            });
      };

      function submitExprience() {
        let data = {
          location: experience.location,
          position: experience.position,
          detail: experience.detail,
          startDate: experience.startDate,
          endDate: experience.endDate,
          ofInformation: myInfoId,
        };
        console.log(JSON.stringify(data))
        const requestOptionsPost = {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        setExperience({});
        fetch(`${apiUrl}/exprience/create`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    console.log(res);
                    getExpriences();
                } else {
                    console.log("error");
                }
            });
      }

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const myInfoID = localStorage.getItem("Info_id")
        if(myInfoID) setInfoID(myInfoID);
        if(token) setToken(token);
        else window.location.href='/';
        if(myInfoId) {
            getExpriences();
        }
    },[myInfoId])
    return (
        <div>
            <InfoNavBar></InfoNavBar>
            <div className="exp-container">
                <h1>Exprience</h1>
                <div className="exp-box">
                    <table className="exp-table">
                        <thead>
                            <tr>
                                <th>location</th>
                                <th>position</th>
                                <th>detail</th>
                                <th>start date</th>
                                <th>end date</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {experiences.map((item: exprienceInterface,index) =>(
                            <tr key={index}>
                                <td>{item.location}</td>
                                <td>{item.position}</td>
                                <td>{item.detail}</td>
                                <td>{String(item.startDate).slice(0,7)}</td>
                                <td>{String(item.endDate).slice(0,7)}</td>
                                <td>
                                    <button onClick={()=>deleteExprience(item._id)}><FaTrashAlt/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="exp-input">
                        <h1>IT'S MAXIMUM EXPIRENCE!</h1>
                        <form className="exp-form" id="exp-form"
                            onSubmit={(e: React.SyntheticEvent) => {
                                e.preventDefault();
                                submitExprience();
                                const expform = document.getElementById("exp-form") as HTMLFormElement;
                                expform.reset();
                            }}
                            >
                            <h2>Add Exprience</h2>
                            <p>location</p>
                            <input type="text" className="location-input" id="location" onChange={handleInputChange} />
                            <p>position</p>
                            <input type="text" className="position-input" id="position" onChange={handleInputChange} />
                            <p>detail</p>
                            <input type="text" className="detail-input" id="detail" onChange={handleInputChange} />
                            <p>start date</p>
                            <input type="date" className="date-input" id="startDate" onChange={handleInputChange} />
                            <p>end date</p>
                            <input type="date" className="date-input" id="endDate" onChange={handleInputChange} />
                            <button type="submit">add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default Experience;