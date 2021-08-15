const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { 
                            '@primary-color': '#1DA57A',
                            '@layout-body-background': '#fefefe',
                            '@layout-header-background': '#1DA57A',
                            '@list-item-padding': '@padding-xs @padding-sm'
                        },
                        javascriptEnabled: true,
                    }
                },
            },
        },
    ],
};