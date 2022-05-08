import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {reducer as CartAndOrdersReducer} from './CartAndOrders';

export default configureStore({
  reducer: {
    CartAndOrders:CartAndOrdersReducer ,
  },
  middleware: [
    // Because we define the middleware property here, we need to explictly add the defaults back in.
    ...getDefaultMiddleware(),
  ],
});
