import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DropdownButton() {
  const [UsersForTasks, setUsersForTasks] = useState([]);
  const [personName, setPersonName] = useState();

  const theme = useTheme();

  const handleChange = (event) => {
    const { value } = event.target;
    setPersonName(value);
    console.log(personName)
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/usersForTask');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsersForTasks(data);
        console.log('USERS LIST:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select 
          labelId="demo-multiple-name-label"
        
          
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name"   id="assigneeName"/>}
          MenuProps={MenuProps}
        >
          {UsersForTasks.map((name) => (
            <MenuItem key={name.UserID} value={name.UserID}>
              <Avatar alt={name.Username} src="../userimages/Max-R_Headshot (1).jpg" />
              {name.Username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
