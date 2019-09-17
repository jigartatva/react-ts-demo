## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software.

```
NodeJS (>=10.15 recommended)
```

### Installing

A step by step series of examples that tell you how to get a development env running

```
npm/yarn install
```
```
cd api
npm/yarn install
```

### API Server

To start API server, run below command in `api` directory

```
npm start
```

***Keep the terminal open for API server. 

### Configuration
Basic configuration `src/constants/appConfig.ts`

1. `API_BASE_URL` : API endpoint. (Default : http://localhost:3000)
2. `DATE_FORMATE` : Global date format that we can change as per required (Default : YYYY-MM-DD)
3. `DEFAULT_LANG` : Default language code. We can change default language by changing this variable. (Default : en)

### Feature
1. REST API for users CRUD operation
2. Login with Remember me.
3. User CRUD operations (VIEW/ADD/EDIT/DELETE)
4. Two different layout for user listing
5. Multilingual with English and German (Default : English)
6. Language switcher from top bar (After logged in)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
