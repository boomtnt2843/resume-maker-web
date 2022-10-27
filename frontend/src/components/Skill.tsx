import InfoNavBar from "./InfoNavBar";
import { useEffect, useState } from "react";
import { skillInterface } from "../models/ISkill";
import { FaTrashAlt } from "react-icons/fa";
import '../css/skill.css'

function Skill() {
  const [token, setToken] = useState<string>("");
  const [myInfoId, setInfoID] = useState<string>("");
  const [generalSkills, setGenerals] = useState<skillInterface[]>([]);
  const [generalSkill, setGeneral] = useState<Partial<skillInterface>>({});
  const [technicalSkills, setTechnicals] = useState<skillInterface[]>([]);
  const [technicalSkill, setTechnical] = useState<Partial<skillInterface>>({});
  const [languages, setLanguages] = useState<skillInterface[]>([]);
  const [language, setlanguage] = useState<Partial<skillInterface>>({});

  const apiUrl = "http://localhost:4200";

  const nameGeneralHead = document.getElementById('general-name-input') as HTMLDivElement;
  const nameGeneralInput = nameGeneralHead?.querySelector('input') as HTMLInputElement;
  const nameTechnicalHead = document.getElementById('technical-name-input') as HTMLDivElement;
  const nameTechnicalInput = nameTechnicalHead?.querySelector('input') as HTMLInputElement;
  const nameLanguageHead = document.getElementById('language-name-input') as HTMLDivElement;
  const nameLanguageInput = nameLanguageHead?.querySelector('input') as HTMLInputElement;

  const convertType = (data: string | number | Number | undefined ) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //general skill function
  const getGeneralSkills = async () => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    fetch(`${apiUrl}/general/${myInfoId}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              maxItem("general-input",res.length,10);
              setGenerals(res)
            } else {
              console.log("else");
            }
        });
  };

  const handleInputChangeGeneral = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
      const id = event.target.id as keyof typeof generalSkill;
      const { value } = event.target;
      setGeneral({ ...generalSkill, [id]: value });
  };

  function submitGeneralSkill() {
    let data = {
      nameSkill: generalSkill.name,
      power: convertType(generalSkill.power),
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
    setGeneral({});
    fetch(`${apiUrl}/general/create`, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              getGeneralSkills();
              alertSnack("added successfully","show")
            } else {
              alertSnack("added failed","show error")
            }
        });
}
  
  const deleteGeneralSkill = async (id: String) => {
    const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
    };
    fetch(`${apiUrl}/general/deleteOne/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              getGeneralSkills();
              alertSnack("deleted successfully","show")
            } else {
              alertSnack("deleted failed","show error")
            }
        });
  };

  const submitFormGenearl = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errorInputCheck = false;
    if(nameGeneralInput.value===""){
      textError(nameGeneralInput,"plase input general skill");
      errorInputCheck = true;
    }else{
      textcorrect(nameGeneralInput);
    }

    if(!errorInputCheck){
      submitGeneralSkill();
      const generalform = document.getElementById("general-form") as HTMLFormElement;
      generalform.reset();
    }
  }

  //technical skill function
  const getTechnicalSkills = async () => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    fetch(`${apiUrl}/technical/${myInfoId}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              maxItem("technical-input",res.length,10);
              setTechnicals(res)
            } else {
              console.log("else");
            }
        });
  };

  const handleInputChangeTechnical = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
      const id = event.target.id as keyof typeof technicalSkill;
      const { value } = event.target;
      setTechnical({ ...technicalSkill, [id]: value });
  };

  function submitTechnicalSkill() {
    let data = {
      nameSkill: technicalSkill.name,
      power: convertType(technicalSkill.power),
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
    setTechnical({});
    fetch(`${apiUrl}/technical/create`, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              getTechnicalSkills();
              alertSnack("added successfully","show")
            } else {
              alertSnack("added failed","show error")
            }
        });
  }
  
  const deleteTechnicalSkill = async (id: String) => {
    const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
    };
    fetch(`${apiUrl}/technical/deleteOne/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              getTechnicalSkills();
              alertSnack("deleted successfully","show")
            } else {
              alertSnack("deleted failed","show error")
            }
        });
  };

  const submitFormTechnical = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errorInputCheck = false;
    if(nameTechnicalInput.value===""){
      textError(nameTechnicalInput,"plase input Technical skill");
      errorInputCheck = true;
    }else{
      textcorrect(nameTechnicalInput)
    }

    if(!errorInputCheck){
      submitTechnicalSkill();
      const technicalform = document.getElementById("technical-form") as HTMLFormElement;
      technicalform.reset();
    }
  }

  //language function
  const getLanguages = async () => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    fetch(`${apiUrl}/language/${myInfoId}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              maxItem("language-input",res.length,3);
              setLanguages(res);
            } else {
              console.log("else");
            }
        });
  };

  const handleInputChangeLanguage = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
      const id = event.target.id as keyof typeof language;
      const { value } = event.target;
      setlanguage({ ...language, [id]: value });
  };

  function submitLanguage() {
    let data = {
      name: language.name,
      power: convertType(language.power),
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
    setlanguage({});
    fetch(`${apiUrl}/language/create`, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              getLanguages();
              alertSnack("added successfully","show")
            } else {
              alertSnack("added failed","show error")
            }
        });
  }
  
  const deleteLanguage = async (id: String) => {
    const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
    };
    fetch(`${apiUrl}/language/deleteOne/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
              getLanguages();
              alertSnack("deleted successfully","show")
            } else {
              alertSnack("deleted failed","show error")
            }
        }); 
  };

  const submitFormLanguage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errorInputCheck = false;
    if(nameLanguageInput.value===""){
      textError(nameLanguageInput,"plase input language");
      errorInputCheck = true;
    }else{
      textcorrect(nameLanguageInput);
    }

    if(!errorInputCheck){
      submitLanguage();
      const languageform = document.getElementById("language-form") as HTMLFormElement;
      languageform.reset();
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

  const maxItem = (nameclass: string,num: number,max: number) => {
    const element = document.getElementById(nameclass) as HTMLFormElement;
    if (num >= max){
        element.className = nameclass+" max";
    }else{
        element.className = nameclass;
    }
  }

  const alertSnack = (txt: string,status:string) =>{
    const snackAlert = document.getElementById("snack-bar") as HTMLDivElement;
    const textAlert = document.getElementById("text-alart") as HTMLDivElement;
    textAlert.innerText=txt;
    snackAlert.className = "snack-bar-submit "+status;
    setTimeout(function(){snackAlert.className="snack-bar-submit"},3000);
}

  useEffect(()=>{
    const token = localStorage.getItem("token")
    const myInfoID = localStorage.getItem("Info_id")
    if(myInfoID) setInfoID(myInfoID);
    if(token) setToken(token);
    else window.location.href='/';
    if(myInfoId){ 
      getGeneralSkills();
      getTechnicalSkills();
      getLanguages();
    }
  },[myInfoId])

    return (
      <div id="general">
        <InfoNavBar></InfoNavBar>
        <div className="skill-menu" >
          <a href="#general" className="skill-wrap">general skill</a>
          <a href="#technical" className="skill-wrap">technical skill</a>
          <a href="#language" className="skill-wrap">language</a>
        </div>
        <div className="skill-container" >
          <div className="general-skill-container" >
            <div className="general-box">
              <h1>General Skill</h1>
              <table className="general-table">
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Power</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {generalSkills.map((item: skillInterface,index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{String(item.power)}</td>
                    <td>
                      <button onClick={()=>deleteGeneralSkill(item._id)}><FaTrashAlt/></button>
                    </td>
                  </tr>             
                ))}
                </tbody>
              </table>
            </div>
            <div className="general-input" id='general-input'>
              <h1>IT'S MAXIMUM GENERAL SKILLS!</h1>
              <form className="general-form" id="general-form" onSubmit={submitFormGenearl}>
                <h1>Add General Skill</h1>
                <div className="box-input" id='general-name-input'>
                  <p>Skill</p>
                  <input type="text" className="info-input" id="name" onChange={handleInputChangeGeneral} placeholder="your skill..."/>
                  <small>something error</small>
                </div>
                <p>Power</p>
                <input type="range" className="slide-power-input" id="power" min={0} max={5} defaultValue={3} onChange={handleInputChangeGeneral} />
                <button type="submit">add</button>
              </form>
            </div>
          </div>
          <div className="technical-skill-container" id="technical">
            <div className="technical-box">
              <h1>Technical Skill</h1>
              <table className="technical-table">
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Power</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {technicalSkills.map((item: skillInterface,index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{String(item.power)}</td>
                    <td>
                      <button onClick={()=>deleteTechnicalSkill(item._id)}><FaTrashAlt/></button>
                    </td>
                  </tr>             
                ))}
                </tbody>
              </table>
            </div>
            <div className="technical-input" id='technical-input'>
              <h1>IT'S MAXIMUM TECHNICAL SKILLS!</h1>
              <form className="technical-form" id="technical-form" onSubmit={submitFormTechnical}>
                <h1>Add Technical Skill</h1>
                <div className="box-input" id='technical-name-input'>
                  <p>Skill</p>
                  <input type="text" className="info-input" id="name" onChange={handleInputChangeTechnical} placeholder="your skill..."/>
                  <small>something error</small>
                </div>
                <p>Power</p>
                <input type="range" className="slide-power-input" id="power" min={0} max={5} defaultValue={3} onChange={handleInputChangeTechnical} />
                <button type="submit">add</button>
              </form>
            </div>
          </div>
          <div className="language-container" id="language">
            <div className="language-box">
              <h1>Language Skill</h1>
              <table className="language-table">
                <thead>
                  <tr>
                    <th>language</th>
                    <th>Power</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {languages.map((item: skillInterface,index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{String(item.power)}</td>
                    <td>
                      <button onClick={()=>deleteLanguage(item._id)}><FaTrashAlt/></button>
                    </td>
                  </tr>             
                ))}
                </tbody>
              </table>
            </div>
            <div className="language-input" id='language-input'>
              <h1>IT'S MAXIMUM LANGUAGES!</h1>
              <form className="language-form" id="language-form" onSubmit={submitFormLanguage}>
                <h1>Add Language</h1>
                <div className="box-input" id='language-name-input'>
                  <p>Language</p>
                  <input type="text" className="info-input" id="name" onChange={handleInputChangeLanguage} placeholder="language..."/>
                  <small>something error</small>
                </div>
                <p>Power</p>
                <input type="range" className="slide-power-input" id="power" min={0} max={5} defaultValue={3} onChange={handleInputChangeLanguage} />
                <button type="submit">add</button>
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
  
export default Skill;