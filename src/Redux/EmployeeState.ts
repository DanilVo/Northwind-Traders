import { createStore } from 'redux';
import EmployeeModel from '../Models/EmployeeModel';
import { ProductsAction } from './ProductsState';

export class EmployeeState {
  employees: EmployeeModel[] = [];
}

export enum EmployeeActionTypes {
  setEmployees = 'setEmployees',
  editEmployee = 'editEmployee',
  deleteEmployee = 'deleteEmployee',
  updateEmployee = 'updateEmployee',
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
        (e) => e.id === action.payload.id
      );
      newState.employees.splice(indexToDelete, 1);
      break;
    case EmployeeActionTypes.editEmployee:
      break;
    case EmployeeActionTypes.updateEmployee:
      break;
  }
  return newState;
}

export const employeeStore = createStore(employeeReducer);
