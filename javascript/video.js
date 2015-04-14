var mainVideo,
    nextVideo,
    video1,
    video1Node,
    mp4Source1,
    webmSource1,
    subtitleTrack1,
    video2,
    vide2oNode,
    mp4Source2,
    webmSource2,
    subtitleTrack2,
    mainVideoAlmostOver = false,
    mainVideoStarted = false,
    preloadedMovementWaltzKey,
    preloadedInterviewWaltzKey,
    selected = null,
    imageContainer,
    stillImage,
    stillImageDiv,
    contentItemLocationTip,
    imageNumberTip,
    interview;


function showLocationTip(selection) {
  var loc = selection.location,
      contentItem = selection.contentItem,
      htmlContent = generateLocationString(loc);
  contentItemLocationTip.html(htmlContent);
  contentItemLocationTip.transition()
     .duration(200)
     .style("opacity", 0.9);
}

function hideLocationtip() {
  contentItemLocationTip.transition()
     .duration(200)
     .style("opacity", 0);
}

function updateLocationTip() {
  if (contentItemLocation.testing) {
    showLocationTip(selected);
  } else {
    hideLocationtip();
  }
}

function generateVideoKeyStr(contentItem) {
  var index_str = contentItemFormatter(contentItem.index);
  return index_str + "-" + contentItem.waltz + contentItem.contentItem;
}

function videoLoadError(e) {
  var contentItem = contentItemForLocation(contentItemLocation);
  console.log("video error: " + e + " for " + generateVideoKeyStr(mov));
}

function loadVideo(node) {
  node.load();
  // node.addEventListener('error', videoLoadError, false);
}

function loadVideoContentItem(selection, node) {
  var location = selection.location,
      contentItem = selection.contentItem,
      webmSource,
      mp4Source,
      subtitleTrack;

  webmSource = webmSource1;
  mp4Source = mp4Source1;


	mp4Source
		.attr("src", contentItem.video)
		.attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  loadVideo(node);
}

function transitionVideoOn() {
  mainVideoStarted = false;
  mainVideo.transition()
     .duration(200)
     .style("opacity", 1.0)
     .each("end", function() {
       mainVideoNode.play();
       setupVideoTimeListener(mainVideoNode);
       mainVideoAlmostOver = false;
       mainVideo.attr("controls", true );
      });
}


function videoReport() {
  console.log("currentTime: " + mainVideoNode.currentTime + " duration: " + mainVideoNode.duration);
}

function videoTimeListener(node) {
  var duration = mainVideoNode.duration,
      currentTime = mainVideoNode.currentTime;

  if (currentTime && currentTime/duration >= 0.05 && mainVideoStarted === false) {
    mainVideoStarted = true;
    videoReport();
  }
  if (currentTime && currentTime/duration >= 0.80 && mainVideoAlmostOver === false) {
    mainVideoAlmostOver = true;
    videoReport();
  }
}

function removeVideoTimeListener(node) {
  node.removeEventListener('timeupdate', videoTimeListener);
}

function setupVideoTimeListener(node) {
  node.addEventListener('timeupdate', videoTimeListener);
}

function videoEnded() {
	stopVideo(mainVideo);
	hideVideo(mainVideo);
}

function showVideo(vid) {
  var node = vid.node();
  if (node.readyState < 4) {
    node.addEventListener('canplaythrough', transitionVideoOn);
  } else {
    transitionVideoOn(vid);
  }
  node.addEventListener('ended', videoEnded);
}

function hideVideo(vid) {
  var node = vid.node();
  node.removeEventListener('canplaythrough', transitionVideoOn);
  removeVideoTimeListener(node);
  vid.transition()
     .duration(200)
     .style("opacity", 0.0)
     .each("end", function() {
       node.pause();
      });
}

function stopVideo(vid) {
  var node = vid.node();
  node.pause();
}

function handleResize() {
  setup();
}

function playContentItem() {
  loadVideoContentItem(selected, mainVideoNode);
  showVideo(mainVideo);
};

function videoInitialization() {

  // video1
  video1 = contentContainer.append("video")
      .attr("id", "video1")
      .attr("controls", null)
      .attr("preload", "auto")
      .style("opacity", 0.0);

  video1Node = video1.node();

  webmSource1 = video1.append("source")
      .attr("id", "webm")
      .attr("type", 'video/webm;');

  mp4Source1 = video1.append("source")
      .attr("id", "mp4")
      .attr("type", 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  mainVideo = video1;
  mainVideoNode = video1Node;

  mainVideo.transition()
     .duration(200)
     .style("opacity", 1.0);
};

function playVideo() {
  stopVideo(mainVideo);
  showVideo(mainVideo);
	playContentItem();
};
