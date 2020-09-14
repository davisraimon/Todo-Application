module.exports = (api) => {
    if (api) api.cache(true);
    const presets = ['@babel/preset-env'];
    const plugins = ['@babel/plugin-transform-react-jsx'];
    return {
        presets,
        plugins,
    };
};