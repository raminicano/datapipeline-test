# 🍴 레스토랑 데이터 파이프라인 프로젝트

이 레포지토리는 **레스토랑 데이터 파이프라인 프로젝트**를 담고 있습니다! 🚀 이 프로젝트는 50만 건의 레스토랑 데이터를 업데이트하고 처리하기 위한 데이터 파이프라인을 구현하였으며, **순차적 처리**, **최적화된 비동기 처리**, **멀티스레드 처리**와 같은 다양한 방법론을 사용하여 대규모 데이터 처리를 효율적으로 다루는 방법을 탐구합니다. 🥳

[구현한 내용을 작성한 내용](https://velog.io/@raminicano/%EB%A7%A4%EC%9D%BC-50%EB%A7%8C%ED%96%89-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EC%A0%80%EC%9E%A5%ED%95%98%EB%8A%94-%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8-%EC%83%9D%EC%84%B1%EA%B8%B0)이에요!

## 📂 프로젝트 구조

다음은 레포지토리의 프로젝트 구조에 대한 간단한 설명입니다:

```
.
├── README.md                        # 프로젝트 문서 (지금 보고 있는 파일!)
├── nest-cli.json                    # NestJS CLI 설정 파일
├── package-lock.json                # NPM 패키지 잠금 파일
├── package.json                     # NPM 패키지 설정 파일
├── src                              # 소스 코드 디렉토리
│   ├── app.controller.spec.ts       # AppController 단위 테스트
│   ├── app.controller.ts            # 메인 애플리케이션 컨트롤러
│   ├── app.module.ts                # 애플리케이션의 루트 모듈
│   ├── app.service.ts               # 메인 애플리케이션 서비스
│   ├── common                       # 공통 유틸리티 및 설정
│   │   ├── database.config.ts       # 데이터베이스 설정 파일
│   │   ├── preprocessing.ts         # 데이터 전처리 함수들
│   │   ├── utils.ts                 # 유틸리티 함수들
│   │   └── worker.ts                # 워커 스레드 스크립트
│   ├── main.ts                      # 애플리케이션 진입점
│   ├── optimized                    # 최적화된 비동기 처리 구현
│   │   ├── dto                      # 최적화된 방법론용 DTO
│   │   │   └── optimized.dto.ts
│   │   ├── optimized.controller.ts  # 최적화된 처리용 컨트롤러
│   │   ├── optimized.module.ts      # 최적화된 처리용 모듈
│   │   └── optimized.service.ts     # 최적화된 처리용 서비스
│   ├── restaurant                   # 레스토랑 엔티티 및 관련 서비스
│   │   ├── entity
│   │   │   ├── location.entity.ts   # 위치 엔티티
│   │   │   └── restaurant.entity.ts # 레스토랑 엔티티
│   │   ├── restaurant.controller.ts # 레스토랑 운영 관련 컨트롤러
│   │   ├── restaurant.module.ts     # 레스토랑 운영 관련 모듈
│   │   └── restaurant.service.ts    # 레스토랑 운영 관련 서비스
│   ├── sequential                   # 순차적 처리 구현
│   │   ├── dto
│   │   │   └── sequential.dto.ts
│   │   ├── sequential.controller.ts # 순차적 처리용 컨트롤러
│   │   ├── sequential.module.ts     # 순차적 처리용 모듈
│   │   └── sequential.service.ts    # 순차적 처리용 서비스
│   └── thread                       # 멀티스레드 처리 구현
│       ├── dto
│       │   └── thread.dto.ts        # 멀티스레드 방법론용 DTO
│       ├── thread.controller.ts     # 멀티스레드 처리용 컨트롤러
│       └── thread.service.ts        # 멀티스레드 처리용 서비스
├── struct.txt                       # 프로젝트 구조 파일
├── test                             # 테스트 디렉토리
│   ├── app.e2e-spec.ts              # 애플리케이션의 E2E 테스트
│   └── jest-e2e.json                # E2E 테스트를 위한 Jest 설정 파일
├── tsconfig.build.json              # TypeScript 빌드 설정 파일
└── tsconfig.json                    # TypeScript 설정 파일
```

## 💻 프로젝트 실행 방법

### 1. 레포지토리 클론

```bash
git clone https://github.com/raminicano/restaurant-data-pipeline.git
cd restaurant-data-pipeline
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

루트 디렉토리에 `.env` 파일을 생성하고, 공공 API 설정을 입력하세요 원래대로라면 데이터베이스 설정을 Env에 넣어야했으나 우선 localhost 등으로 하드코딩했습니다~!:

```plaintext
API_KEY=your_api_key
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=1234
DATABASE_NAME=sns
```

### 4. 애플리케이션 실행

애플리케이션을 실행하려면 다음 명령어를 사용하세요:

```bash
npm run start
```

## 🛠️ 방법론 개요

이 프로젝트에서는 50만 건의 레스토랑 데이터를 처리하고 업데이트하기 위해 세 가지 다른 방법론을 구현했습니다. 각 방법론의 작동 방식은 다음과 같습니다:

### 1. **순차적 처리** 🐢

- **설명**: 데이터를 하나씩 순차적으로 처리합니다.
- **장점**: 구현이 간단하고 직관적입니다.
- **단점**: 처리 속도가 느리고, CPU 리소스를 비효율적으로 사용합니다.
- **성능**:
  - 처리 시간: `222,976 ms`
  - CPU 사용량: `최대 21%`

### 2. **최적화된 비동기 처리** 🚀

- **설명**: 비동기 I/O와 해시 인덱스를 사용하여 효율적으로 데이터를 처리합니다.
- **장점**: 빠른 처리 속도와 효율적인 CPU 사용이 가능합니다. I/O 바운드 작업에 최적화되어 있습니다.
- **단점**: 구현이 복잡하며, 특정 시나리오에만 최적화 효과가 있습니다.
- **성능**:
  - 처리 시간: `16,833 ms`
  - CPU 사용량: `최대 38%`

### 3. **멀티스레드 처리** ⚙️

- **설명**: 멀티스레드를 사용하여 병렬로 데이터를 처리합니다.
- **장점**: CPU 병렬 처리로 작업 속도를 향상시킬 수 있습니다.
- **단점**: 높은 CPU 사용량과 스레드 관리 오버헤드가 발생할 수 있습니다.
- **성능**:
  - 처리 시간: `26,140 ms`
  - CPU 사용량: `최대 99%`


| 처리 방식            | 처리 시간 (ms) | CPU 사용량 (%) |
|--------------------|---------------|---------------|
| 순차적 처리         | 222,976       | 최대 21%      |
| 최적화된 비동기 처리 | 16,833        | 최대 38%      |
| 멀티스레드 처리     | 26,140        | 최대 99%      |



## 📊 인사이트 및 학습 내용

이번 프로젝트를 통해 다양한 데이터 처리 방법론을 비교하고 성능을 분석한 결과, 여러 가지 중요한 인사이트를 얻을 수 있었습니다:

- **Node.js와 비동기 I/O**: Node.js의 이벤트 기반 아키텍처는 비동기 I/O 작업에 매우 적합하며, 최적화된 방법론이 이를 잘 활용하여 성능 향상에 큰 기여를 했습니다.
- **멀티스레드 처리**: 멀티스레드는 CPU 집약적인 작업에서는 효과적이지만, I/O 바운드 작업에서는 오버헤드가 발생하여 성능이 저하될 수 있습니다. 따라서 작업의 특성에 따라 적절한 방법론을 선택하는 것이 중요합니다.
- **방법론 선택의 중요성**: 각 방법론은 상황에 따라 적합성이 다르며, 이번 테스트를 통해 비동기 I/O가 대규모 I/O 바운드 작업에 가장 적합하다는 것을 확인할 수 있었습니다.

## ✨ 결론

이 레포지토리는 Node.js 환경에서 다양한 데이터 처리 방법론을 비교하고, 각각의 장단점을 분석한 실습 프로젝트입니다. 이 프로젝트에서 얻은 경험은 실제 백엔드 개발에서 데이터 파이프라인의 효율성을 극대화하는 데 중요한 참고 자료가 될 것입니다. 🚀

해당 코드의 결과는 [이 레포](https://github.com/P1J3/loc-based-restau-recommendation-service)에서 구현되었어요!

코드를 자유롭게 탐색하고, 직접 테스트해 보세요! 궁금한 점이나 제안 사항이 있다면 언제든지 연락주세요. 즐거운 코딩 되세요! 😄

---

**만든 이: 송윤주 💻**

---
