import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from '../../../public/images/logo-3.png';
import Auth from "../../utils/auth";
import { useDispatch, useSelector } from 'react-redux';
import { stateActions } from '../../utils/stateSlice';
import { idbPromise } from '../../utils/helpers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

function Nav() {
  const state = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  function logout() {
    dispatch(stateActions.clearCart(state));
    idbPromise('cart', 'clear');
    Auth.logout();
  }

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

  if (Auth.loggedIn()) {
  return (
    <Box
      sx={{display: 'flex', position: 'fixed' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        role="navigation"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#E65728",
            textColor: "inherit"

          }
        }}
      >
        <Box sx={{ width: '100px', display: 'flex'}}><img src={logo} /></Box>
        <LinkTab component={Link} label="Home" {...a11yProps(1)} to="/"/>
        <LinkTab component={Link} label="Profile" {...a11yProps(2)} to="/profile"/>
        <LinkTab component={Link} label="Log Out" {...a11yProps(3)} to="/" onClick={logout}/>
        <LinkTab component={Link} label="Sign Up" {...a11yProps(4)} to="/signup"/>
      </Tabs>

      {/* <TabPanel value={value} index={1}>
        <Box sx={{paddingLeft: '36%', paddingTop: '40%'}}>
          <h4>Home</h4>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{paddingLeft: '36%', paddingTop: '40%'}}>
          <h4>Profile</h4>
        </Box>      </TabPanel>
      <TabPanel value={value} index={3} sx={{ width: '110px'}}>
        <Box sx={{width: '120px', paddingLeft: '25%', paddingTop: '25%'}}>
          <h4>Log Out</h4>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4} sx={{ width: '110px'}}>
        <Box sx={{width: '120px', paddingLeft: '25%', paddingTop: '25%'}}>
            <h4>Sign Up</h4>
        </Box>
      </TabPanel>       */}
    </Box>
  );

} else {
  return (
    <Box
      sx={{display: 'flex', position: 'fixed' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        role="navigation"
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#E65728",
          }
        }}
      >
        <Box sx={{ width: '100px', display: 'flex', paddingBottom: '10%' }}><img src={logo} /></Box>
        <LinkTab component={Link} label="Home" {...a11yProps(1)} to="/"/>
        <LinkTab component={Link} label="Profile" {...a11yProps(2)} to="/profile"/>
        <LinkTab component={Link} label="Log In" {...a11yProps(3)} to="/login"/>
        <LinkTab component={Link} label="Sign Up" {...a11yProps(4)} to="/signup"/>
      </Tabs>

      {/* <TabPanel value={value} index={1}>
        <Box sx={{paddingLeft: '36%', paddingTop: '40%'}}>
          <h4>Home</h4>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{paddingLeft: '36%', paddingTop: '40%'}}>
          <h4>Profile</h4>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box sx={{width: '120px', paddingLeft: '20%', paddingTop: '25%'}}>
          <h4>Log In</h4>
        </Box>      </TabPanel>
      <TabPanel value={value} index={4}>
        <Box sx={{width: '120px', paddingLeft: '20%', paddingTop: '25%'}}>
          <h4>Sign Up</h4>
        </Box>
      </TabPanel>       */}
    </Box>
  );
}}

export default Nav;