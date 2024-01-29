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

  console.log(user);





  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Services</Link>

        {user ? (
          <>
            <h4>{user.firstName} {user.lastName}'s Profile</h4>
            <ProfileForm />
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
                      Category. Link to listing page?
                      {item.category}
                    </AccordionDetails>
                    <AccordionDetails
                  style={styles.details}>
                  <Link to={`/services/${item._id}`}>See full Listing</Link>
                </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>

            <h5>Purchase History:</h5>
            <div>
              <Accordion
                style={styles.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Order 1 Name
                </AccordionSummary>
                <AccordionDetails
                  style={styles.details}>
                  Order details
                </AccordionDetails>
                <AccordionDetails
                  style={styles.details}>
                  $ Price
                </AccordionDetails>
                <AccordionDetails
                  style={styles.details}>
                  Category
                </AccordionDetails>
              </Accordion>
            </div>

            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.services.map(({ _id, image, name, price, category, }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/services/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                        <p>{category}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
