import axios from 'axios';
import EmployeeModel from '../Models/EmployeeModel';
import appConfig from '../Utils/AppConfig';
import {
  EmployeeActionTypes,
  EmployeeActions,
  employeeStore,
} from '../Redux/EmployeeState';

class EmployeesServices {
  public async getAllEmployees(): Promise<EmployeeModel[]> {
    let employees = employeeStore.getState().employees;
    if (employees.length === 0) {
      const response = await axios.get(appConfig.employeesUrl);
      employees = response.data;

      const action: EmployeeActions = {
        type: EmployeeActionTypes.setEmployees,
        payload: employees,
      };
      employeeStore.dispatch(action);
    }
    return employees;
  }

  public async deleteEmployee(id: number): Promise<EmployeeModel> {
    const response = await axios.delete(appConfig.employeesUrl + id);
    const employees = response.data;
    return employees;
  }
}
const employeesServices = new EmployeesServices();
export default employeesServices;
