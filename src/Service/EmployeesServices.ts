import axios from "axios";
import EmployeeModel from "../Models/EmployeeModel";
import appConfig from "../Utils/AppConfig";

class EmployeesServices {
  public async getAllEmployees(): Promise<EmployeeModel[]> {
    const { data } = await axios.get(appConfig.employeesUrl);
    return data;
  }
}
const employeesServices = new EmployeesServices();
export default employeesServices;
