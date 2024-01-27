import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { stateActions } from '../../utils/stateSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

const ProfileForm = () => {

    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
      setCategory(event.target.value);
    };



    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    // const [category, setCategory] = useState('');
    const state = useSelector( (state) => state.globalState);
    console.log(state);

    const dispatch = useDispatch();
  

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };


    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES, 
        );
    console.log(categoryData);
    const categories = categoryData?.categories;
    categories.map((item) => {
        console.log(item.name)});


    const [ addService, {error}, ] = useMutation(ADD_SERVICE);

    const styles = {
        spacer: {
            marginTop: '40px'
          }
        }

        // const handleClickItem = (event) => {
        //    setCategory(event.target.value);
        //   };

    // useEffect(() => {
    //     if (categoryData) {

        
    //         dispatch(stateActions.updateCategories(categoryData.categories));
    
    
    //         categoryData.categories.forEach((category) => {
    //         idbPromise('categories', 'put', category);
    //         });
    //     } else if (!loading) {
    //         idbPromise('categories', 'get').then((categories) => {
    //         dispatch(stateActions.updateCategories(categories));
    //         });
    //     }
    //     }, [categoryData, loading, dispatch]);

    // const handleChange = (event) => {
    //     setCategory(event.target.value);
    //     };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addService({
            variables: { name, description, image, price, availability, contact, email, category },
            // refetchQueries: [
            //   {
            //     query: QUERY_USER
            //   },
            // ]
          });
        } catch (err) {
          console.error(err);
        }
      };

return (
    <>
    <div>
    <p
      style={styles.spacer}>
      Post a service listing to make cash from your skills!</p>
  </div>
  <Box
    component="form"
    onSubmit={handleFormSubmit}
    sx={{
      '& .MuiTextField-root': { m: 1, width: '50ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        id="nameInput"
        required
        label="What is your Service?"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        id="descInput"
        required
        label="Details/Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        id="priceInput"
        required
        label="Name your Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
       <TextField
        id="availInput"
        required
        label="Availability (Days/Times)"
        value={availability}
        onChange={(event) => setAvailability(event.target.value)}
      />
      <TextField
        id="contactInput"
        required
        label="Contact"
        value={contact}
        onChange={(event) => setContact(event.target.value)}
      />
      <TextField
        id="emailInput"
        required
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          value={category}
          onChange={handleChange}
        //   onChange={(event) => setCategory(event.target.value)}

        //   onChange={handleChange(item._id)}
        >
        {categories.map((item) => (
          <MenuItem 
          key={item._id}
          value={item._id}
        // onChange={(event) => setCategory(event.target.value)}
        //   onClick={() => {
        //     handleClickItem(item.name);
        //     console.log(item.name)
        // }}
        >{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Button
    variant="contained"
    color="success"
    type="submit"
  >
    Add Service Listing
  </Button>

    </div>
  </Box>


  </>
  );
};

export default ProfileForm;