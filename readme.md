

The png map images for Orange were created using the share feature in OpenStreetMap to export png images at scales of 1:18500 and 1:9250. These scales result in png images of 889x1120 pixels and 1778x2239 pixels.

http://www.openstreetmap.org/#map=14/40.7656/-74.2371&layers=C

I used a bounding box of: 74.25792217254639,40.75106081688148,-74.21655178070068,40.790517023721634

After clicking the download button in the OpenStreetMap Share dialog the following HTTP GET request is made which renders the png image on the server and responds with an image attachment the browser downloads

Scale: 1:9250
http://render.openstreetmap.org/cgi-bin/export?bbox=-74.25792217254639,40.75106081688148,-74.21655178070068,40.790517023721634&scale=9250&format=png

Scale: 1:18500
http://render.openstreetmap.org/cgi-bin/export?bbox=-74.25792217254639,40.75106081688148,-74.21655178070068,40.790517023721634&scale=18500&format=png

The OpenStreetMap server doesn't support rendering and downloading images larger than about 1.8 MB.

OpenStreetMap has a tile useage policy viewable here: http://wiki.openstreetmap.org/wiki/Tile_usage_policy

At this point I am only downloaded the tiles for Orange at these two resolutions and using them in the prototype map. However we could setup our own copy of the OpenStreetMap server with just the map data for Orange NJ and the area right arounbd it. More information on setting up an OpenStreetMap server is avilable here: https://switch2osm.org/the-basics/

Both the software and data used by OpenstreetMap are freely available to be used by ither groups however the complete dataset available from http://planet.openstreetmap.org/ is about 43 GB -- so it makes sense to use just a subset of the data.

I used http://extract.bbbike.org/ to extract a subset of the complete OpenStreetMap dataset for Orange NJ and the surrounding towns:

http://extract.bbbike.org/?lang=en&sw_lng=-74.307&sw_lat=40.737&ne_lng=-74.147&ne_lat=40.842&format=osm.pbf&email=stephen.bannasch%40gmail.com&as=0.49049264141356974&pg=0.9926842214842408&coords=&oi=1&layers=B0000T&city=Orange+NJ&submit=extract

  Thanks - the input data looks good.

  It takes between 15-30 minutes to extract an area from planet.osm, depending on the size of the area and the system load. You will be notified by e-mail if your extract is ready for download. Please follow the instruction in the email to proceed your request. You can see the status of your request here.

  Area: 'Orange NJ' covers 156 square km
  Coordinates: -74.307,40.737 x -74.147,40.842
  Format: osm.pbf

This resulted in the following 500 KB dataset being prepared:

http://download.bbbike.org/osm/extract/planet_-74.307,40.737_-74.147,40.842.osm.pbf



https://github.com/openstreetmap/osm2pgsql
https://github.com/openstreetmap/mod_tile

http://mapnik.org/
https://github.com/mapnik/mapnik
https://github.com/mapnik/mapnik/wiki


http://leafletjs.com
https://github.com/Leaflet/Leaflet

Setting up an OSM server on a Mac:

  brew install icu4c --build-from-source
  brew install boost --build-from-source --with-icu4c
  brew install mapnik --with-cairo --with-gdal --with-postgresql
  brew install postgis
  brew install osm2pgsql --with-protobuf-c



createdb gis
psql -d gis -c 'CREATE EXTENSION postgis; CREATE EXTENSION hstore;'
osm2pgsql --create --database gis planet_-74.307,40.737_-74.147,40.842.osm.pbf


git clone https://github.com/gravitystorm/openstreetmap-carto

https://github.com/gravitystorm/openstreetmap-carto

