# About
This is a mobile usage sample leveraging Cylance's Restful API to take security on the go.
If you plan on developing a pure Javascript, or React-Native based application that leverages 
this API, you can import the `library/cylance-apis.js` to save development time. You can also modify
this open source application to fit your Cylance use-case. 

## Requirements
- follow [these instructions](https://reactnative.dev/docs/0.60/getting-started) to make sure your machine is setup to run react-native
- last built using npx/npm version `6.14.4` on `ios 14` 
- last built with react-native-cli: 2.0.1 / react-native: 0.62.2

## How to Setup
- `npm install`
- `cd ios` -> `npx pod-install ios`

## How to run on simulator
- `npx react-native run-ios` 
- `npx react-native run-android`

## How to run on physical device (ios)
- `react-native run-ios --device`
If that does not work, it should list the UUID of the device, then try
- `react-native run-ios  --udid your_id`

## What API's does this application leverage? 
- Generating a valid JWT token
- Getting authenticated
- Devices
- Threats
- Users
- InstaQueries
	- Create
	- View Queries
	- View Query Results
	- Archive Queries


## React Native Cylance Example
A wrapper for the Cylance v2 API in Javascript, implemented using React Native using;
- [react-native-cli](https://github.com/react-native-community/cli)
	- for running
- [redux](https://redux.js.org/)
	- for centralized state
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
	- for handling changing state during asyncronous actions
- [react-navigation](https://reactnavigation.org/)
	- *for handling screen navigation*
- [react-native-sensitive-info](https://www.npmjs.com/package/react-native-sensitive-info)
	- *for securely storing Cylance API Tokens*
- [react-native-pure-jwt](https://www.npmjs.com/package/react-native-pure-jwt)
	- *for generating Json Web Tokens in `cylance-apis.js`*
- [axios](https://www.npmjs.com/package/axios)
	- *for making REST calls in `cylance-apis.js` *
- [uuid/v4](https://www.npmjs.com/package/uuid)
	- *for generating random uuids - for the JWT jti value in `cylance-apis.js`*


# The Structure of the Application 
* App.js 
* index.js
* app/
	* ReduxAsyncApp.js 
		* *Main Loop that controls navigation between tabs, and authentication*
	* store.js
	* actions/ 
		*  *executing cylance-apis while dispatching state changes*
	* reducers/
		*  *capturing state changes that are dispatched from actions and updating props used in user interface*
	* screens/
		* *class components that are referenced as screens by navigation container which manage their own state and props, are connected to redux in the same fashion as ReduxAsyncApp.js*
	* components/
		* *functional components that have a single purpose, such as displaying a list or a form*
* library/
	* cylance-apis.js 
		* *wrapper around axios rest calls* 
