/*
 * Library for storing and editing data
 */

// Dependencies
var fs = require("fs");
var path = require("path");

// Container for the module (to be exported)
var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// Export the module
module.exports = lib;
