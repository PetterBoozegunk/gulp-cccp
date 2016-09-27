# gulp-cccp
A gulp utility for Code Complexity Check (plus) Plato<br />
This is more of a "Configurable Task Bundle" than a plugin.<br />
The idea is: *"Run a function with a config object (as an argument) once and set up a bundle of tasks to be used later"*.

gulpfile example:

```javascript
var gulp = require("gulp"),
    cccp = require("gulp-cccp"),
    cccpConfig = {
        platoDir: "./report",
        checkFixSrc: [
            "**/*.js",
            "**/*.json",
            "!node_modules/**",
            "!report/**"
        ],
        complexityCheck: ["*.js"]
    };

cccp(cccpConfig);
```


## Bundled Plugins
*(from package.json)*
```
"gulp-complexity": "^0.3.2",
"gulp-js-prettify": "^0.1.0",
"gulp-jslint": "^1.0.5",
"gulp-line-ending-corrector": "^1.0.1",        	
"plato": "^1.7.0"
```
## Options

**platoDir (string)**<br />
The directory where you want the platoreport.

**checkFixSrc (glob)**<br />
Glob for gulp-js-prettify and gulp-jslint

**complexityCheck (glob, array)**<br />
Glob (array, not string) to the files you want to check with gulp-complexity and plato.

**prettify (object)**<br />
gulp-js-prettify options<br />
https://www.npmjs.com/package/gulp-js-prettify

**jslint (object)**<br />
jslint options<br />
https://www.npmjs.com/package/gulp-jslint

## Use
Type this in the command line:

```cmd
gulp cccp
```


