import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Profile() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log('Orders:', user.orders);
  }

  const styles = {
    accordion: {
      width: '60%',
      margin: 20,
      fontWeight: 'bold'
    },
    details: {
      fontWeight: 'normal',
      padding: 1,
    },
    spacer: {
      marginTop: '40px'
    }
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Services</Link>

        {user ? (
          <>

            <h4>{user.firstName} {user.lastName}'s Profile</h4>
            <div>
              <p
                style={styles.spacer}>
                Post a service listing to make cash from your skills!</p>
            </div>
            <Button variant="contained" color="success">
              Add a Service Listing
            </Button>
            <h5>Current Listings:</h5>
            <div>
              <Accordion
                style={styles.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Listing 1 Name
                </AccordionSummary>
                <AccordionDetails
                  style={styles.details}>
                  Listing details
                </AccordionDetails>
                <AccordionDetails
                  style={styles.details}>
                  $ Price
                </AccordionDetails>
                <AccordionDetails
                  style={styles.details}>
                  Category. Link to listing page?
                </AccordionDetails>
              </Accordion>
            </div>

            <h5>Purchase History:</h5>
                {user.orders.map((order) => (
                  <Accordion 
                    style={styles.accordion}
                    key={order._id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header">
                      Order Date: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                    </AccordionSummary>
                        {order.services.map(({ _id, image, name, price, category}, index) => (
                            <AccordionDetails  key={index}
                                style={styles.details}>
                                <Link to={`/services/${_id}`}> Name: {name}</Link><br/>
                                Price: {price} 
                            </AccordionDetails>
                        ))}
                  </Accordion>
                ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
