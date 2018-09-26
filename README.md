# This is a copy of https://github.com/Turfjs/turf/tree/master/packages/turf-point-grid, with additional features. I will attemp to make a PR soon.
# @turf/point-grid

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## pointGrid

Creates a [Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) grid from a bounding box, [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3) or [Feature](https://tools.ietf.org/html/rfc7946#section-3.2).

**Parameters**

-   `bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** extent in [minX, minY, maxX, maxY] order
-   `cellSide` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the distance between points, in units
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional parameters (optional, default `{}`)
    -   `options.units` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** used in calculating cellSide, can be degrees, radians, miles, or kilometers (optional, default `'kilometers'`)
    -   `options.mask` **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;([Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) \| [MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.7))>?** if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
    -   `options.properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** passed to each point of the grid (optional, default `{}`)
    -   `options.densities` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object of {latDen, lngDen} indicating width and height between cells (optional, default `{}`)
    -   `options.rotation` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The Decimal Degree Value to rotate the resulting features in counter-clockwise. (optional, default `0`)

**Examples**

```javascript
var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
var cellSide = 3;
var options = {units: 'miles'};

var grid = turf.pointGrid(extent, cellSide, options);

//addToMap
var addToMap = [grid];
```

Returns **[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)&lt;[Point](https://tools.ietf.org/html/rfc7946#section-3.1.2)>** grid of points

<!-- This file is automatically generated. Please don't edit it directly:
if you find an error, edit the source file (likely index.js), and re-run
./scripts/generate-readmes in the turf project. -->

---

This module is part of the [Turfjs project](http://turfjs.org/), an open source
module collection dedicated to geographic algorithms. It is maintained in the
[Turfjs/turf](https://github.com/Turfjs/turf) repository, where you can create
PRs and issues.

### Installation

Install this module individually:

```sh

$ npm install turf-pointgriddensity 

```

### Testing: 

```sh
  npm install --dev jest 
  npm install babel-preset-env
  npm test
```

### What I changed:

## Set custom lat-lng spacing between cells. Originally, we passed 1 value for both lat and lng.
![Image description](https://imgur.com/a/qVwzLgz)

## Set rotation, so that we can rotate points.
![Image description](https://imgur.com/a/P8pEKDp)

note: the example is passing a polygon mask.

