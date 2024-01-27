import { useQuery, useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useSelector } from 'react-redux'

const ProfileForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const state = useSelector( (state) => state.globalState);

    const handleChange = (event) => {
        setCategory(event.target.value);
      };

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES, 
        );
    const categoriesList = categoryData?.categories;

    const [ addService, {error} ] = useMutation(ADD_SERVICE);

    const styles = {
        spacer: {
            marginTop: '40px'
          }
        }
    
        

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await addService({
            variables: { name, description, image, price, availability, contact, email, category },
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
        type="number"
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
        >
        {categoriesList && categoriesList.map((item) => (
          <MenuItem 
          key={item._id}
          value={item._id}
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