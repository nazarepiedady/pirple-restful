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

// Write data to a file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    function (error, fileDescriptor) {
      if (!error && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);

        // Write to file and close it
        fs.writeFile(fileDescriptor, stringData, function (error) {
          if (!error) {
            fs.close(fileDescriptor, function (error) {
              if (!error) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist");
      }
    }
  );
};

// Read data from a file
lib.read = function (dir, file, callback) {
  fs.readFile(
    lib.baseDir + dir + "/" + file + ".json",
    "utf8",
    function (error, data) {
      callback(error, data);
    }
  );
};

// Update data inside a file
lib.update = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    function (error, fileDescriptor) {
      if (!error && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);

        // Truncate the file
        fs.truncate(fileDescriptor, function (error) {
          if (!error) {
            // Write to the file and close it
            fs.writeFile(fileDescriptor, stringData, function (error) {
              if (!error) {
                fs.close(fileDescriptor, function (error) {
                  if (!error) {
                    callback(false);
                  } else {
                    callback("Error closing file");
                  }
                });
              } else {
                callback("Error writing to e");
              }
            });
          } else {
            callback("Error truncating file");
          }
        });
      } else {
        callback("Could not open the file for updating, it may not exist yet");
      }
    }
  );
};

// Delete a file
lib.delete = function (dir, file, callback) {
  // Unlink the file
  fs.unlink(lib.baseDir + dir + "/" + file + ".json", function (error) {
    if (!error) {
      callback(false);
    } else {
      callback("Error deleting file");
    }
  });
};

// Export the module
module.exports = lib;
