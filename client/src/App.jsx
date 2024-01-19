import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';


import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './utils/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { stateReducer } from './utils/stateSlice';


const rootReducer = combineReducers({
  globalState: stateReducer,
})


// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )




const store = configureStore({
  reducer: rootReducer,
});




const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Nav />
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
