import {CylanceAPI, StatusCodes} from '../../../library/cylance-apis';
export const LOCKDOWN_REQUEST = 'LOCKDOWN_REQUEST';
export const LOCKDOWN_SUCCESS = 'LOCKDOWN_SUCCESS';
export const LOCKDOWN_ERROR = 'LOCKDOWN_ERROR';
export const RESET_LOCKDOWN_REDUCER = 'RESET_LOCKDOWN_REDUCER';


export const lockdownDevice = (device_id, days, hours, mins) => (dispatch, getState) => {
  dispatch({type: LOCKDOWN_REQUEST});

  const token = getState().token.token;
  const endpoint = getState().token.endpoint;

  CylanceAPI.lockdownDevice(endpoint, token, device_id, days, hours, mins)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        dispatch({type: LOCKDOWN_SUCCESS, payload: response.data});
      } else {
        throw response.status;
      }
    })
    .catch((error) => {
      dispatch({
          type: LOCKDOWN_ERROR,
          payload: StatusCodes[error.response.status],
        });
    });
};

export const resetLockdownReducer = () => (dispatch) => {
  dispatch({type: RESET_LOCKDOWN_REDUCER});
};
