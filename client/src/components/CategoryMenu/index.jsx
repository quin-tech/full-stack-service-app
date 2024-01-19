import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import {useDispatch, useSelector} from "react-redux";
import { stateActions } from '../../utils/stateSlice';

function CategoryMenu() {

  const state = useSelector((state) => state.globalState);
  const dispatch = useDispatch();
  // const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {



      // old redux
      // dispatch({
      //   type: UPDATE_CATEGORIES,
      //   categories: categoryData.categories,
      // });

      dispatch(stateActions.updateCategories(categoryData.categories));


      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {

        // old redux
        // dispatch({
        //   type: UPDATE_CATEGORIES,
        //   categories: categories,
        // });

        dispatch(stateActions.updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    // old redux
    // dispatch({
    //   type: UPDATE_CURRENT_CATEGORY,
    //   currentCategory: id,
    // });

    // new redux
    dispatch(stateActions.updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
