import InfoNavBar from "./InfoNavBar";
import { useEffect,useState } from "react";
import { exprienceInterface } from "../models/IExprience";
import { FaTrashAlt } from "react-icons/fa";
import '../css/exp.css';

function Experience() {
    const [token, setToken] = useState<string>("");
    const [myInfoId, setInfoID] = useState<string>("");
    const [experiences, setExperiences] = useState<exprienceInterface[]>([]);
    const [experience, setExperience] = useState<Partial<exprienceInterface>>({});

    const apiUrl = "http://localhost:4200";

    const locationInput = document.getElementById('location') as HTMLInputElement;
    const detailInput = document.getElementById('detail') as HTMLInputElement;
    const positionInput = document.getElementById('position') as HTMLInputElement;
    const startDateInput = document.getElementById('startDate') as HTMLInputElement;
    const endDateInput = document.getElementById('endDate') as HTMLInputElement;
    const expFormInput = document.getElementById('exp-input') as HTMLDivElement;

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
                  
                  maxExp(res.length);
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

    const submitFormExp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errorInputCheck = false;

        if(locationInput.value===""){
            textError(locationInput,"plase input location");
            errorInputCheck = true;
        }else{
            textcorrect(locationInput)
        }
        if(detailInput.value===""){
            textError(detailInput,"plase input detail");
            errorInputCheck = true;
        }else{
            textcorrect(detailInput)
        }
        if(positionInput.value===""){
            textError(positionInput,"plase input position");
            errorInputCheck = true;
        }else{
            textcorrect(positionInput)
        }
        if(startDateInput.value===""){
            textError(startDateInput,"plase choose date");
            errorInputCheck = true;
        }else{
            textcorrect(startDateInput)
        }
        if(endDateInput.value===""){
            textError(endDateInput,"plase choose date");
            errorInputCheck = true;
        }else{
            textcorrect(endDateInput)
        }

        if(!errorInputCheck){
            submitExprience();
            const expform = document.getElementById("exp-form") as HTMLFormElement;
            expform.reset();
        }
    }

    const maxExp = (num: number) => {
        if (num >= 7){
            expFormInput.className="exp-input max"
        }else{
            expFormInput.className="exp-input"
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
        const expElement = document.getElementById(elementStr) as HTMLDivElement;
        expElement.classList.toggle('active');
    }

    const checkVarEdit = (elementStr : string) =>{
        
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
                    <div className="exp-show">
                    {experiences.map((item: exprienceInterface,index) =>(
                        <div className="exp-item-box" key={index} id={item._id}>
                            <div className="display-exp">
                                <div className="location-group">
                                    <h2>location</h2>
                                    <p>{item.location}</p>
                                </div>
                                <div className="position-group">
                                    <h2>position</h2>
                                    <p>{item.position}</p>
                                </div>
                                <div className="detail-group">
                                    <h2>detail</h2>
                                    <p>{item.detail}</p>
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
                                    <button type="button" className="edit-exp-btn" onClick={()=>toggleEdit(item._id)}>Edit</button>
                                    <button type="button" className="delete-btn" onClick={()=>deleteExprience(item._id)}><FaTrashAlt/></button>
                                </div>
                            </div>
                            <div className="exp-edit-form" id={item._id+"-edit-form"}>
                                <div className="location-edit-group">
                                    <h2>location</h2>
                                    <textarea rows={2} cols={50} className="edit-box" id={item._id+"-location"} defaultValue={item.location} />
                                </div>
                                <div className="position-edit-group">
                                    <h2>position</h2>
                                    <input type="text" className="edit-box" id={item._id+"-position"} defaultValue={item.position}/>
                                </div>
                                <div className="detail-edit-group">
                                    <h2>detail</h2>
                                    <textarea rows={2} cols={50} className="edit-box" id={item._id+"-detail"} defaultValue={item.detail}/>
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
                            </div>
                        </div>))}
                    </div>
                    <div className="exp-input" id='exp-input'>
                        <h1>IT'S MAXIMUM EXPIRENCE!</h1>
                        <form className="exp-form" id="exp-form" onSubmit={submitFormExp}>
                            <h2>Add Exprience</h2>
                            <div className="box-input">
                                <p>location</p>
                                <input type="text" className="location-input" id="location" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>position</p>
                                <input type="text" className="position-input" id="position" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>detail</p>
                                <input type="text" className="detail-input" id="detail" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>start date</p>
                                <input type="month" className="date-input" id="startDate" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>end date</p>
                                <input type="month" className="date-input" id="endDate" onChange={handleInputChange} />
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
  
export default Experience;