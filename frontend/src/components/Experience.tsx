import InfoNavBar from "./InfoNavBar";
import { useEffect, useState } from "react";
import { exprienceInterface } from "../models/IExprience";
import { FaTrashAlt } from "react-icons/fa";
import "../css/exp.css";

function Experience() {
  const [token, setToken] = useState<string>("");
  const [myInfoId, setInfoID] = useState<string>("");
  const [experiences, setExperiences] = useState<exprienceInterface[]>([]);
  const [experience, setExperience] = useState<Partial<exprienceInterface>>({});

  const apiUrl = "http://localhost:4200";

  const expFormInput = document.getElementById("exp-input") as HTMLDivElement;

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
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/exprience/${myInfoId}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          console.log(res.length);
          maxExp(res.length);
          setExperiences(res);
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
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/exprience/deleteOne/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          getExpriences();
          alertSnack("deleted exprience successfully", "show");
        } else {
          alertSnack("deleted exprience failed", "show error");
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
    console.log(JSON.stringify(data));
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
          getExpriences();
          alertSnack("added exprience successfully", "show");
        } else {
          alertSnack("added exprience failed", "show error");
        }
      });
  }

  const submitFormExp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const locationInput = document.getElementById(
      "location"
    ) as HTMLInputElement;
    const detailInput = document.getElementById("detail") as HTMLInputElement;
    const positionInput = document.getElementById(
      "position"
    ) as HTMLInputElement;
    const startDateInput = document.getElementById(
      "startDate"
    ) as HTMLInputElement;
    const endDateInput = document.getElementById("endDate") as HTMLInputElement;

    let input1 = errorBlankEditCheck(locationInput, "please input location");
    let input2 = errorBlankEditCheck(detailInput, "please input detail");
    let input3 = errorBlankEditCheck(positionInput, "please input position");
    let input4 = errorBlankEditCheck(startDateInput, "please choose date");
    let input5 = errorBlankEditCheck(endDateInput, "please choose date");
    if (input1 || input2 || input3 || input4 || input5) return;
    submitExprience();
    const expform = document.getElementById("exp-form") as HTMLFormElement;
    expform.reset();
  };

  const maxExp = (num: number) => {
    const showNothing = document.getElementById(
      "nothing-item"
    ) as HTMLDivElement;
    if (num >= 7) {
      expFormInput.className = "exp-input max";
      showNothing.className = "show-nothing have-item";
    } else if (num == 0) {
      showNothing.className = "show-nothing";
    } else {
      expFormInput.className = "exp-input";
      showNothing.className = "show-nothing have-item";
    }
  };

  const textError = (
    element: HTMLInputElement | HTMLTextAreaElement,
    message: string
  ) => {
    const parentElement = element.parentElement as HTMLDivElement;
    parentElement.className = "box-input error";
    const small = parentElement.querySelector("small") as HTMLSpanElement;
    small.innerText = message;
  };

  const textcorrect = (element: HTMLInputElement | HTMLTextAreaElement) => {
    const parentElement = element.parentElement as HTMLDivElement;
    parentElement.className = "box-input";
  };

  const toggleEdit = (elementStr: string) => {
    const expElement = document.getElementById(elementStr) as HTMLDivElement;
    expElement.classList.toggle("active");
  };

  const errorBlankEditCheck = (
    element: HTMLInputElement | HTMLTextAreaElement,
    errorTxt: string
  ) => {
    if (element.value.trim() === "") {
      textError(element, errorTxt);
      return true;
    }
    textcorrect(element);
    return false;
  };

  const checkVarEdit = (elementStr: string) => {
    const locationEditElement = document.getElementById(
      elementStr + "-location"
    ) as HTMLTextAreaElement;
    const positionEditElement = document.getElementById(
      elementStr + "-position"
    ) as HTMLInputElement;
    const detailEditElement = document.getElementById(
      elementStr + "-detail"
    ) as HTMLInputElement;
    const sDateEditElement = document.getElementById(
      elementStr + "-start-date"
    ) as HTMLInputElement;
    const eDateEditElement = document.getElementById(
      elementStr + "-end-date"
    ) as HTMLInputElement;
    let input1 = errorBlankEditCheck(
      locationEditElement,
      "please input location"
    );
    let input2 = errorBlankEditCheck(
      positionEditElement,
      "please input detail"
    );
    let input3 = errorBlankEditCheck(
      detailEditElement,
      "please input position"
    );
    let input4 = errorBlankEditCheck(sDateEditElement, "please choose date");
    let input5 = errorBlankEditCheck(eDateEditElement, "please choose date");
    if (input1 || input2 || input3 || input4 || input5) return;
    let data = {
      location: locationEditElement.value,
      position: positionEditElement.value,
      detail: detailEditElement.value,
      startDate: sDateEditElement.value,
      endDate: eDateEditElement.value,
    };
    const requestOptionsPost = {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/exprience/edit/${elementStr}`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res._id) {
          toggleEdit(elementStr);
          getExpriences();
          alertSnack("update successfully", "show");
        } else {
          alertSnack("update failed", "show error");
        }
      });
  };

  const alertSnack = (txt: string, status: string) => {
    const snackAlert = document.getElementById("snack-bar") as HTMLDivElement;
    const textAlert = document.getElementById("text-alart") as HTMLDivElement;
    textAlert.innerText = txt;
    snackAlert.className = "snack-bar-submit " + status;
    setTimeout(function () {
      snackAlert.className = "snack-bar-submit";
    }, 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myInfoID = localStorage.getItem("Info_id");
    if (myInfoID) setInfoID(myInfoID);
    if (token) setToken(token);
    else window.location.href = "/";
    if (myInfoId) {
      getExpriences();
    }
  }, [myInfoId]);
  return (
    <div>
      <InfoNavBar></InfoNavBar>
      <div className="exp-container">
        <h1>Exprience</h1>
        <div className="exp-box">
          <div className="exp-show">
            <div className="show-nothing" id="nothing-item">
              <h1>Add Your Experience... </h1>
            </div>
            {experiences.map((item: exprienceInterface, index) => (
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
                      <p>{String(item.startDate).slice(0, 7)}</p>
                    </div>
                    <div className="end-date">
                      <h2>end Date</h2>
                      <p>{String(item.endDate).slice(0, 7)}</p>
                    </div>
                  </div>
                  <div className="display-btn-group">
                    <button
                      type="button"
                      className="edit-exp-btn"
                      onClick={() => toggleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteExprience(item._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <div className="exp-edit-form" id={item._id + "-edit-form"}>
                  <div className="location-edit-group">
                    <h2>location</h2>
                    <textarea
                      rows={2}
                      cols={50}
                      className="edit-box"
                      id={item._id + "-location"}
                      defaultValue={item.location}
                    />
                    <small className="error-text">something error</small>
                  </div>
                  <div className="position-edit-group">
                    <h2>position</h2>
                    <input
                      type="text"
                      className="edit-box"
                      id={item._id + "-position"}
                      defaultValue={item.position}
                    />
                    <small className="error-text">something error</small>
                  </div>
                  <div className="detail-edit-group">
                    <h2>detail</h2>
                    <textarea
                      rows={3}
                      cols={50}
                      className="edit-box"
                      id={item._id + "-detail"}
                      defaultValue={item.detail}
                    />
                    <small className="error-text">something error</small>
                  </div>
                  <div className="start-date-edit-group">
                    <h2>start Date</h2>
                    <input
                      type="month"
                      className="edit-box"
                      id={item._id + "-start-date"}
                      defaultValue={String(item.startDate).slice(0, 7)}
                    />
                    <small className="error-text">something error</small>
                  </div>
                  <div className="end-date-edit-group">
                    <h2>end Date</h2>
                    <input
                      type="month"
                      className="edit-box"
                      id={item._id + "-end-date"}
                      defaultValue={String(item.endDate).slice(0, 7)}
                    />
                    <small className="error-text">something error</small>
                  </div>
                  <div className="edit-btn-group">
                    <button
                      type="button"
                      className="update-btn"
                      onClick={() => checkVarEdit(item._id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => toggleEdit(item._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="exp-input" id="exp-input">
            <h1>IT'S MAXIMUM EXPIRENCE!</h1>
            <form className="exp-form" id="exp-form" onSubmit={submitFormExp}>
              <h2>Add Exprience</h2>
              <small>(maximum 7)</small>
              <div className="box-input">
                <p>location/ company</p>
                <textarea
                  rows={2}
                  cols={50}
                  className="info-input"
                  id="location"
                  onChange={handleInputChange}
                  placeholder="location or company..."
                />
                <small>something error</small>
              </div>
              <div className="box-input">
                <p>position</p>
                <input
                  type="text"
                  className="info-input"
                  id="position"
                  onChange={handleInputChange}
                  placeholder="your position..."
                />
                <small>something error</small>
              </div>
              <div className="box-input">
                <p>detail</p>
                <textarea
                  rows={2}
                  cols={50}
                  className="info-input"
                  id="detail"
                  onChange={handleInputChange}
                  placeholder="something detail..."
                />
                <small>something error</small>
              </div>
              <div className="box-input">
                <p>start date</p>
                <input
                  type="month"
                  className="info-input"
                  id="startDate"
                  onChange={handleInputChange}
                />
                <small>something error</small>
              </div>
              <div className="box-input">
                <p>end date</p>
                <input
                  type="month"
                  className="info-input"
                  id="endDate"
                  onChange={handleInputChange}
                />
                <small>something error</small>
              </div>
              <button type="submit" className="exp-submit-btn">
                add
              </button>
            </form>
          </div>
        </div>
        <div className="snack-bar-submit" id="snack-bar">
          <p className="alart-text-snack" id="text-alart">
            something text!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
