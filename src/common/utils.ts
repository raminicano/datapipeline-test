import * as proj4 from 'proj4';

// EPSG:2097 (TM 중부 원점) -> EPSG:4326 (WGS84)
proj4.defs(
  'EPSG:2097',
  '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs',
);

export function convertCoordinates(
  x: number,
  y: number,
): { lat: number; lon: number } {
  // 좌표 변환 수행
  const [lon, lat] = proj4('EPSG:2097', 'EPSG:4326', [x, y]);
  return { lat, lon };
}
