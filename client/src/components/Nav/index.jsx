import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Auth from "../../utils/auth";
// import { Link } from "react-router-dom";

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
        <Box sx={{ paddingLeft: '25%', paddingTop: '3px' }}>
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

function Nav() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{display: 'flex', position: 'relative', top: '5em'}}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Home" {...a11yProps(0)} />
        <Tab label="Profile" {...a11yProps(1)} />
        <Tab label="Sign In" {...a11yProps(2)} />
        <Tab label="Sign Up" {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <h4>Home</h4>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h4>Profile</h4>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h4>Sign In</h4>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h4>Sign Up</h4>
      </TabPanel>
    </Box>
  );

}

export default Nav;

// function showNavigation() {
//   if (Auth.loggedIn()) {
//     return (
//       <ul className="flex-row">
//         <li className="mx-1">
//           <Link to="/orderHistory">
//             Order History
//           </Link>
//         </li>
//         <li className="mx-1">
//           {/* this is not using the Link component to logout or user and then refresh the application to the start */}
//           <a href="/" onClick={() => Auth.logout()}>
//             Logout
//           </a>
//         </li>
//       </ul>
//     );
//   } else {
//     return (
//       <ul className="flex-row">
//         <li className="mx-1">
          // <Link to="/signup">
          //   Signup
          // </Link>
//         </li>
//         <li className="mx-1">
          // <Link to="/login">
          //   Login
          // </Link>
//         </li>
//       </ul>
//     );
//   }
// }

// return (
//   <header className="flex-row px-1">
//     <h1>
//       <Link to="/">
//         <span role="img" aria-label="shopping bag">🛍️</span>
//         -Shop-Shop
//       </Link>
//     </h1>

//     <nav>
//       {showNavigation()}
//     </nav>
//   </header>
// );