import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { Link } from 'react-router-dom';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const services = cart.map((item) => item._id);

      if (services.length) {
        const { data } = await addOrder({ variables: { services } });
        const serviceData = data.addOrder.services;

        serviceData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <Link to="/">← Back to Home</Link>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
