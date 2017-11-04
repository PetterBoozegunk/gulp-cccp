var funcs = {
    "one": function () {
        return true;
    },
    "two": function () {
        return false;
    }
};

module.exports = {
    "testFunc": function (one, two, three) {
        var func = (one !== two && !three)
            ? "one"
            : "two";

        return funcs[func];
    }
};