import InfoNavBar from "./InfoNavBar";
import { useEffect,useState } from "react";
import { educationInterface } from "../models/IEducation";
import { FaTrashAlt } from "react-icons/fa"

function Education() {
    const [token, setToken] = useState<string>("");
    const [myInfoId, setInfoID] = useState<string>("");
    const [educations, setEducations] = useState<educationInterface[]>([]);
    const [education, setEducation] = useState<Partial<educationInterface>>({});

    const apiUrl = "http://localhost:4200";

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
          const id = event.target.id as keyof typeof education;
          const { value } = event.target;
          setEducation({ ...education, [id]: value });
          console.log(education);
      };

    const getEducations = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/education/${myInfoId}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                  console.log(res.length);
                  setEducations(res)
                } else {
                  console.log("else");
                }
            });
      };

      const deleteEducation = async (id: String) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/education/deleteOne/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                  getEducations();
                } else {
                  console.log("else");
                }
            });
      };

      function submitEducation() {
        let data = {
          name: education.name,
          degress: education.degress,
          startDate: education.startDate,
          endDate: education.endDate,
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
        setEducation({});
        fetch(`${apiUrl}/education/create`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    console.log(res);
                    getEducations();
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
            getEducations();
        }
    },[myInfoId])
    return (
        <div>
            <InfoNavBar></InfoNavBar>
            <div className="education-container">
                <h1>Education</h1>
                <div className="education-box">
                    <table className="education-table">
                        <thead>
                            <tr>
                                <th>location</th>
                                <th>degress</th>
                                <th>start date</th>
                                <th>end date</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {educations.map((item: educationInterface,index) =>(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.degress}</td>
                                <td>{String(item.startDate).slice(0,7)}</td>
                                <td>{String(item.endDate).slice(0,7)}</td>
                                <td>
                                    <button onClick={()=>deleteEducation(item._id)}><FaTrashAlt/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="education-input">
                        <h1>IT'S MAXIMUM EDUCATION!</h1>
                        <form className="education-form" id="education-form"
                            onSubmit={(e: React.SyntheticEvent) => {
                                e.preventDefault();
                                submitEducation();
                                const educationform = document.getElementById("education-form") as HTMLFormElement;
                                educationform.reset();
                            }}
                            >
                            <h2>Add Education</h2>
                            <p>location</p>
                            <input type="text" className="location-input" id="name" onChange={handleInputChange} />
                            <p>degress</p>
                            <input type="text" className="degress-input" id="degress" onChange={handleInputChange} />
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
  
export default Education;