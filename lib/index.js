export default (...funcs) => Component => {
    if (!funcs) return Component;
    const orig = Component.getInitialProps;
    Component.getInitialProps = async ctx => {
        let props = await orig(ctx);
        const promises = funcs.map(async fn => await fn(ctx));
        const newProps = await Promise.all(promises);
        newProps.forEach(prop => {
            props = { ...props, ...prop };
        });
        return props;
    };
    return Component;
};
