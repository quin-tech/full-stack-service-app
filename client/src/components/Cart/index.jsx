import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { stateActions } from '../../utils/stateSlice';
import './style.css';

const stripePromise = loadStripe('pk_test_51ObbQVGqsdJoFmAP33BNJUp93VA0ztyOnWSRuFQiEP6CXUjbWlY7JtfnK7HHZuWqp8ipPKIKl4ycqMRQr6EOPTXG00F6ZCoW9g');

const Cart = () => {
  const state = useSelector((state) => state.globalState);
  const dispatch = useDispatch();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch(stateActions.addMultipleToCart([...cart]))
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch(stateActions.toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const serviceIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        serviceIds.push(item._id);
      }
    });

    getCheckout({
      variables: { services: serviceIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h5>Shopping Cart</h5>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h6>
          You haven't added anything to your cart yet!
          <span role="img" aria-label="shocked">
            😱
          </span>
        </h6>
      )}
    </div>
  );
};

export default Cart;
