import { useQuery, useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const ProfileForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');

    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setCategory(event.target.value);
      };

    const { data: categoryData } = useQuery(QUERY_CATEGORIES, 
        );
    const categoriesList = categoryData?.categories;

    const [ addService ] = useMutation(ADD_SERVICE);

    const styles = {
        spacer: {
            marginTop: '40px',
            width: '450px'
          },
          buttonA: {
            color: '#E65728',
            backgroundColor: '#F3A847',
            border: 'solid #E65728',
            margin: '8px'
          },
        }
    
    function onChangePrice(e) {
      setPrice(parseInt(e.target.value));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addService({
            variables: { name, description, image, price, availability, contact, email, category },
          })  
        handleClick();
        setName('');
        setDescription('');
        setPrice('');
        setAvailability('');
        setContact('');
        setEmail('');
        setCategory('');
        } catch (err) {
          console.error(err);
        }
      };

      const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

return (
  <section>
    <h5 style={styles.spacer}>Post a service to make cash from your skills!</h5>
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
          onChange={onChangePrice}
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
          label="Name"
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
        <Box sx={{ minWidth: 140, paddingLeft: '8px' }}>
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
        size='small'
        type="submit"
        style={styles.buttonA}
      >
        Add Service Listing
      </Button>

      </div>
    </Box>

  <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Your listing has been posted!"
      />
    </div>


  </section>
  );
};

export default ProfileForm;