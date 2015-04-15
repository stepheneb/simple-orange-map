var map,
    mapImage,
    svg,
    svgContainer,
    node,
    nodeEnter,
    circle,
    label,
    tooltip,
    selected = null;

function pulseSelectedLocationCircle() {
  setInterval(function(){
    var selectedCircle = d3.select("circle.selected.waltz.location");
    selectedCircle
        .transition()
        .duration(500)
        .style("fill-opacity", 0.6)
        .style("fill", "#ff8000")
        .style("stroke-width", circleStrokeWidth*1.1)
        .attr("r", circleRadius*0.9)
        .transition()
        .duration(500)
        .style("fill-opacity", 0.3)
        .style("fill", "#80ffff")
        .style("stroke-width", circleStrokeWidth)
        .attr("r", circleRadius*1.0);
  },1000);
}

function renderLocationCircles() {
  nodeEnter
    .attr("transform", function(loc) {
      return "translate(" + loc.x + "," + loc.y + ")";
    });

  circle
    .classed("selected", function(loc) {
      return selected && selected.location === loc;
    })
    .attr("r", circleRadius)
    .style("stroke-width", function(loc) {
      if (selected && selected.location === loc) {
        return circleStrokeWidth * 1.5;
      } else {
        return circleStrokeWidth;
      }
    });

  label
    .attr("transform","translate(0," + fontSizeInPixels/2 + ")")
    .classed("selected", function(loc) {
      return selected && selected.location === loc ? true : false;
    })
}

function resizeTooltip(loc) {
  var cnode = d3.select('circle[data-address="' + loc.address + '"]').node(),
      cx = +cnode.getAttribute('cx'),
      cy = +cnode.getAttribute('cy'),
      ctm = cnode.getCTM(),
      xpos = ctm.e + cx*ctm.a,
      ypos = ctm.f + cy*ctm.d,
      html,
      height,
      width;

  function tooltipPosLeft(width) {
    if (xpos + 8 + width > contentWidth ) {
      return contentWidth - width;
    } else if (xpos + 8 < 0) {
      return 0;
    } else {
      return xpos + 8;
    }
  }

  function tooltipPosTop(height) {
    if (ypos - 12 < 0) {
      return 0;
    } else if (ypos - 12 + height > contentHeight) {
      return contentHeight - height;
    } else {
      return ypos - 12;
    }
  }

  height = tooltip.node().offsetHeight;
  width = tooltip.node().offsetWidth;
  tooltip
      .style("left", tooltipPosLeft(width) + "px")
      .style("top", tooltipPosTop(height) + "px");
}

function showTooltip(loc) {
  var mov = contentItemForLocation(loc),
      htmlContent = loc.address;

  tooltip.html(htmlContent);
  if (testing) {
    tooltip.append("div")
      .attr("class", "details")
      .html("mov: " + mov.index + " loc: " + loc.index +
            "<br/> pixel: " + pixelFormatter(loc.x) + ", " + pixelFormatter(loc.y));
  }
  resizeTooltip(loc);
  tooltip.transition()
     .duration(200)
     .style("opacity", 0.7)
     .style("background-color", "rgba(255,255,255, 0)");
}

function hideTooltip() {
  tooltip.transition()
     .duration(200)
     .style("opacity", 0)
     .style("background-color", "rgba(255,255,255, 0)");
}

function resizeSVG() {
  svg.attr("width",  contentWidth)
     .attr("height", contentHeight);
}

function handleResize() {
  setup();
  resizeSVG();
  renderLocationCircles();
  if (selected) {
    resizeTooltip(selected.location);
  }
}

function findClickedOnLocation(clickPos) {
  var minDistance = circleRadius,
      x = clickPos[0],
      y = clickPos[1],
      index = -1,
      d;
  for (i = 0; i < contentItemLocations.length; i++) {
    dx = contentItemLocations[i].x - x;
    dy = contentItemLocations[i].y - y;
    d = Math.sqrt(dx * dx + dy * dy);
    if (d < minDistance) {
      minDistance = d;
      index = i;
    }
  }
  if (index == -1) {
    return null;
  } else {
    return contentItemLocations[index];
  }
}

function updateContentItem(eventType, eventData) {
  var loc = selected.location;
  currentItem.rendered = true;
  renderLocationCircles();
  showTooltip(loc);
  console.log("map: updateContentItem: eventType: " + eventType + ", eventData: " + eventData);
  console.log("map: " + generateLocationString(loc));
}

function setupContentItemForThisLocation(loc) {
  var contentItemList,
      contentItemNum = loc.previousContentItemNum;
  if (loc.contentItem.length > 1) {
    contentItemList = contentItemForLocation(loc);
    index = contentItemList.indexOf(loc.previousContentItemNum);
    if (index !== -1) {
      index++;
      if (index >= loc.contentItem.length) {
        index = 0;
      }
      contentItemNum = contentItemList[index];
    }
  }
  resetLocationContentItemIndiciesForContentItem(contentItemNum);
  return contentItemNum;
}

function finishStartup() {
  setup();

  setupFullScreenSupport();

  fullScreenLink = d3.select('body').append("div")
      .attr("class", "fullscreen")
      .style("z-index", 4)
      .on("click", function(loc) {
        if (!isFullscreen()) {
          requestFullscreenMethod.call(document.body);
        } else {
          if (testing) {
            document.cancelFullscreenMethod();
          }
        }
      });

  svgContainer = d3.select('body').append("div")
      .attr("id", "svg-container");

  svg = svgContainer.append("svg")
      .attr("class", "map-svg");

  resizeSVG();

  tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0.7)
      .style("z-index", 3);

  node = svg.selectAll("g")
      .data(contentItemLocations);

  nodeEnter = node.enter().append("g")
      .attr("transform", function(loc) {
        return "translate(" + loc.x + "," + loc.y + ")";
      });

  circle = nodeEnter
      .append("circle")
          .attr("class", "location")
          .attr("data-address", function(loc) { return loc.address; })
          .attr("r", circleRadius)
          .style("stroke-width", circleStrokeWidth)
          .style("opacity", 0.7)
          .style("z-index", 2)
          .on("mouseover", function(loc) {
          })
          .on("mouseout", function(loc) {
          })
          .on("mousedown", function(loc) {
          });

  label = nodeEnter
      .append("text")
        .attr("class", "location")
        .attr("transform","translate(0," + fontSizeInPixels/2 + ")")
        .style("text-anchor","middle");

  renderLocationCircles();
  pulseSelectedLocationCircle();

  videoInitialization();

  svg.on("mousedown", function (e) {
    var clickPos = d3.mouse(this),
        newLoc = findClickedOnLocation(clickPos),
        newContentItem,
        eventType,
        i;

    hideTooltip();
    console.log("map: mousedown: " + clickPos);

    stopVideo(mainVideo);
    hideVideo(mainVideo);
    if (newLoc) {
      selected = {};
      newContentItem = contentItemForLocation(newLoc);
      selected.contentItem = newContentItem;
      selected.location = newLoc;
      playVideo();
    }

  });

  window.onresize = handleResize;
  addFullScreenChangeListener(handleResize);

  // disable tap and hold context menu
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  }, false);
}

window.addEventListener("load", function(event) {
  console.log("DOM fully loaded and parsed, stylesheets and images loaded");
  mapImage = document.getElementById('map-image');
  if (mapImage.complete) {
    finishStartup();
  } else {
    mapImage.addEventListener('load', finishStartup);
  }
});
