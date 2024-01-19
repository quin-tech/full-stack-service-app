import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { stateActions } from '../../utils/stateSlice';

import { useDispatch } from "react-redux";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    // old redux
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: item._id
    // });

    // new redux

    dispatch(stateActions.removeFromCart(item._id));

    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      // Old Redux
      // dispatch({
      //   type: REMOVE_FROM_CART,
      //   _id: item._id
      // });

      // new Redux
      dispatch(stateActions.removeFromCart(item._id));
      idbPromise('cart', 'delete', { ...item });

    } else {
      // Old Redux
      // dispatch({
      //   type: UPDATE_CART_QUANTITY,
      //   _id: item._id,
      //   purchaseQuantity: parseInt(value)
      // });

      // New Redux 
      dispatch(stateActions.updateCartQuantity({ _id: item._id, purchaseQuantity: parseInt(value)}))
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
