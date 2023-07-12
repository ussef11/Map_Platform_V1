import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import useFetch from '../../Hook/UseFetch';
import UserService from '../../services/user.service';
import "./gestion.css"
import AuthService from '../../services/auth.service';
const Utilisateur = () => {
    
    const [tableData, setTableData] = useState();
    const [ref, setref] = useState(0);

    useEffect(()=>{
        UserService.getalluser().then((res)=>{
          
            console.log(res.data)
            setTableData(res.data)
        }
        ,(error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
             console.log(_content);
          }
        )
    },[ref])

//   const  data   = [
//     {
//       id: '9s41rp',
//       firstName: 'Kelvin',
//       lastName: 'Langosh',
//       email: 'Jerod14@hotmail.com',
//       age: 19,
//       state: 'Ohio',
//     },
//     {
//       id: '08m6rx',
//       firstName: 'Molly',
//       lastName: 'Purdy',
//       email: 'Hugh.Dach79@hotmail.com',
//       age: 37,
//       state: 'Rhode Island',
//     },
//     {
//       id: '5ymtrc',
//       firstName: 'Henry',
//       lastName: 'Lynch',
//       email: 'Camden.Macejkovic@yahoo.com',
//       age: 20,
//       state: 'California',
//     },
//     {
//       id: 'ek5b97',
//       firstName: 'Glenda',
//       lastName: 'Douglas',
//       email: 'Eric0@yahoo.com',
//       age: 38,
//       state: 'Montana',
//     },
//     {
//       id: 'xxtydd',
//       firstName: 'Leone',
//       lastName: 'Williamson',
//       email: 'Ericka_Mueller52@yahoo.com',
//       age: 19,
//       state: 'Colorado',
//     },
//     {
//       id: 'wzxj9m',
//       firstName: 'Mckenna',
//       lastName: 'Friesen',
//       email: 'Veda_Feeney@yahoo.com',
//       age: 34,
//       state: 'New York',
//     },
//     {
//       id: '21dwtz',
//       firstName: 'Wyman',
//       lastName: 'Jast',
//       email: 'Melvin.Pacocha@yahoo.com',
//       age: 23,
//       state: 'Montana',
//     },
//     {
//       id: 'o8oe4k',
//       firstName: 'Janick',
//       lastName: 'Willms',
//       email: 'Delfina12@gmail.com',
//       age: 25,
//       state: 'Nebraska',
//     },
//   ];
  
  //50 us states array
const roles = [
    'admin',
    'moderator',
    'user',

   
  ];
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
 
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {



    // console.log(values["login"] , values["email"] ,values["password"],values["nom"] ,
    //  values["latitude"], values["longitude"], values["gsm"],[values["profil"]])  

  
    AuthService.register(values["login"], values["email"], values["nom"],  values["latitude"]
  , values["longitude"], values["gsm"] , values["password"] , [values["profil"]]).then((res)=>{
       
       console.log(values)
        values["id"] = res.data.user.id
        setref((prev) => prev+1)
    }  ,(error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
         console.log(_content);
      })

    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
        console.log(values["login"])
           tableData[row.index] = values;
// id
// login
// email
// nom
// latitude
// longitude
// gsm
// profil
           UserService.updateUser(values["id"], values["login"], values["email"], values["nom"]
           , values["latitude"], values["longitude"], values["gsm"],[values["profil"]]).then((res)=>{
                console.log(res.data)
           } ,(error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
             console.log(_content);
          })
      //send/receive api updates here, then refetch or update local table data for re-render
            setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('login')}`)
      ) {
        return;
      }
       UserService.deteleUser(row.getValue('id')).then((res)=>{
       console.log(res.data.user.username)
     }  ,(error) => {
         const _content =
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString();
          console.log(_content);
       })
       tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: true,
        size: 40,
      },
      {
        accessorKey: 'login',
        header: 'LOGIN',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'nom',
        header: 'NOM',
        size: 70,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'profil',
        header: 'PROFIL',
        size: 70,
        muiTableBodyCellEditTextFieldProps: {
            select: true, //change to select for a dropdown
            children: roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            )),
          },
        },
      {
        accessorKey: 'email',
        header: 'EMAIL',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'password',
        header: 'Mot de passe',
        size: 80,
        enableEditing: false, 
        enableSorting: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          
        }),
      },
      {
        accessorKey: 'latitude',
        header: 'LATITUDE',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          
        }),
      },
      {
        accessorKey: 'longitude',
        header: 'LONGITUDE',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          
        }),
      },
      {
        accessorKey: 'gsm',
        header: 'GSM',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          
        }),
      },
    //   {
    //     accessorKey: 'state',
    //     header: 'State',
    //     muiTableBodyCellEditTextFieldProps: {
    //       select: true, //change to select for a dropdown
    //       children: states.map((state) => (
    //         <MenuItem key={state} value={state}>
    //           {state}
    //         </MenuItem>
    //       )),
    //     },
    //   },

    
    ],
    [getCommonEditTextFieldProps],
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20, //customize the default page size
  });
  return (
    <>
  
    {  tableData &&    <MaterialReactTable 
          key={ref}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 50,
          },
        }}
        onPaginationChange={setPagination} //hoist pagination state to your state when it changes internally
    state={{ pagination }} //pass the pagination state to the table
        enableColumnResizing
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Account
          </Button>
        )}
      />}
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
                
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validateAge = (age) => age >= 18 && age <= 70;

export default Utilisateur;