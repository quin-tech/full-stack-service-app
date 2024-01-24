import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from '../../../public/images/skill-magnet-logo.png';
import Auth from "../../utils/auth";

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
        <Box sx={{ paddingLeft: '35%', paddingTop: '25px' }}>
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

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

  if (Auth.loggedIn()) {
  return (
    <Box
      sx={{display: 'flex', position: 'relative' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        role="navigation"
      >
        <Box sx={{ width: '100px', display: 'flex' }}><img src={logo} /></Box>
        <LinkTab component={Link} label="Home" {...a11yProps(1)} to="/"/>
        <LinkTab component={Link} label="Profile" {...a11yProps(2)} to="/orderHistory"/>
        <LinkTab component={Link} label="Sign Out" {...a11yProps(3)} to="/" onClick={() => Auth.logout()}/>
        <LinkTab component={Link} label="Sign Up" {...a11yProps(4)} to="/signup"/>
      </Tabs>

      <TabPanel value={value} index={1}>
        <h4>Home</h4>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h4>Profile</h4>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h4>Sign Out</h4>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h4>Sign Up</h4>
      </TabPanel>      
    </Box>
  );

} else {
  return (
    <Box
      sx={{display: 'flex', position: 'relative' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        role="navigation"
      >
        <Box sx={{ width: '100px', display: 'flex' }}><img src={logo} /></Box>
        <LinkTab component={Link} label="Home" {...a11yProps(1)} to="/"/>
        <LinkTab component={Link} label="Profile" {...a11yProps(2)} to="/profile"/>
        <LinkTab component={Link} label="Sign In" {...a11yProps(3)} to="/login"/>
        <LinkTab component={Link} label="Sign Up" {...a11yProps(4)} to="/signup"/>
      </Tabs>

      <TabPanel value={value} index={1}>
        <h4>Home</h4>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h4>Profile</h4>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h4>Sign In</h4>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h4>Sign Up</h4>
      </TabPanel>      
    </Box>
  );
}}

export default Nav;