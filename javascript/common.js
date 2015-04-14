// common variables and functions
//
// Available video resolutions:
//
//   "480x270"
//   "960x540"
//   "1920x1080"

var videoResolution = "480x270";

// When testing = true
// A label with waltz/movement, address, and video resolution
// is displayed on the video page along with playback controls.
// Additional information is also included in the movement popup
// labels that appear on the map.
//
// When testing = false
// No label or controls appear on the video page and simpler
// movement popup labels appear on the map page.

var testing = false;

var contentContainer,
    contentWidth,
    contentHeight,
    contentMaxDist,

    circleRadius,
    circleStrokeWidth,

    topleft,
    bottomright,

    originalMapWidth,
    originalMapHeight,

    mapScaleFactorX,
    mapScaleFactorY,

    mainTransformationMatrix4,
    scaledTransformationMatrix4,

    fontSizeInPixels,

    contentItems,
		contentItemLocations,
    contentItemLocation,

		currentItem,

    selected,

    contentItemFormatter = d3.format("03d"),
    pixelFormatter = d3.format("f"),
    latLonFormatter = d3.format(".3f");

// utility functions

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function flattenArray(a) {
  return a.reduce(function (j,k) { return j.concat(k); }, []);
}

// initialization and setup functions

function resizeDocumentFont() {
  fontSizeInPixels = contentWidth/960 * 12;
  document.body.style.fontSize = fontSizeInPixels + 'px';
}

function getPixelLocFromGeo(lon, lat) {
  var point = vec3.transformMat4(vec3.create(), [lon, lat, 1], scaledTransformationMatrix4);
  return [
    point[0]/point[2],
    point[1]/point[2]
  ];
}

function initializeLocations() {
  var scale = vec3.fromValues(mapScaleFactorX, mapScaleFactorY, 1),
      i = 0;
  contentItemLocations = locationAndContentData.locations;
  contentItemLocations.forEach(function (loc) {
    var point = getPixelLocFromGeo(loc.longitude, loc.latitude, scaledTransformationMatrix4);
    loc.x = point[0];
    loc.y = point[1];
    loc.contentItemIndex = 0;
    loc.index = i;
    i++;
  });
}

function initializeContentItems() {
  contentItems = locationAndContentData.contentItems;
}


function setupTransformation() {
  var topleft = mapdata.registration.topleft;
      topright = mapdata.registration.topright;
      bottomleft = mapdata.registration.bottomleft;
      bottomright = mapdata.registration.bottomright;
      originalMapWidth = mapdata.width;
      originalMapHeight = mapdata.height;

  mapScaleFactorX = contentWidth/originalMapWidth;
  mapScaleFactorY = contentHeight/originalMapHeight;

  scaledTransformationMatrix4 = transform2d(
    topleft.longitude, topleft.latitude,
    topright.longitude, topright.latitude,
    bottomleft.longitude, bottomleft.latitude,
    bottomright.longitude, bottomright.latitude,
    topleft.x_pixel*mapScaleFactorX, topleft.y_pixel*mapScaleFactorY,
    topright.x_pixel*mapScaleFactorX, topright.y_pixel*mapScaleFactorY,
    bottomleft.x_pixel*mapScaleFactorX, bottomleft.y_pixel*mapScaleFactorY,
    bottomright.x_pixel*mapScaleFactorX, bottomright.y_pixel*mapScaleFactorY);
  }

function setup() {
  contentContainer = d3.select('#content-container');
  contentWidth = contentContainer.node().offsetWidth;
  contentHeight = contentContainer.node().offsetHeight;
  contentMaxDist = Math.sqrt(contentWidth * contentWidth + contentHeight * contentHeight);

  circleRadius = contentWidth/80;
  circleStrokeWidth = circleRadius/4;

  setupTransformation();

  resizeDocumentFont();

  initializeContentItems();
  initializeLocations();
}

// relational functions

function contentItemByIndex(index) {
  return contentItems.filter(function(obj) {
      // coerce both obj.index and index to numbers for val & type comparison
      return +obj.index === +index;
  })[ 0 ];
}

function contentItemForLocation(loc) {
  var index = loc.contentItems[loc.contentItemIndex];
  return contentItemByIndex(index);
}

function contentItemNumForLocation(loc) {
  var index = loc.contentItems[loc.contentItemIndex];
  return contentItemByIndex(index);
}

// string generators

function generateKeyForItem(item) {
  return "" + item.title;
}

function generateLocationString(loc) {
  var item = contentItemForLocation(loc);
  return generateKeyForItem(item) + " (" + item.index + "): " +
           loc.address;
}

