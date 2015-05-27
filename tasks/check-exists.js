/*
 * grunt-check-exists
 * https://github.com/BrightTALK/grunt-check-exists
 *
 * Copyright (c) 2015 Martynas Eskis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('checkExists', 'Making sure important files exist', function () {

        var haveFailed = false;

        var reportMissingFile = function (filename) {

            haveFailed = true;
            grunt.log.error("File '" + filename + "' is missing...");
        };

        var checkFileExists = function (filename) {

            if (!grunt.file.exists(filename)) {

                reportMissingFile(filename);
            }
        };

        grunt.log.writeln("Checking '" + this.target + "'...");

        if (Array === this.data.constructor) {

            this.data.forEach(function (filename) {

                checkFileExists(filename);
            });

        } else if (Object === this.data.constructor) {

            for (var destination in this.data) {

                if (this.data.hasOwnProperty(destination)) {

                    this.data[destination].forEach(checkFileExists());
                }
            }
        }

        if (haveFailed) {

            grunt.fail.fatal("Some files are missing. Be nice and fix 'em", 3);
        }
    });
};
