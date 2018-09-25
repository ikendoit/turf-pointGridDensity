import pointGrid from "../index.js";
import bbox from "@turf/bbox";

describe("Commons non densiti: ", () => {
  const goodPolygon = {
    type: "Polygon",
    coordinates: [
      [
        [-123.085452251299, 49.2634448191214],
        [-123.085194759233, 49.2561627791449],
        [-123.07523839937, 49.2562187989379],
        [-123.075925044878, 49.2504484262691],
        [-123.065133383552, 49.2452957574718],
        [-123.064918806831, 49.251402884913],
        [-123.065948775092, 49.2529155428632],
        [-123.06805162696, 49.254400143558],
        [-123.069682410041, 49.2561647995103],
        [-123.06976824073, 49.26252263984],
        [-123.073630621711, 49.2625506461352],
        [-123.073587706367, 49.2644550369193],
        [-123.077621748725, 49.2656032370231],
        [-123.07766466407, 49.26252263984],
        [-123.08131246833, 49.2625786524145],
        [-123.081097891609, 49.2634748449594],
        [-123.085452251299, 49.2634448191214]
      ]
    ]
  };

  it("Testing standard bbox", () => {
    const pointsInterp = pointGrid(
      [-70.823364, -33.553984, -70.473175, -33.302986],
      3,
      {}
    );
    expect(pointsInterp.type).toEqual("FeatureCollection");
    expect(pointsInterp.features.length).toEqual(110);
    expect(pointsInterp.features[0].geometry.type).toEqual("Point");
    expect(pointsInterp.features[0].geometry.coordinates.length).toEqual(2);
  });

  it("testing with polygon", () => {
    const pointsInterp = pointGrid(bbox(goodPolygon), 1, {
      units: "kilometres",
      densities: {
        latDen: 1 / 1000,
        lngDen: 1 / 1000
      },
      mask: goodPolygon
    });
    expect(pointsInterp.type).toEqual("FeatureCollection");
    expect(pointsInterp.features[0].geometry.type).toEqual("Point");
    expect(pointsInterp.features[0].geometry.coordinates.length).toEqual(2);
    expect(pointsInterp.features.length).toEqual(206);
  });

  it("testing with polygon", () => {
    const pointsInterp = pointGrid(bbox(goodPolygon), 1, {
      units: "kilometres",
      densities: {
        latDen: 1 / 1000,
        lngDen: 1 / 1000
      },
      mask: goodPolygon,
      rotation: 30
    });
    expect(pointsInterp.type).toEqual("FeatureCollection");
    expect(pointsInterp.features[0].geometry.type).toEqual("Point");
    expect(pointsInterp.features[0].geometry.coordinates.length).toEqual(2);
    expect(pointsInterp.features.length).toEqual(206);
  });
});
