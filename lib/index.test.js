import composeInitialProps from "./";

const TestComponent = function() {};
TestComponent.getInitialProps = async ctx => ({ foo: ctx.baz });

it("should call and return props of func defined on Component itself", async () => {
    const Component = composeInitialProps()(TestComponent);
    const props = await Component.getInitialProps({ baz: "bar" });
    expect(props).toEqual({
        foo: "bar"
    });
});

it("should call and return props of func defined on Component and a composed func", async () => {
    const myFunc = async ctx => ({ query: ctx.query });
    const Component = composeInitialProps(myFunc)(TestComponent);
    const props = await Component.getInitialProps({
        baz: "hey",
        query: { foo: "bar" }
    });
    expect(props).toEqual({
        foo: "hey",
        query: { foo: "bar" }
    });
});

it("should be able to handle multiple compositions", async () => {
    const withQuery = async ctx => ({ query: ctx.query });
    const withPathname = async ctx => ({ path: ctx.pathname });
    const withFoo = async ctx => ({ foo: ctx.baz });
    const Component = composeInitialProps(withQuery, withPathname, withFoo)(
        TestComponent
    );
    const props = await Component.getInitialProps({
        baz: "hey",
        pathname: "/foobar",
        query: { foo: "bar" }
    });
    expect(props).toEqual({
        foo: "hey",
        query: { foo: "bar" },
        path: "/foobar"
    });
});

it("should be able to handle non async funcs", async () => {
    const withQuery = ctx => ({ query: ctx.query });
    const TestComponentSync = function() {};
    TestComponentSync.getInitialProps = ctx => ({ foo: ctx.baz });

    const Component = composeInitialProps(withQuery)(TestComponent);
    const props = await Component.getInitialProps({ query: "foo", baz: "bar" });
    expect(props).toEqual({
        query: "foo",
        foo: "bar"
    });
});

it("should return Component as is if nothing is passed", async () => {
    const Component = composeInitialProps()(TestComponent);
    const props = await Component.getInitialProps({ baz: "bar" });
    expect(props).toEqual({
        foo: "bar"
    });
});
