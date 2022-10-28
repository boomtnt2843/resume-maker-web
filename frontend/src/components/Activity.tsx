import InfoNavBar from "./InfoNavBar";
import { useEffect,useState } from "react";
import { FaTrashAlt } from "react-icons/fa"
import { activityInterface } from "../models/IActivity";
import '../css/activity.css'

function Activity() {
    const [token, setToken] = useState<string>("");
    const [myInfoId, setInfoID] = useState<string>("");
    const [activities, setActivities] = useState<activityInterface[]>([]);
    const [activity, setActivity] = useState<Partial<activityInterface>>({});

    const apiUrl = "http://localhost:4200";

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
          const id = event.target.id as keyof typeof activity;
          const { value } = event.target;
          setActivity({ ...activity, [id]: value });
          console.log(activity);
      };

    const getActivities = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/activity/${myInfoId}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                  console.log(res);
                  maxAct(res.length);
                  setActivities(res);
                } else {
                  console.log("else");
                }
            });
      };

      const deleteActivity = async (id: String) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/activity/deleteOne/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    getActivities();
                    alertSnack("deleted successfully","show")
                } else {
                    alertSnack("deleted failed","show error")
                }
            });
      };

      function submitActivity() {
        let data = {
          nameHeader : activity.nameHeader,
          detail: activity.detail,
          startDate: activity.startDate,
          endDate: activity.endDate,
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
        setActivity({});
        fetch(`${apiUrl}/activity/create`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    getActivities();
                    alertSnack("added successfully","show")
                } else {
                    alertSnack("added failed","show error")
                }
            });
    }

    const submitFormAct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errorInputCheck = false;
        const nameInput = document.getElementById('nameHeader') as HTMLInputElement;
        const detailInput = document.getElementById('detail') as HTMLInputElement;
        const startInput = document.getElementById('startDate') as HTMLInputElement;
        const endInput = document.getElementById('endDate') as HTMLInputElement;

        if(nameInput.value===""){
            textError(nameInput,"plase input header or topic");
            errorInputCheck = true;
        }else{
            textcorrect(nameInput)
        }
        if(detailInput.value===""){
            textError(detailInput,"plase input detail");
            errorInputCheck = true;
        }else{
            textcorrect(detailInput)
        }
        if(startInput.value===""){
            textError(startInput,"plase choose date");
            errorInputCheck = true;
        }else{
            textcorrect(startInput)
        }
        if(!errorInputCheck){
            submitActivity();
            const activityform = document.getElementById("activity-form") as HTMLFormElement;
            activityform.reset();
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
        const nameEditElement = document.getElementById((elementStr+"-nameHeader")) as HTMLTextAreaElement;
        const detailEditElement = document.getElementById(elementStr+"-detail") as HTMLInputElement;
        const sDateEditElement = document.getElementById(elementStr+"-start-date") as HTMLInputElement;
        const eDateEditElement = document.getElementById(elementStr+"-end-date") as HTMLInputElement;
        let data = {
            nameHeader: nameEditElement.value,
            detail: detailEditElement.value,
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
        fetch(`${apiUrl}/activity/edit/${elementStr}`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res._id) {
                    toggleEdit(elementStr);
                    getActivities();
                    alertSnack("update successfully","show")
                } else {
                    alertSnack("update failed","show error")
                }
                
            });
    }

    const alertSnack = (txt: string,status:string) =>{
        const snackAlert = document.getElementById("snack-bar") as HTMLDivElement;
        const textAlert = document.getElementById("text-alart") as HTMLDivElement;
        textAlert.innerText=txt;
        snackAlert.className = "snack-bar-submit "+status;
        setTimeout(function(){snackAlert.className="snack-bar-submit"},3000);
    }

    const maxAct = (num: number) => {
        const educationInput = document.getElementById('activity-input') as HTMLDivElement;
        if (num >= 10){
            educationInput.className="activity-input max"
        }else{
            educationInput.className="activity-input"
        }
      }

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const myInfoID = localStorage.getItem("Info_id")
        if(myInfoID) setInfoID(myInfoID);
        if(token) setToken(token);
        else window.location.href='/';
        if(myInfoId) {
            getActivities();
        }
    },[myInfoId])
    return (
        <div>
            <InfoNavBar></InfoNavBar>
            <div className="activity-container">
                <h1>Activity</h1>
                <div className="activity-box">
                <div className="activity-show">
                        {activities.map((item: activityInterface,index) =>(
                        <div className="act-item-box" key={index} id={item._id}>
                            <div className="display-act">
                                <div className="location-group">
                                    <h2>location</h2>
                                    <p>{item.nameHeader}</p>
                                </div>
                                <div className="degress-group">
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
                                        <p>{String(item.endDate)==="undefined" ? "-" : String(item.endDate).slice(0,7)}</p>
                                    </div> 
                                </div>
                                <div className="display-btn-group">
                                    <button type="button" className="edit-edu-btn" onClick={()=>toggleEdit(item._id)}>Edit</button>
                                    <button type="button" className="delete-btn" onClick={()=>deleteActivity(item._id)}><FaTrashAlt/></button>
                                </div>
                            </div>
                            <div className="act-edit-form" id={item._id+"-edit-form"}>
                                <div className="location-edit-group">
                                    <h2>location</h2>
                                    <input type="text" className="edit-box" id={item._id+"-nameHeader"} defaultValue={item.nameHeader} />
                                </div>
                                <div className="degress-edit-group">
                                    <h2>degress</h2>
                                    <textarea rows={2} cols={50} className="edit-box" id={item._id+"-detail"} defaultValue={item.detail}/>
                                </div>
                                <div className="start-date-edit-group">
                                    <h2>start Date</h2>
                                    <input type="month" className="edit-box" id={item._id+"-start-date"} defaultValue={String(item.startDate).slice(0,7)}/>
                                </div>
                                <div className="end-date-edit-group">
                                    <h2>end Date</h2>
                                    <input type="month" className="edit-box" id={item._id+"-end-date"} defaultValue={String(item.endDate) ==="undefined" ? "" : String(item.endDate).slice(0,7)}/>
                                </div>
                                <div className="edit-btn-group">
                                    <button type="button" className="update-btn" onClick={()=>checkVarEdit(item._id)}>Update</button>
                                    <button type="button" className="cancel-btn" onClick={()=>toggleEdit(item._id)}>Cancel</button>
                                </div>
                            </div>
                        </div>))}
                    </div>
                    <div className="activity-input" id="activity-input">
                        <h1>IT'S MAXIMUM ACTIVITY!</h1>
                        <form className="activity-form" id="activity-form"onSubmit={submitFormAct}>
                            <h2>Add Activity</h2>
                            <div className="box-input">
                                <p>Header</p>
                                <textarea rows={2} cols={50} className="info-input" id="nameHeader" onChange={handleInputChange} placeholder="Header or Topic..."/>
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>Detail</p>
                                <textarea rows={2} cols={50} className="info-input" id="detail" onChange={handleInputChange} placeholder="something detail..."/>
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>Start date</p>
                                <input type="month" className="info-input" id="startDate" onChange={handleInputChange} />
                                <small>something error</small>
                            </div>
                            <div className="box-input">
                                <p>End date</p>
                                <input type="month" className="info-input" id="endDate" onChange={handleInputChange} />
                            </div>
                            <button type="submit" className="act-submit-btn">add</button>
                        </form>
                    </div>
                </div>
                <div className="snack-bar-submit" id="snack-bar">
                    <p className="alart-text-snack" id="text-alart">something text!</p>
                </div>
            </div>
        </div>
    );
  }
  
export default Activity;