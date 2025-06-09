import { combineReducers } from 'redux';

// Dummy reducer with generic state
const dummyReducer = (
  state = {
    user: {
      name: 'John Doe',
      loggedIn: false,
    },
    notifications: [
      { id: 1, message: 'Hello!' },
      { id: 2, message: 'You have a new notification.' },
    ],
  },
  action: any
) => {
  return state; 
};

const rootReducer = combineReducers({
  dummy: dummyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
