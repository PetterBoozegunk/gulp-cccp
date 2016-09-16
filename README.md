# gulp-cccp
A gulp utility for Code Complexity Check (plus) Plato

Copy this in to your gulpfile:

<pre><code>
require("gulp-cccp")({
    platoDir: "./report",
    checkFixSrc: ["**/*.js", "**/*.json", "!node_modules/**", "!report/**"],
    complexityCheck: ["*.js"]
});</code></pre>

Notice that there is no "var/let/const = cccp require('gulp-cccp')". 
Just run it as a function directly.

##Options

###platoDir (string)
The directory where you want the platoreport.

###checkFixSrc (glob)
Glob for gulp-js-prettify and gulp-jslint

### complexityCheck (glob, array)
Glob (array, not string) to the files you want to check with gulp-complexity and plato.


##Use
Type this in the commanline:
<pre>
<code>gulp cccp</code>
</pre>

##Warning!
The settings in gulp-js-prettify is all defaults except for "jslint_happy" that is set to <code>true</code>