# next-compose-initial-props

![travis ci image](https://api.travis-ci.com/theomjones/next-compose-initial-props.svg?branch=master)

Compose asynchronous `getInitialProps()` functions for reusability in NextJS pages.

## Install

`yarn add next-compose-initial-props`

## Usage

```js
// pages/index.js

import composeInitialProps from "next-compose-initial-props";

// Our component
const Page = ({ baseUrl }) => (
    <div>
        <p>BaseUrl is: {baseUrl}</p>
    </div>
);

// Gets the baseUrl of our API for use in our component.
const withBaseUrl = ctx => ({ baseUrl: `https://${ctx.req.headers.host}/api` });

export default compose(withBaseUrl)(Page);
```

Each function given to `composeInitialProps` gets passed the `ctx` object from Next. Functions can be synchronous or asynchronous.

## Why?

I found myself repeating code around computing values off the `ctx` object passed by Next. This gave me an easy way of composing functions together and exporting them with the page component.

## License

MIT
