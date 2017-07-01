/*jslint node: true, white: true*/

"use strict";

var platoUtil,
    defaultConfig = {
        dir: "report",
        options: {
            version: "es5"
        }
    };

platoUtil = {
    initPlatoConfig: function (config) {
        return config.plato || {
            dir: config.platoDir
        };
    },
    setPlatoConfig: function (platoConfig) {
        Object.keys(defaultConfig).forEach(function (prop) {
            if (!platoConfig[prop]) {
                platoConfig[prop] = defaultConfig[prop];
            }
        });

        return platoConfig;
    },
    getPlatoConfig: function (config) {
        var platoConfig = platoUtil.initPlatoConfig(config);

        return platoUtil.setPlatoConfig(platoConfig);
    }
};

module.exports = platoUtil;