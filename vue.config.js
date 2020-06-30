const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: false, //是否开启eslint
    productionSourceMap: false,
    runtimeCompiler: false,
    configureWebpack: config => {
        let plugins = [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' + ['js', 'css'].join('|') +
                    ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ]
        if (process.env.NODE_ENV !== 'development') {
            config.plugins = [...config.plugins, ...plugins]
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
    },
    css: {
        extract: true,
        sourceMap: false,
        requireModuleExtension: true
    },
    devServer: {
        open: true,
        port:8082,                                 
    }
}