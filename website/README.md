# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Some Points to note:
- using userContext to manage the global state that handles the authentication token and user data
- react-router-dom is used to handle the routing
- lazy loading the pages (does not have much impact as yet since the pages are relatively light but could be useful once the app gets more complex) 
- No page match takes to 404 NOT FOUND
- React-hook-form is used to handle the form on register page
- Tailwind is used as library to help with styling 
- Axios is used to send request to server
- token is stored in local storage to handle some data persistence 
