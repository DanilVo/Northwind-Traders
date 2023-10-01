import { createStore } from 'redux';
import EmployeeModel from '../Models/EmployeeModel';

export class EmployeeState {
  employees: EmployeeModel[] = [];
}

export enum EmployeeActionTypes {
  setEmployees = 'setEmployees',
  editEmployee = 'editEmployee',
  deleteEmployee = 'deleteEmployee',
  addEmployee = 'addEmployee',
}

export class EmployeeActions {
  type: EmployeeActionTypes;
  payload?: any;
}

function employeeReducer(
  currentState = new EmployeeState(),
  action: any
): EmployeeState {
  const newState = { ...currentState };

  switch (action.type) {
    case EmployeeActionTypes.setEmployees:
      newState.employees = action.payload;
      break;

    case EmployeeActionTypes.deleteEmployee:
      const indexToDelete = newState.employees.findIndex(
        (e) => e.id === action.payload
      );
      newState.employees.splice(indexToDelete, 1);
      break;

    case EmployeeActionTypes.editEmployee:
      const indexToReplace = newState.employees.findIndex(
        (e) => e.id === action.payload.id
      );
      newState.employees[indexToReplace] = action.payload;
      break;

    case EmployeeActionTypes.addEmployee:
      newState.employees.push(action.payload);
      break;
  }

  return newState;
}

export const employeeStore = createStore(employeeReducer);
