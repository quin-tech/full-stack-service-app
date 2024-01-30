import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfileForm from '../components/ProfileForm';

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
      padding: '5px 0 5px 15px',
    },
    spacer: {
      marginTop: '40px'
    }
  }

  console.log(user);





  return (
    <>
      <div className="container">
        {user ? (
          <>
            <h4>{user.firstName} {user.lastName}'s Profile</h4>

            <ProfileForm />
            
            <div style={styles.spacer}>
              <h5>Current Listings:</h5>
              <div>
                {user.services && user.services.map((item) => (
                  <div key={item._id}>
                    <Accordion
                      style={styles.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        Listing: {item.name}
                      </AccordionSummary>
                      <AccordionDetails
                        style={styles.details}>
                        Details: {item.description}
                      </AccordionDetails>
                      <AccordionDetails
                        style={styles.details}>
                        Price: ${item.price}
                      </AccordionDetails>
                      <AccordionDetails
                    style={styles.details}>
                    <Link to={`/services/${item._id}`}>See full Listing</Link>
                  </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.spacer}>
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
                      <AccordionDetails  
                        key={index}
                        style={styles.details}
                      >
                        <Link to={`/services/${_id}`}>{name}</Link><br/>
                        Price: ${price} 
                      </AccordionDetails>
                    ))}
                  </Accordion>
                ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
