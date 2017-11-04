/*jslint node: true, white: true*/

"use strict";

var platoUtil,
    eslintRules = {
        'rules': {
            'indent': [0, 'space']
        }
    },
    defaultConfig = {
        dir: "report",
        options: {
            esversion: 5,
            eslint: eslintRules
        }
    };

platoUtil = {
    setPlatoDefaultOptions: function (opts) {
        Object.keys(defaultConfig.options).forEach(function (key) {
            if (!opts[key]) {
                opts[key] = defaultConfig.options[key];
            }
        });

        return opts;
    },
    getCustomOrDefaultOptions: function (configPlato) {
        return configPlato.options || defaultConfig.options;
    },
    getPlatoOptions: function (config) {
        var platoConfigRoot = config.plato || {},
            opts = platoUtil.getCustomOrDefaultOptions(platoConfigRoot);

        return platoUtil.setPlatoDefaultOptions(opts);
    },
    getOtherDir: function (config) {
        return config.platoDir || defaultConfig.dir;
    },
    hasPlatoObjAndDir: function (config) {
        return (config.plato && config.plato.dir);
    },
    getPlatoDir: function (config) {
        var dir = platoUtil.hasPlatoObjAndDir(config) ?
            config.plato.dir :
            platoUtil.getOtherDir(config);

        return dir;
    },
    getPlatoConfig: function (config) {
        var pConf = {};

        pConf.dir = platoUtil.getPlatoDir(config);
        pConf.options = platoUtil.getPlatoOptions(config);

        return pConf;
    }
};

module.exports = platoUtil;