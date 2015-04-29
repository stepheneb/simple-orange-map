var mapdata,
    locations;

mapdata = {
  "src": "images/orange-889x1119.png",
  "width": 889,
  "height": 1119,
  "registration": {
    "topleft": {
      "googlemap": "https://www.google.com/maps/place/40%C2%B047'17.6%22N+74%C2%B015'22.4%22W/@40.78822,-74.256229,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0",
      "address": "511 Prospect Ave West Orange, NJ 07052, USA",
      "longitude": -74.256229,
      "latitude": 40.788220,
      "x_pixel": 36,
      "y_pixel": 67
    },
    "topright": {
      "googlemap": "https://www.google.com/maps/place/40%C2%B047'14.9%22N+74%C2%B013'04.5%22W/@40.787468,-74.217927,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0",
      "address": "631-633 Thomas Blvd East Orange, NJ 07017, USA",
      "longitude": -74.217927,
      "latitude": 40.787468,
      "x_pixel": 855,
      "y_pixel": 88
    },
    "bottomleft": {
      "googlemap": "https://www.google.com/maps/place/40%C2%B045'24.0%22N+74%C2%B015'16.5%22W/@40.756667,-74.254588,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0",
      "address": "98 W Montrose Ave South Orange, NJ 07079, USA",
      "longitude": -74.254571,
      "latitude": 40.756654,
      "x_pixel": 71,
      "y_pixel": 960
    },
    "bottomright": {
      "googlemap": "https://www.google.com/maps/place/40%C2%B045'13.0%22N+74%C2%B013'09.1%22W/@40.75362,-74.219187,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0",
      "address": "157 Shepard Ave East Orange, NJ 07018, USA",
      "longitude": -74.219187,
      "latitude": 40.753620,
      "x_pixel": 831,
      "y_pixel": 1045
    }
  }
};

narrativeCategories = {
  "live": {
    "title": "Live",
    "description": "Stories about living in Orange."
  },
  "learn": {
    "title": "Learn",
    "description": "Stories about learning in Orange."
  },
  "work": {
    "title": "Work",
    "description": "Stories about working in Orange."
  },
  "play": {
    "title": "Play",
    "description": "Stories about playing in Orange."
  }
};

locationAndContentData = {
  "locations": [
    {
      "address": "451 Lincoln Ave",
      "latitude": 40.763261,
      "longitude": -74.243237,
      "contentItems": [
        0
      ]
    },
    {
      "address": "475 South Jefferson Street",
      "latitude": 40.764822,
      "longitude": -74.246701,
      "contentItems": [
        1
      ]
    },
    {
      "address": "Highway 280",
      "latitude": 40.767493,
      "longitude": -74.226182,
      "contentItems": [
        2
      ]
    }
  ],
  "contentItems": [
    {
      "index": 0,
      "title": "Oakwood Bridge Club",
      "video": "media/video/480x270/Hidden_Treasures_of_Our_Orange_Oakwood_Bridge_Cl",
      "categories": [ "learn" ],
      "location": 0
    },
    {
      "index": 1,
      "title": "Hidden Treasures of Orange, Hat City and No Name Factory",
      "video": "media/video/480x270/Hidden_Treasures_of_Our_Orange_Hat_City_No_Name",
      "categories": [ "live" ],
      "location": 1
    },
    {
      "index": 2,
      "title": "Highway 280",
      "video": "media/video/480x270/Hidden_Treasures_of_Our_Orange_Highway_280_with",
      "categories": [ "learn" ],
      "location": 2
    }
  ]
};
