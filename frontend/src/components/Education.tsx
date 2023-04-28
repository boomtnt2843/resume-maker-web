import InfoNavBar from "./InfoNavBar";
import { useEffect, useState } from "react";
import { educationInterface } from "../models/IEducation";
import { FaTrashAlt } from "react-icons/fa";
import "../css/education.css";

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
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/education/${myInfoId}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          console.log(res.length);
          maxEdu(res.length);
          setEducations(res);
        } else {
          console.log("else");
        }
      });
  };

  const maxEdu = (num: number) => {
    const educationInput = document.getElementById(
      "education-input"
    ) as HTMLDivElement;
    const showNothing = document.getElementById(
      "nothing-item"
    ) as HTMLDivElement;
    if (num >= 5) {
      educationInput.className = "education-input max";
      showNothing.className = "show-nothing have-item";
    } else if (num == 0) {
      showNothing.className = "show-nothing";
    } else {
      educationInput.className = "education-input";
      showNothing.className = "show-nothing have-item";
    }
  };

  const deleteEducation = async (id: String) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/education/deleteOne/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          getEducations();
          alertSnack("daleted successfully", "show");
        } else {
          alertSnack("daleted failed", "show error");
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
    console.log(JSON.stringify(data));
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
          alertSnack("added successfully", "show");
        } else {
          alertSnack("added failed", "show error");
        }
      });
  }

  const submitFormEducation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const degressInput = document.getElementById("degress") as HTMLInputElement;
    const startInput = document.getElementById("startDate") as HTMLInputElement;
    const endInput = document.getElementById("endDate") as HTMLInputElement;
    let input1 = errorBlankEditCheck(
      nameInput,
      "please input name of school/university"
    );
    let input2 = errorBlankEditCheck(degressInput, "please input degress");
    let input3 = errorBlankEditCheck(startInput, "please choose date");
    let input4 = errorBlankEditCheck(endInput, "please choose date");
    if (input1 || input2 || input3 || input4) return;
    submitEducation();
    const educationform = document.getElementById(
      "education-form"
    ) as HTMLFormElement;
    educationform.reset();
  };

  const textError = (
    element: HTMLInputElement | HTMLTextAreaElement,
    message: string
  ) => {
    const parentElement = element.parentElement as HTMLDivElement;
    parentElement.classList.add("error");
    const small = parentElement.querySelector("small") as HTMLSpanElement;
    small.innerText = message;
  };

  const textcorrect = (element: HTMLInputElement | HTMLTextAreaElement) => {
    const parentElement = element.parentElement as HTMLDivElement;
    parentElement.classList.remove("error");
  };

  const toggleEdit = (elementStr: string) => {
    const eduElement = document.getElementById(elementStr) as HTMLDivElement;
    eduElement.classList.toggle("active");
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
    const nameEditElement = document.getElementById(
      elementStr + "-name"
    ) as HTMLTextAreaElement;
    const degressEditElement = document.getElementById(
      elementStr + "-degress"
    ) as HTMLInputElement;
    const sDateEditElement = document.getElementById(
      elementStr + "-start-date"
    ) as HTMLInputElement;
    const eDateEditElement = document.getElementById(
      elementStr + "-end-date"
    ) as HTMLInputElement;
    let input1 = errorBlankEditCheck(
      nameEditElement,
      "please input name of school/university"
    );
    let input2 = errorBlankEditCheck(
      degressEditElement,
      "please input degress"
    );
    let input3 = errorBlankEditCheck(sDateEditElement, "please choose date");
    let input4 = errorBlankEditCheck(eDateEditElement, "please choose date");
    if (input1 || input2 || input3 || input4) return;
    let data = {
      name: nameEditElement.value,
      degress: degressEditElement.value,
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
    fetch(`${apiUrl}/education/edit/${elementStr}`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res._id) {
          toggleEdit(elementStr);
          getEducations();
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
      getEducations();
    }
  }, [myInfoId]);
  return (
    <div>
      <InfoNavBar></InfoNavBar>
      <div className="education-container">
        <h1>Education</h1>
        <div className="education-box">
          <div className="education-show">
            <div className="show-nothing" id="nothing-item">
              <h3>Add Your School or University... </h3>
            </div>
            {educations.map((item: educationInterface, index) => (
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
                      className="edit-edu-btn"
                      onClick={() => toggleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteEducation(item._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <div className="edu-edit-form" id={item._id + "-edit-form"}>
                  <div className="location-edit-group">
                    <h2>location</h2>
                    <textarea
                      rows={2}
                      cols={50}
                      className="edit-box"
                      id={item._id + "-name"}
                      defaultValue={item.name}
                    />
                    <small className="error-text">something error</small>
                  </div>
                  <div className="degress-edit-group">
                    <h2>degress</h2>
                    <input
                      type="text"
                      className="edit-box"
                      id={item._id + "-degress"}
                      defaultValue={item.degress}
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
          <div className="education-input" id="education-input">
            <h1>IT'S MAXIMUM EDUCATION!</h1>
            <form
              className="education-form"
              id="education-form"
              onSubmit={submitFormEducation}
            >
              <h2>Add Education</h2>
              <small>(maximum 5)</small>
              <div className="box-input">
                <p>School / University</p>
                <input
                  type="text"
                  className="info-input"
                  id="name"
                  onChange={handleInputChange}
                  placeholder="school or university..."
                />
                <small>something error</small>
              </div>
              <div className="box-input">
                <p>degress</p>
                <input
                  type="text"
                  className="info-input"
                  id="degress"
                  onChange={handleInputChange}
                  placeholder="degress..."
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
              <button type="submit" className="edu-submit-btn">
                Add
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

export default Education;
