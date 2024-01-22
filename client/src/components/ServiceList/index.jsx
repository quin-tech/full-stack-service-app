import {useEffect} from 'react';
import ServiceItem from '../ServiceItem';
import {useStoreContext} from '../../utils/GlobalState';
import {UPDATE_PRODUCTS} from '../../utils/actions';
import {useQuery} from '@apollo/client';
import {QUERY_SERVICES} from '../../utils/queries';
import {idbPromise} from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import {useSelector, useDispatch} from 'react-redux';
import {stateActions} from '../../utils/stateSlice';

function ServiceList() {
  const state = useSelector((state) => state.globalState);

  const dispatch = useDispatch();
  // const [state, dispatch] = useStoreContext();

  const {currentCategory} = state;

  const {loading, data} = useQuery(QUERY_SERVICES);

  useEffect(() => {
    if (data) {
      dispatch(stateActions.updateServices(data.services));

      data.services.forEach((service) => {
        idbPromise('services', 'put', service);
      });
    } else if (!loading) {
      idbPromise('services', 'get').then((services) => {
        dispatch(stateActions.updateServices(services));
      });
    }
  }, [data, loading, dispatch]);

  function filterServices() {
    if (!currentCategory) {
      return state.services;
    }

    return state.services.filter(
      (service) => service.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Services:</h2>
      {state.services.length ? (
        <div className="flex-row">
          {filterServices().map((service) => (
            <ServiceItem
              key={service._id}
              _id={service._id}
              image={service.image}
              name={service.name}
              price={service.price}
              quantity={service.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any services yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading"/> : null}
    </div>
  );
}

export default ServiceList;
