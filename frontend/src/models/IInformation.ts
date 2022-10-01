import { skillInterface } from "./ISkill";
import { exprienceInterface } from "./IExprience";
import { educationInterface } from "./IEducation";
import { activityInterface } from "./IActivity";

export interface informationInterface {
    _id: string,
    owner : string,
    format: number,
    firstName: string,
    lastName: string,
    position: string,
    age: number,
    birthDay: string,
    email: string,
    tel: string,
    facebook: string,
    linkedin: string,
    address: string,
    hobby: Array<string>,
    interest: Array<string>,
    generalskills: Array<skillInterface>,
    technicalskills: Array<skillInterface>,
    languages: Array<skillInterface>,
    experiences: Array<exprienceInterface>,
    educations: Array<educationInterface>,
    activities: Array<activityInterface>
}