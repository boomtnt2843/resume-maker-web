import InfoNavBar from "./InfoNavBar";
import { useEffect,useState } from "react";
import { educationInterface } from "../models/IEducation";
import { FaTrashAlt } from "react-icons/fa"
import '../css/education.css'

function Education() {
    const [token, setToken] = useState<string>("");
    const [myInfoId, setInfoID] = useState<string>("");
    const [educations, setEducations] = useState<educationInterface[]>([]);
    const [education, setEducation] = useState<Partial<educationInterface>>({});

    const apiUrl = "http://localhost:4200";

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const degressInput = document.getElementById('degress') as HTMLInputElement;
    const startInput = document.getElementById('startDate') as HTMLInputElement;
    const endInput = document.getElementById('endDate') as HTMLInputElement;
    const educationInput = document.getElementById('education-input') as HTMLDivElement;

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
                  maxEdu(res.length);
                  setEducations(res)
                } else {
                  console.log("else");
                }
            });
      };

      const maxEdu = (num: number) => {
        if (num >= 5){
            educationInput.className="education-input max"
        }else{
            educationInput.className="education-input"
        }
      }

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

    const submitFormEducation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errorInputCheck = false;

        if(nameInput.value===""){
            textError(nameInput,"plase input name of school/university");
            errorInputCheck = true;
        }else{
            textcorrect(nameInput)
        }
        if(degressInput.value===""){
            textError(degressInput,"plase input degress");
            errorInputCheck = true;
        }else{
            textcorrect(degressInput)
        }
        if(startInput.value===""){
            textError(startInput,"plase choose date");
            errorInputCheck = true;
        }else{
            textcorrect(startInput)
        }
        if(endInput.value===""){
            textError(endInput,"plase choose date");
            errorInputCheck = true;
        }else{
            textcorrect(endInput)
        }

        if(!errorInputCheck){
            submitEducation();
            const educationform = document.getElementById("education-form") as HTMLFormElement;
            educationform.reset();
        }

    }

    const textError = (element : HTMLInputElement,message : string) => {
        const parentElement = element.parentElement as HTMLDivElement;
        parentElement.className = 'box-input error';
        const small = parentElement.querySelector('small') as HTMLSpanElement;
        small.innerText = message
    }

    const textcorrect = (element : HTMLInputElement) => {
        const parentElement = element.parentElement as HTMLDivElement;
        parentElement.className = 'box-input';
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
                    <div className="education-input" id="education-input">
                        <h1>IT'S MAXIMUM EDUCATION!</h1>
                        <form className="education-form" id="education-form" onSubmit={submitFormEducation}>
                            <h2>Add Education</h2>
                            <div className="box-input">
                                <p>location</p>
                                <input type="text" className="location-input" id="name" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>degress</p>
                                <input type="text" className="degress-input" id="degress" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>start date</p>
                                <input type="date" className="date-input" id="startDate" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>end date</p>
                                <input type="date" className="date-input" id="endDate" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <button type="submit">add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default Education;