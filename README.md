# <h1 align="center">MARVEL finder - SPA</h1>

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
## Project description
Single Page Application created in React displaying content from the Marvel universe. You can search for characters or comics and bookmark them. If you want to remove them from favorites it is also possible.

There is a navigation bar on the left for routes.

To run the application, follow the steps below or access live:

https://ultimate-marvel.vercel.app/

## REQUIREMENTS

To clone and run this application, you'll need [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/) v10.16 or higher + [Yarn](https://yarnpkg.com/) v1.13 or higher installed on your machine. From your command line:

### Clone this repository

```
git clone https://github.com/cbsalt/ultimate-marvel.git
```

```
Go into the repository

Environment variables
Create a file .env using .env.example and add your marvel apikeys. To understand how to, access https://developer.marvel.com/documentation/getting_started
Server-side applications must pass two parameters in addition to the apikey parameter:

REACT_APP_MARVEL_PRIVATE_KEY - your private key
REACT_APP_MARVEL_TIMESTAMP - a timestamp (ts)
REACT_APP_MARVEL_HASH_KEY - a md5 digest of the ts parameter, your private key and your public key (e.g. md5(ts+privateKey+publicKey)

For example, a user with a public key of "1234" and a private key of "abcd" could construct a valid call as follows:

http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
```

```
Install dependencies
yarn install


Run the app
yarn start
```

## BUILT WITH
_This project was developed with the following technologies:_

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Yarn](https://yarnpkg.com/)
* [React Router DOM](https://reactrouter.com/web/guides/quick-start)
* [Styled-Components](https://styled-components.com/)
* [MARVEL API](https://developer.marvel.com/documentation/getting_started)
* [EditorConfig](https://editorconfig.org/) and [ESLint](https://eslint.org/)/[Prettier](https://prettier.io/)


<h5 align="center">Made with 🖤 by Charles Sal</h5>
