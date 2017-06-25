/*jslint node: true, white: true*/

"use strict";

var platoUtil;

platoUtil = {
    getPlatoDir: function (config) {
        return config.platoDir || "report";
    },
    setPlatoDir: function (config, platoConfig) {
        if (!platoConfig.dir) {
            platoConfig.dir = platoUtil.getPlatoDir(config);
        }

        return platoConfig;
    },
    getPlatoConfig: function (config) {
        var platoConfig = config.plato || {};

        return platoUtil.setPlatoDir(config, platoConfig);
    }
};

module.exports = platoUtil;