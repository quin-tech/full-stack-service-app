import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from "react-redux";
import { stateActions } from '../../utils/stateSlice';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function CategoryMenu() {

  const state = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  const { categories } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const styles = {
    filterBtn: {
      display: 'inline-block',
      padding: '1rem 1rem',
      verticalAlign: 'middle',
      color: 'black',
    }
  }

  useEffect(() => {
    if (categoryData) {
      dispatch(stateActions.updateCategories(categoryData.categories));

      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(stateActions.updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClickItem = (id) => {
    dispatch(stateActions.updateCurrentCategory(id));
    console.log(id)
  };

  return (
    <div>
      <h5>Filter by Category
        <Button
          style={styles.filterBtn}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <TuneIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {categories.map((item) => (
            <MenuItem
              key={item._id}
              onClick={() => {
                handleClickItem(item._id);
              }}>{item.name}</MenuItem>
          ))}
          <MenuItem onClick={() => {
            handleClickItem('');
          }}>All</MenuItem>

        </Menu>
        </h5>
    </div>
  );
}

export default CategoryMenu;