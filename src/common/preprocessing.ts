import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entity/restaurant.entity';
import { Location } from '../restaurant/entity/location.entity';
import { convertCoordinates } from './utils';

export async function processAndSaveData(
  rawData: any[],
  restaurantRepository: Repository<Restaurant>,
  locationRepository: Repository<Location>,
) {
  for (const item of rawData) {
    // 필터링 조건: 폐업일이 존재하거나 필수 데이터가 없는 경우
    if (item.DCBYMD || !item.X || !item.Y || !item.BPLCNM || !item.LASTMODTS) {
      continue;
    }
    // 주소에서 도/시, 시/군/구 정보 추출
    const addressParts = item.SITEWHLADDR.split(' ');
    const doSi = addressParts[0].substring(0, 2);
    const sgg = addressParts[1];

    // 좌표 변환
    const { lat, lon } = convertCoordinates(
      parseFloat(item.X),
      parseFloat(item.Y),
    );

    // location 테이블에서 도/시와 시/군/구로 위치 ID 찾기
    const location = await locationRepository.findOne({
      where: { doSi, sgg },
    });

    if (!location) {
      continue; // 해당 위치가 없으면 스킵
    }

    // 새로운 레스토랑 엔티티 생성 및 데이터 매핑
    const restaurant = new Restaurant();
    restaurant.name = item.BPLCNM;
    restaurant.type = item.UPTAENM;
    restaurant.lat = lat.toString();
    restaurant.lon = lon.toString();
    restaurant.address = item.SITEWHLADDR;
    restaurant.createdAt = new Date(item.APVPERMYMD);
    restaurant.updatedAt = new Date(item.LASTMODTS);
    restaurant.location = location;

    console.log(restaurant);
    // 레스토랑 데이터를 데이터베이스에 저장
    await restaurantRepository.save(restaurant);
  }
}
