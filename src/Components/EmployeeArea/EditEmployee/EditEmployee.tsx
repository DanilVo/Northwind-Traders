import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './EditEmployee.css';
import { useForm } from 'react-hook-form';
import EmployeeModel from '../../../Models/EmployeeModel';
import { useEffect } from 'react';
import employeesServices from '../../../Service/EmployeesServices';
import { Box, TextField, Typography } from '@mui/material';
import appConfig from '../../../Utils/AppConfig';

function EditEmployee(): JSX.Element {
  const { id } = useParams();
  const nav = useNavigate();

  const { register, handleSubmit, setValue } = useForm<EmployeeModel>();

  useEffect(() => {
    employeesServices
      .getOneEmployee(+id)
      .then((employee) => {
        setValue('firstName', employee.firstName);
        setValue('lastName', employee.lastName);
        setValue('title', employee.title);
        setValue('birthDate', employee.birthDate);
        setValue('city', employee.city);
        setValue('imageUrl', employee.imageUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  async function update(employee: EmployeeModel) {
    try {
      employee.id = +id;
      employee.image = (employee.image as undefined as FileList)[0]
      await employeesServices.editEmployee(employee);
      alert('success');
      nav('/employees');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(update)}>
      <Box
        sx={{
          m: 'auto',
          marginTop: 18,
          width: 350,
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1">First Name</Typography>
        <TextField variant="outlined" type="text" {...register('firstName')} />

        <Typography variant="subtitle1">Last Name</Typography>
        <TextField variant="outlined" type="text" {...register('lastName')} />

        <Typography variant="subtitle1">Title</Typography>
        <TextField variant="outlined" type="text" {...register('title')} />

        <Typography variant="subtitle1">City</Typography>
        <TextField variant="outlined" type="text" {...register('city')} />

        <Typography variant="subtitle1">Birth Date</Typography>
        <TextField variant="outlined" type="date" {...register('birthDate')} />

        <Typography variant="subtitle1">Image</Typography>
        <TextField variant="outlined" type="file" {...register('image')} />

        <button>Update</button>
      </Box>
    </form>
  );
}

export default EditEmployee;
