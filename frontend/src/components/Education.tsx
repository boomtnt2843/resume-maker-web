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
        const educationInput = document.getElementById('education-input') as HTMLDivElement;
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
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const degressInput = document.getElementById('degress') as HTMLInputElement;
        const startInput = document.getElementById('startDate') as HTMLInputElement;
        const endInput = document.getElementById('endDate') as HTMLInputElement;

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

    const toggleEdit = (elementStr : string) =>{
        const eduElement = document.getElementById(elementStr) as HTMLDivElement;
        eduElement.classList.toggle('active');
    }

    const checkVarEdit = (elementStr : string) =>{
        const nameEditElement = document.getElementById((elementStr+"-name")) as HTMLTextAreaElement;
        const degressEditElement = document.getElementById(elementStr+"-degress") as HTMLInputElement;
        const sDateEditElement = document.getElementById(elementStr+"-start-date") as HTMLInputElement;
        const eDateEditElement = document.getElementById(elementStr+"-end-date") as HTMLInputElement;
        let data = {
            name: nameEditElement.value,
            degress: degressEditElement.value,
            startDate: sDateEditElement.value,
            endDate: eDateEditElement.value
        };
        const requestOptionsPost = {
            method: "PUT",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        fetch(`${apiUrl}/education/edit/${elementStr}`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res._id) {
                    toggleEdit(elementStr);
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
                    <div className="education-show">
                        {educations.map((item: educationInterface,index) =>(
                        <div className="edu-item-box" key={index} id={item._id}>
                            <div className="display-edu">
                                <div className="location-group">
                                    <h2>location</h2>
                                    <p>{item.name}</p>
                                </div>
                                <div className="degress-group">
                                    <h2>degress</h2>
                                    <p>{item.degress}</p>
                                </div>
                                <div className="date-group">
                                    <div className="start-date">
                                        <h2>start Date</h2>
                                        <p>{String(item.startDate).slice(0,7)}</p>
                                    </div>
                                    <div className="end-date">
                                        <h2>end Date</h2>
                                        <p>{String(item.endDate).slice(0,7)}</p>
                                    </div> 
                                </div>
                                <div className="display-btn-group">
                                    <button type="button" className="edit-edu-btn" onClick={()=>toggleEdit(item._id)}>Edit</button>
                                    <button type="button" className="delete-btn" onClick={()=>deleteEducation(item._id)}><FaTrashAlt/></button>
                                </div>
                            </div>
                            <form className="edu-edit-form" id={item._id+"-edit-form"}>
                                <div className="location-edit-group">
                                    <h2>location</h2>
                                    <textarea rows={2} cols={50} className="edit-box" id={item._id+"-name"} defaultValue={item.name} />
                                </div>
                                <div className="degress-edit-group">
                                    <h2>degress</h2>
                                    <input type="text" className="edit-box" id={item._id+"-degress"} defaultValue={item.degress}/>
                                </div>
                                <div className="start-date-edit-group">
                                    <h2>start Date</h2>
                                    <input type="month" className="edit-box" id={item._id+"-start-date"} defaultValue={String(item.startDate).slice(0,7)}/>
                                </div>
                                <div className="end-date-edit-group">
                                    <h2>end Date</h2>
                                    <input type="month" className="edit-box" id={item._id+"-end-date"} defaultValue={String(item.endDate).slice(0,7)}/>
                                </div>
                                <div className="edit-btn-group">
                                    <button type="button" className="update-btn" onClick={()=>checkVarEdit(item._id)}>Update</button>
                                    <button type="button" className="cancel-btn" onClick={()=>toggleEdit(item._id)}>Cancel</button>
                                </div>
                            </form>
                        </div>))}
                    </div>
                    <div className="education-input" id="education-input">
                        <h1>IT'S MAXIMUM EDUCATION!</h1>
                        <form className="education-form" id="education-form" onSubmit={submitFormEducation}>
                            <h2>Add Education</h2>
                            <div className="box-input">
                                <p>School / University</p>
                                <input type="text" className="info-input" id="name" onChange={handleInputChange} placeholder="school or university..." />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>degress</p>
                                <input type="text" className="info-input" id="degress" onChange={handleInputChange} placeholder="degress..." />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>start date</p>
                                <input type="month" className="info-input" id="startDate" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>end date</p>
                                <input type="month" className="info-input" id="endDate" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <button type="submit" className="edu-submit-btn">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default Education;