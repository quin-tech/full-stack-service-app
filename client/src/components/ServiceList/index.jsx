import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {useEffect} from 'react';
import { Link } from "react-router-dom";
import {useQuery} from '@apollo/client';
import {QUERY_SERVICES} from '../../utils/queries';
import {idbPromise} from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import {useSelector, useDispatch} from 'react-redux';
import {stateActions} from '../../utils/stateSlice';
import Typography from '@mui/material/Typography';

function ServiceList() {
  const state = useSelector((state) => state.globalState);
  const dispatch = useDispatch();
  const {currentCategory} = state;
  const {loading, data} = useQuery(QUERY_SERVICES);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
      <h5>Our Services:</h5>
      {state.services.length ? (
        <Box sx={{ width: '100%', display: "flex", justifyContent: "center"}}>
          <Stack spacing={2} divider={<Divider orientation="horizontal" color="#E65728" flexItem />}>
            {filterServices().map((service) => (
              <Link key={service._id} to={`/services/${service._id}`}>
                <Item>
                  <Typography sx={{textAlign: 'left'}}>
                  {service.name},
                  ${service.price}
                </Typography>
                <Typography sx={{textAlign: 'left'}}>
                  {service.description}
                </Typography>
                </Item>
              </Link>
            ))}

          </Stack>
        </Box>
      ) : (
        <h6>You haven't added any services yet!</h6>
      )}
      {loading ? <img src={spinner} alt="loading"/> : null}
    </div>
  );
}

export default ServiceList;
