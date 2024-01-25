import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
    image,
    name,
    _id,
    price,
    availability,
    contact,
    email
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
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={`/images/${image}`}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${price}
            {availability}
            {contact}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={addToCart}>Add to cart</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ServiceItem;
