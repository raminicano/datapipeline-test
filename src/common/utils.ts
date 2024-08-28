import * as proj4 from 'proj4';

// // EPSG:2097 (TM 중부 원점) 정의
// proj4.defs(
//   'EPSG:2097',
//   '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43',
// );

// EPSG:5174 (보정된 중부원점 좌표계) 정의
proj4.defs(
  'EPSG:5174',
  '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43',
);

// EPSG:4326 (WGS84) 정의
proj4.defs('EPSG:4326', proj4.WGS84);

export function convertCoordinates(
  x: number,
  y: number,
): { lat: number; lon: number } {
  // EPSG:2097 -> EPSG:5174 변환
  //   const [x5174, y5174] = proj4('EPSG:2097', 'EPSG:5174', [x, y]);

  // EPSG:5174 -> EPSG:4326 (WGS84) 변환
  const [lon, lat] = proj4('EPSG:5174', 'EPSG:4326', [x, y]);

  // 결과 반환
  return { lat: parseFloat(lat.toFixed(6)), lon: parseFloat(lon.toFixed(6)) };
}
