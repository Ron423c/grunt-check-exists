'use strict';

var
    path = require('path'),
    exec = require('child_process').exec,
    execOptions = {
        cwd: path.join(__dirname, '..')
    }
    ;

exports.checkExistsTests = {
    "test it informs which target is run": function (test) {

        test.expect(1);

        exec('grunt checkExists:existing_files', execOptions, function(error, stdout){

            test.equal(
                stdout.indexOf("Checking 'existing_files'...") > -1,
                true,
                'Array arguments are working.'
            );

            test.done();
        });
    },

    "test it passes with existing files": function (test) {

        test.expect(1);

        exec('grunt checkExists:existing_files', execOptions, function (error, stdout) {

            test.equal(
                stdout.indexOf("All files present for 'existing_files'.") > -1,
                true,
                '.'
            );

            test.done();
        });
    },

    "test it passes with externally referenced existing files": function (test){

        test.expect(1);

        exec('grunt checkExists:external_existing', execOptions, function(error, stdout) {

            test.equal(
                stdout.indexOf("All files present for 'external_existing'.") > -1,
                true,
                '.'
            );

            test.done();
        });
    },

    "test it reports non-existing files referenced externally": function (test) {

        test.expect(4);

        exec('grunt checkExists:external_non_existing', execOptions, function(error, stdout) {

            test.equal(
                stdout.indexOf("File 'non/existing/file1.js' is missing.") > -1,
                true,
                '.'
            );
            test.equal(
                stdout.indexOf("File 'non/existing/file2.js' is missing.") > -1,
                true,
                '.'
            );
            test.equal(
                stdout.indexOf("File 'other/non/existing/resource1.js' is missing.") > -1,
                true,
                '.'
            );
            test.equal(
                stdout.indexOf("File 'other/non/existing/resource2.js' is missing.") > -1,
                true,
                '.'
            );

            test.done();
        });
    },

    "test it reports error if at least one file is missing in target": function (test) {

        test.expect(1);

        exec('grunt checkExists:external_non_existing', execOptions, function(error, stdout) {

            test.equal(
                stdout.indexOf("Some files are missing. Be nice and fix 'em.") > -1,
                true,
                '.'
            );

            test.done();
        });
    },

    "test it reports unsupported argument types": function (test) {

        test.expect(1);

        exec('grunt checkExists:invalidMarkup', execOptions, function(error, stdout) {

            test.equal(
                stdout.indexOf("Non-supported argument type. Please use Arrays or JSON Objects") > -1,
                true,
                '.'
            );

            test.done();
        });
    }
};
