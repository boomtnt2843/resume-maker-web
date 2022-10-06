import InfoNavBar from "./InfoNavBar";
import { useEffect,useState } from "react";
import { FaTrashAlt } from "react-icons/fa"
import { activityInterface } from "../models/IActivity";

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
                  console.log(res.length);
                  setActivities(res)
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
                } else {
                  console.log("else");
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
                    console.log(res);
                    getActivities();
                } else {
                    console.log("error");
                }
            });
      }

    const submitFormAct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitActivity();
        const activityform = document.getElementById("activity-form") as HTMLFormElement;
        activityform.reset();
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
                    <table className="activity-table">
                        <thead>
                            <tr>
                                <th>Header</th>
                                <th>detail</th>
                                <th>start date</th>
                                <th>end date</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {activities.map((item: activityInterface,index) =>(
                            <tr key={index}>
                                <td>{item.nameHeader}</td>
                                <td>{item.detail}</td>
                                <td>{String(item.startDate).slice(0,7)}</td>
                                <td>{String(item.endDate)==="undefined" ? "-" : String(item.endDate).slice(0,7)}</td>
                                <td>
                                    <button onClick={()=>deleteActivity(item._id)}><FaTrashAlt/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="activity-input">
                        <h1>IT'S MAXIMUM ACTIVITY!</h1>
                        <form className="activity-form" id="activity-form"onSubmit={submitFormAct}>
                            <h2>Add Activity</h2>
                            <p>Header</p>
                            <input type="text" className="header-input" id="nameHeader" onChange={handleInputChange} />
                            <p>Detail</p>
                            <input type="text" className="detail-input" id="detail" onChange={handleInputChange} />
                            <p>Start date</p>
                            <input type="date" className="date-input" id="startDate" onChange={handleInputChange} />
                            <p>End date</p>
                            <input type="date" className="date-input" id="endDate" onChange={handleInputChange} />
                            <button type="submit">add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default Activity;