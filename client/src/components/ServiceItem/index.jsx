import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import { stateActions } from "../../utils/stateSlice"


function ServiceItem(item) {
  // const [state, dispatch] = useStoreContext();
  const state = useSelector((state) => state.globalState);
  const dispatch = useDispatch();
  const {
    _id,
    name,
    description,
    image,
    availability,
    contact,
    price
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch(stateActions.updateCartQuantity({ _id, purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 }))
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(stateActions.addToCart({ ...item, purchaseQuantity: 1}));
      
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/services/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{availability} </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ServiceItem;
