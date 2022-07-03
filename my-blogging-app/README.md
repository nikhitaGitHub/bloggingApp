## Steps to run:
    1) npm install ( I had to use npm cache clean --force before npm install)
    2) npm start
## USAGE :
localhost:3000
## urls : 
        '/': registeration/login screen
        '/create-blog' : create a new blog
        '/view blogs': Blog owner can see all his blogs (posted and unposed)
                        Here user can edit a blog and delete a unposed blog
        '/home' :user can see all blogs by all users where most recent post is at the top

## Description
I created a simple and basic website compatible with chrome broswer. The front end is in reactjs and backend utilizes firebase realitime DB to store and manipulate data. I use the available API 'fetch' through the browser to send requests to the firebase server. some components are made with bootstrap like modals. Although I have always relied on 3rd parties to provide designs , I came up with a simple mockup to convert into website taking inspiration from facebook's blue white color shceme and inspiration from stackoverflow's simple plain presentation of just the recent posts. Basic requirements as follows are met :

## Some more detail
- User can signup/login to the portal :
    This is done via only email and password input from user as this is the bare minimum and suffices
    the purpsose of the test assignment
    URL : /

- User can add a blog with below fields:
    A form is presented to the user that asks user to enter the following two pieces of information : 
    -   Title
    - Description
    - Do you want to post the blog? This confirmation is achieved through a bootstrap modal
    URL: /create-blog

- User can edit the posted blog within 10 minutes of creation. Unposted blog can be edited many times.
    URL :/view-blogs

- Other users can see the list of posted blogs
    URL: /home

- Blog owner can see his all blogs (posted and unposted).
    URL: /view-blogs

## Extra feature    
Extra feature is deletion of unposted blog post only as this felt intuitive
displaying saved post as 'saved draft'
dispalying user unique id in place of name or email for simplicity


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
