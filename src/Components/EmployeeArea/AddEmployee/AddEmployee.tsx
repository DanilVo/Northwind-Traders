import { Box, TextField, Typography } from '@mui/material';
import './AddEmployee.css';
import { useForm } from 'react-hook-form';
import EmployeeModel from '../../../Models/EmployeeModel';
import { useState } from 'react';
import employeesServices from '../../../Service/EmployeesServices';
import appConfig from '../../../Utils/AppConfig';
import { useNavigate } from 'react-router-dom';

function AddEmployee(): JSX.Element {
  const { register, handleSubmit } = useForm<EmployeeModel>();

  const [imageFile, setImageFile] = useState<string>();
  const nav = useNavigate();

  function imgFile(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files && files.length > 0) {
      setImageFile(URL.createObjectURL(files[0]));
    }
  }

  async function addNewEmployee(employee: EmployeeModel) {
    try {
      employee.image = (employee.image as undefined as FileList)[0];
      await employeesServices.addEmployee(employee);
      nav('/employees');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(addNewEmployee)}>
      <Box
        sx={{
          m: 'auto',
          marginTop: 20,
          width: 350,
          height: 370,
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

        <Typography variant="subtitle1">Birth Date</Typography>
        <TextField variant="outlined" type="date" {...register('birthDate')} />

        <Typography variant="subtitle1">City</Typography>
        <TextField variant="outlined" type="text" {...register('city')} />

        <Typography variant="subtitle1">Image</Typography>
        <TextField
          variant="outlined"
          type="file"
          {...register('image')}
          onChange={imgFile}
        />
        <br />
        <button>Update</button>
        <img src={imageFile} height="50px" />
      </Box>
    </form>
  );
}

export default AddEmployee;
