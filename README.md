# Quinto Log - Front End Project
<img src="https://github.com/clariceabreu/FrontendQuintoLog/blob/master/public/logo-quintolog.png?raw=true" alt="logo" width="200"/>

This is the front end of the web application Quinto Log available on http://quinto-log.herokuapp.com/
The front end was entirely develeoped by Clarice Abreu.
The back end was developed by Squad 1 on the Accelera Dev Java Woman course prometed by Code Nation. The source code and documentation for the back end is available on https://github.com/codenation-dev/squad-1-ad-java-women-quinto-andar-1

## Run
To run this project use 
```
npm start
```

## Tecnologies
The app was creating using React, Redux and Hooks.

## Architecture
The source code is divided in the following sections:
* *Actions*: where requests to external APIs are made and the data received from them is sent to store
* *Assets*: where the app font, general layout and images are stored
* *Components*: where the built layout components are stored
* *Reducers*: where the specifications on how the application's state changes in response to actions are stored
* *Store*: where the application's states, actions types and persistence settings are stored

## Design
The design is based on Material UI components and icons.
Material UI documentation is available on https://material-ui.com/

## External Libraries used
* Material UI Core
* Material UI Icons
* Axios: used for the APIs request
* History: used to save navigation history
* Moment: used to convert and manage dates 
* Redux Persist: used to persist the application's states
* Redux Thunk: used to manage asynchronous actions
* Underscore: used to help on data manipulation



