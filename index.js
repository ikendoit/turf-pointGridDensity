import within from '@turf/boolean-within';
import distance from '@turf/distance';
import transformRotate from '@turf/transform-rotate';
import {getType} from '@turf/invariant';
import {point, featureCollection, isObject, isNumber} from '@turf/helpers';

/**
 * Creates a {@link Point} grid from a bounding box, {@link FeatureCollection} or {@link Feature}.
 *
 * @name pointGrid
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide the distance between points, in units
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] used in calculating cellSide, can be degrees, radians, miles, or kilometers
 * @param {string} [options.rotation=0] if passed, the point grid will rotate <rotation> degree
 * @param {string} [options.spacings={}] if passed, the cells will have <width, height> as in spacings.lngSpacing and spacings.latSpacing
 * @param {Feature<Polygon|MultiPolygon>} [options.mask] if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @param {Object} [options.properties={}] passed to each point of the grid
 * @returns {FeatureCollection<Point>} grid of points
 * @example
 * var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
 * var cellSide = 3;
 * var options = {units: 'miles'};
 *
 * var grid = turf.pointGrid(extent, cellSide, options);
 *
 * //addToMap
 * var addToMap = [grid];
 */
function pointGrid(bbox, cellSide, options) {

  if (!bbox) bbox = [0,0,0,0] 
  if (!cellSide) cellSide = 1
  
  // Optional parameters
  options = options || {};
  if (!isObject(options)) throw new Error('options is invalid');
  // var units = options.units;
  const {
    mask,
    properties,
    spacings,
    rotation,
  } = options

  // Containers
  let results = [];

  // Input Validation
  if (!isNumber(cellSide) && !spacings) throw new Error('cellSide is invalid');
  if (!Array.isArray(bbox) && !mask) throw new Error('bbox must be array');
  if (bbox.length !== 4 && !mask) throw new Error('bbox must contain 4 numbers');
  if (mask && ['Polygon', 'MultiPolygon'].indexOf(getType(mask)) === -1) throw new Error('options.mask must be a (Multi)Polygon');

  let west = bbox[0];
  let south = bbox[1];
  let east = bbox[2];
  let north = bbox[3];

  if (mask && rotation && rotation !== 0) {
    // if we pass mask and rotation, 
    // bboxWidth height must be bigger in case of rotation 90 degree
    const diagonalValue = Math.sqrt((west-east)**2+(south-north)**2)
    west -= diagonalValue
    east += diagonalValue
    south -= diagonalValue
    north += diagonalValue
  }

  let xFraction = cellSide / (distance([west, south], [east, south], options));
  let cellWidth = xFraction * (east - west);
  let yFraction = cellSide / (distance([west, south], [west, north], options));
  let cellHeight = yFraction * (north - south);
  let rotationValue = 0;

  if (spacings) {
    cellWidth = spacings.lngSpacing 
    cellHeight = spacings.latSpacing
  }

  var bboxWidth = (east - west);
  var bboxHeight = (north - south);

  const columns = Math.floor(bboxWidth / cellWidth);
  const rows = Math.floor(bboxHeight / cellHeight);
  // adjust origin of the grid
  const deltaX = (bboxWidth - columns * cellWidth) / 2;
  const deltaY = (bboxHeight - rows * cellHeight) / 2;

  var currentX = west + deltaX;
  while (currentX <= east) {
      var currentY = south + deltaY;
      while (currentY <= north) {
          var cellPt = point([currentX, currentY], properties);
          results.push(cellPt);
          currentY += cellHeight;
      }
      currentX += cellWidth;
  }

  if (rotation){
    rotationValue = rotation
    results = transformRotate(featureCollection(results), rotationValue)
  } else {
    results = featureCollection(results)
  }

  if (mask) {
    results.features = results.features.filter(point => within(point, mask))
  } 

  return results;

}

export default pointGrid
