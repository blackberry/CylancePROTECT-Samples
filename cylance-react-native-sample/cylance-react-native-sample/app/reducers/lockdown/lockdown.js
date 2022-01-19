import {
  LOCKDOWN_REQUEST,
  LOCKDOWN_SUCCESS,
  LOCKDOWN_ERROR,
  RESET_LOCKDOWN_REDUCER
} from '../../actions/lockdown/lockdown';

let initialState = {
  loading: false,
  success: false,
  isError: false,
  data: '',
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCKDOWN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOCKDOWN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
        isError: false,
        error: ''
      };
    case LOCKDOWN_ERROR:
      return {
        ...state,
        loading: false,
        isError: true,
        isError: true,
        error: action.payload,
        data: ''
      };
    case RESET_LOCKDOWN_REDUCER:
      return initialState;
    default:
      return state;
  }
};
export default reducer;