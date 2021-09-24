/* Copyright (c) 2021 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import jwt from 'react-native-pure-jwt';
import axios from 'axios';

/**
 * All Available service endpoints (base URLs) for HTTP requests.
 */
export const ServiceEndpoints = {
  ASIA_PACIFIC_NORTH: 'https://protectapi-apne1.cylance.com/',
  ASIA_PACIFIC_SOUTHEAST: 'https://protectapi-au.cylance.com/',
  EUROPE_CENTRAL: 'https://protectapi-euc1.cylance.com/',
  NORTH_AMERICA: 'https://protectapi.cylance.com/',
  SOUTH_AMERICA: 'https://protectapi-sae1.cylance.com/',
  US_GOVERNEMENT: 'https://protectapi.us.cylance.com/',
};

/**
 * Meanings of HTTPS Exit Codes according to Cylance's Documentation.
 * Can be use for more accurate debugging.
 */
export const StatusCodes = {
  200: 'Successful!',
  201: 'Success: Created',
  400: 'Bad Request: Problem with structure of the request or payload. Likely cause: Malformed JSON',
  401: 'Unauthorized: Invalid Credentials were passed, or some other failure in authentication',
  403: 'Forbidden: Request has been successfully authenticated, but authorization to access the requested resources was not granted',
  404: 'Not Found: Request made for resource that does not exist',
  409: 'Conflict: A quest was made to create or update an aspect of the resource that conflicts with another',
  500: 'Internal: unhandled error on the server',
  501: 'Not Implemented: Resource does not exist yet',
};

export const getDefautHeaderOptions = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + token,
    },
  };
};

/**
 * Convert a CylancePROTECT ID into a CylanceOPTICS ID
 * CylancePROTECT Example: 45e07f34-e76b-4a9e-b167-d6d0c510d6ba (lower case with dashes)
 * CylanceOPTICS Example:  45E07F34E76B4A9EB167D6D0C510D6BA (upper case without dashes)
 * NOTE: Used for Zones, Devices, and others
 * @param {string} cylanceProtectID
 * @return {string} cylanceOpticsID
 */
export const convertProtectIDToOpticsID = (protectId) => {
  var opticsID = protectId.split('-').join('');
  opticsID = opticsID.toUpperCase();
  return opticsID;
};

export const CylanceAPI = {
  /**
   * Generate a JSON Web Token (Encoded String) based
   * on the parameters that the Cylance /token/ endpoint requires
   * @param {string} app_id - Application ID for Integrations
   * @param {string} app_secret - Application secret for Integrations
   * @param {string} tenent_id - Tenent ID for Integrations
   * @return {string} JSON Web Token required by `cylance-apis::getTokenFromAPI()`
   */
  generateJWTEncoded(app_id, app_secret, tenent_id) {
    const jti_value = uuidv4();
    const timeout = 1800 * 100;
    const now = Date.now();
    const exp = now + timeout;
    const claims = {
      iat: now,
      sub: app_id,
      tid: tenent_id,
      jti: jti_value,
      iss: 'http://cylance.com',
      exp: exp,
    };
    const algorithm = {
      alg: 'HS256',
    };
    return jwt.sign(claims, app_secret, algorithm).then((encoded) => {
      return encoded;
    });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} JWTEncoded
   * @return {request} the response from the request
   */
  getTokenFromAPI(serviceEndpointURL, JWTEncoded) {
    const authURL = serviceEndpointURL.concat('auth/v2/token');

    const payload = {
      auth_token: JWTEncoded,
    };
    const options = {
      headers: {'Content-Type': 'application/json; charset=utf-8'},
    };

    return axios
      .post(authURL, payload, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {string} payload
   * @return {request}
   */
  createInstaQuery(serviceEndpointURL, token, payload) {
    const endpoint = serviceEndpointURL.concat('instaqueries/v2');
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .post(endpoint, payload, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} device_id
   * @return {request} response
   */
  getDevice(serviceEndpointURL, token, device_id) {
    const endpoint = serviceEndpointURL.concat('devices/v2/' + device_id);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {int} page
   * @param {int} page_size
   * @return {request} response
   */
  getDevices(serviceEndpointURL, token, page, page_size) {
    const pagination = `?page=${page}&page_size=${page_size}`;
    const endpoint = serviceEndpointURL.concat(`devices/v2${pagination}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} page
   * @param {integer} page_size
   * @return {request} response
   */
  getUsers(serviceEndpointURL, token, page, page_size) {
    const PAGINATION = `?page=${page}&page_size=${page_size}`;
    const endpoint = serviceEndpointURL.concat(`users/v2${PAGINATION}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} user_id
   * @return {request} response
   */
  getUser(serviceEndpointURL, token, user_id) {
    const endpoint = serviceEndpointURL.concat(`users/v2/${user_id}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {string} threat_sha256
   * @return {request} response
   */
  getThreat(serviceEndpointURL, token, threat_sha256) {
    const endpoint = serviceEndpointURL.concat(`threats/v2/${threat_sha256}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {int} page
   * @param {int} page_size
   * @return {response} threats in data.page_items
   */
  getThreats(serviceEndpointURL, token, page, page_size) {
    const pagination = `?page=${page}&page_size=${page_size}`;
    const endpoint = serviceEndpointURL.concat(`threats/v2${pagination}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} page
   * @param {integer} page_size
   * @return {request} zones in data.page_items
   */
  getZones(serviceEndpointURL, token, page, page_size) {
    const pagination = `?page=${page}&page_size=${page_size}`;
    const endpoint = serviceEndpointURL.concat(`zones/v2${pagination}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} user_id
   * @return {request} response
   */
  getDetection(serviceEndpointURL, token, detection_id) {
    const endpoint = serviceEndpointURL.concat(
      `detections/v2/${detection_id}/details`,
    );
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} page
   * @param {integer} page_size
   * @return {request} zones in data.page_items
   */
  getDeviceDetections(serviceEndpointURL, token, page, page_size, deviceName) {
    const pagination = `?device=${deviceName}&page=${page}&page_size=${page_size}`;
    const endpoint = serviceEndpointURL.concat(`detections/v2${pagination}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} page
   * @param {integer} page_size
   * @return {request} zones in data.page_items
   */
  getDetections(serviceEndpointURL, token, page, page_size) {
    const pagination = `?page=${page}&page_size=${page_size}`;
    const endpoint = serviceEndpointURL.concat(`detections/v2${pagination}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} page
   * @param {integer} page_size
   * @return {request} instaQueries in data.page_items
   */
  getInstaQueries(serviceEndpointURL, token, page, page_size) {
    const pagination = `?page=${page}&page_size=${page_size}`;
    const endpoint = serviceEndpointURL.concat(`instaqueries/v2/${pagination}`);
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} query_id
   * @return {request} response
   */
  postArchvieInstaQuery(serviceEndpointURL, token, query_id) {
    const endpoint = serviceEndpointURL.concat(
      `instaqueries/v2/${query_id}/archive`,
    );
    const options = {
      headers: {
        Accept: '*/*',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .post(endpoint, {}, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  /**
   *
   * @param {string} serviceEndpointURL
   * @param {string} token
   * @param {integer} query_id
   * @return {request} response
   */
  getQueryResults(serviceEndpointURL, token, query_id) {
    const endpoint = serviceEndpointURL.concat(
      `instaqueries/v2/${query_id}/results`,
    );
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    };
    return axios
      .get(endpoint, options)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default CylanceAPI;
