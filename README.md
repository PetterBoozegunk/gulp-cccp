# gulp-cccpA gulp utility for Code Complexity Check (plus) Plato<br />This is more of a "Configurable Task Bundle" than a plugin.<br />The idea is: *"Run a function with a config object (as an argument) once and set up a bundle of tasks to be used later"*.Copy this in to your gulpfile:```javascriptrequire("gulp-cccp")({    platoDir: "./report",    checkFixSrc: ["**/*.js", "**/*.json", "!node_modules/**", "!report/**"],    complexityCheck: ["*.js"]});```Notice that there is no```javascript var/let/const cccp = require('gulp-cccp')```Just run it as a function directly.## Bundled Plugins*(from package.json)*```"gulp-complexity": "^0.3.2","gulp-js-prettify": "^0.1.0","gulp-jslint": "^1.0.5","gulp-line-ending-corrector": "^1.0.1",        	"plato": "^1.7.0"```## Options**platoDir (string)**<br  />The directory where you want the platoreport.**checkFixSrc (glob)**<br />Glob for gulp-js-prettify and gulp-jslint**complexityCheck (glob, array)**<br />Glob (array, not string) to the files you want to check with gulp-complexity and plato.## UseType this in the command line:```cmdgulp cccp```##Warning!The settings in gulp-js-prettify is all defaults except for "jslint_happy" that is set to <code>**true**</code><br /><br />*(If anybody besides my self actually starts to use this plugin this may change in the future.)*