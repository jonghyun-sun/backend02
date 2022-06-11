export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '나만의 미니프로제트 api 명세서',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.swagger.js'], // 파일 위치
  };