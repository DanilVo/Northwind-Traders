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
    const action: EmployeeActions = {
      type: EmployeeActionTypes.deleteEmployee,
      payload: id,
    };
    employeeStore.dispatch(action);
    return employees;
  }

  public async getOneEmployee(id: number): Promise<EmployeeModel> {
    const { data } = await axios.get(appConfig.employeesUrl + id);
    return data;
  }
  public async addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    const options = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const response = await axios.post(
      appConfig.employeesUrl,
      employee,
      options
    );
    const { data } = response;

    const action: EmployeeActions = {
      type: EmployeeActionTypes.addEmployee,
      payload: data,
    };
    employeeStore.dispatch(action);

    return data;
  }
  public async editEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    const options = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    console.log(employee);

    const response = await axios.put(
      appConfig.employeesUrl + employee.id,
      employee,
      options
    );
    const employees = response.data;

    const action: EmployeeActions = {
      type: EmployeeActionTypes.editEmployee,
      payload: employees,
    };
    employeeStore.dispatch(action);

    return employees;
  }
}
const employeesServices = new EmployeesServices();
export default employeesServices;
