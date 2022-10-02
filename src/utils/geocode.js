const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5rdXJndXB0YTI1NSIsImEiOiJjanhpc2JjNnQwNjV4M3lsZmJ3am1yNDVpIn0.XEKF1OE9I2bxTposZFOLig";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to conncet to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find Location", undefined);
    } else {
      const Latitude = response.body.features[0].center[1];
      const Longitude = response.body.features[0].center[0];
      const Location = response.body.features[0].place_name;
      callback(undefined, { Latitude, Longitude, Location });
    }
  });
};

module.exports = geoCode;
