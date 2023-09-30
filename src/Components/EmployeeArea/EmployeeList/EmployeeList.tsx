import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EmployeeModel from '../../../Models/EmployeeModel';
import employeesServices from '../../../Service/EmployeesServices';
import './EmployeeList.css';

function EmployeeList(): JSX.Element {
  const [beEmployees, setBeEmployees] = useState<EmployeeModel[]>();
  const [isDeleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    const id = toast.loading('Please wait...'); //add themes and move to service

    employeesServices
      .getAllEmployees()
      .then((data) => {
        setBeEmployees(data);
        toast.dismiss(id);
      })
      .catch((err) =>
        toast.update(id, {
          type: 'error',
          render: err.message,
          position: 'top-center',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      );
  }, [isDeleted]);

  async function deleteEmployee(id: number) {
    try {
      console.log('asdasd');
      await employeesServices.deleteEmployee(id);

      isDeleted ? setDeleted(false) : setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, m: 5 }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beEmployees?.map((feEmployee) => (
              <TableRow key={feEmployee.id}>
                <TableCell align="left">
                  {feEmployee.firstName + ' ' + feEmployee.lastName}
                </TableCell>
                <TableCell align="left">{feEmployee.title}</TableCell>
                <TableCell align="left">
                  <img src={`${feEmployee.imageUrl}`} height="100px" />
                </TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button onClick={() => deleteEmployee(feEmployee.id)}>
                      Edit
                    </Button>
                    <Button>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default EmployeeList;
