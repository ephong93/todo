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
                            //'@list-item-padding': 0,
                            //'@list-empty-text-padding': 0,
                            //'@list-item-padding-sm': 0,
                            //'@list-item-padding-lg': 0
                        },
                        javascriptEnabled: true,
                    }
                },
            },
        },
    ],
};