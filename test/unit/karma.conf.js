var wsConfig = require("./webpack.test.config");

module.exports = function(config) {
    var settings = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",

        browsers: ["PhantomJS"],

        reporters: ["spec", "coverage"],

        frameworks: ["mocha", "chai", "sinon-chai"],

        files: [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.js",
            "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.js",
            "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/js/bootstrap-select.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.js",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.js",
            "https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.1.4/js/ion.rangeSlider.js",
            "https://rawgit.com/monterail/vue-multiselect/master/lib/vue-multiselect.min.js",
            "https://rawgit.com/nosir/cleave.js/master/dist/cleave.min.js",
            "https://nosir.github.io/cleave.js/lib/cleave-phone.i18n.js",
            "https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.5.1/nouislider.js",
            "https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.4.0/pikaday.min.js",

            "./index.js"
        ],

        exclude: [],

        preprocessors: {
            "./index.js": ["webpack", "sourcemap"]
        },

        webpack: wsConfig,

        webpackMiddleware: {
            noInfo: true
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        singleRun: true,

        coverageReporter: {
            dir: "./coverage",
            reporters: [
                { type: "lcov", subdir: "." },
                { type: "text-summary" }
            ]
        }
    }

    config.set(settings);
}