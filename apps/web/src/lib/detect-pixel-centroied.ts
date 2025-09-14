interface Point {
  x: number;
  y: number;
}

interface Polygon {
  points: Point[];
}

function parseWktPolygon(wkt: string): Polygon {
  const coordinatesStr = wkt.replace(/^POLYGON\(\(/, '').replace(/\)\)$/, '');

  const coordPairs = coordinatesStr.split(',').map(pair => pair.trim());

  const points: Point[] = [];

  for (const pair of coordPairs) {
    const [x, y] = pair.split(' ').map(Number);
    points.push({ x, y });
  }

  return { points };
}

function parseWktPoint(wkt: string): Point {
  const coordinatesStr = wkt.replace(/^POINT\(\s*/, '').replace(/\s*\)$/, '');

  const [x, y] = coordinatesStr.split(' ').map(str => str.trim());

  return {
    x: parseFloat(x),
    y: parseFloat(y)
  };
}

function bbox (points: Point[]) {
  const result  = [Infinity, Infinity, -Infinity, -Infinity];

  points.forEach(p => {
    if (p.x < result[0]) result[0] = p.x;
    if (p.y < result[1]) result[1] = p.y;
    if (p.x > result[2]) result[2] = p.x;
    if (p.y > result[3]) result[3] = p.y;
  });

  return result;
}

function calculateCentroid(polygon: Polygon): Point | undefined{ 
  const { points } = polygon;

  if (points.length < 3) {
    console.log('A polygon must have at least 3 points to calculate centroied');
    return undefined;
  }

  const ext = bbox(points);
  const x = (ext[0] + ext[2]) / 2;
  const y = (ext[1] + ext[3]) / 2;

  return { x, y };
}

export function getPolygonCenter(wkt: string): Point | undefined {
  if (wkt.includes('POINT')) {
    return parseWktPoint(wkt);
  } else {
    const polygon = parseWktPolygon(wkt);
    return calculateCentroid(polygon);
  }
}