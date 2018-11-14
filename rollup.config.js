const NAME = "composeInitialProps";

export default [
    {
        input: "lib/index.js",
        output: {
            name: NAME,
            file: "./dist/index.js",
            format: "cjs",
            sourcemap: true
        }
    },
    {
        input: "lib/index.js",
        output: {
            name: NAME,
            file: "./dist/index.es.js",
            format: "es",
            sourcemap: true
        }
    }
];
