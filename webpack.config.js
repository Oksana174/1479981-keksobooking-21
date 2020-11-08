const path = require("path");
module.exports = {
  entry: [
    "./js/util.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/server.js",
    "./js/page-state.js",
    "./js/dragging.js",
    "./js/upload-photos.js",
    "./js/form.js",
    "./js/debounce.js",
    "./js/filtration.js",
    "./js/popup.js",
    "./js/map.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
