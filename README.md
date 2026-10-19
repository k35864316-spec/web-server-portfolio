# 개인 포트폴리오

Next.js + TypeScript + MongoDB(Mongoose)로 만든 개인 포트폴리오 홈페이지입니다. (웹서버보안프로그래밍 중간 발표용)

- 소개·기술·프로젝트 내용은 MongoDB 의 `profiles` 컬렉션에서 읽어 서버에서 렌더링합니다.
- 방명록(`/api/guestbook`)은 MongoDB 의 `guests` 컬렉션에 저장됩니다.
- DB 에 연결할 수 없으면 기본 내용(`src/lib/profileData.ts`)으로 화면을 보여 줍니다.

## 내용 수정
`src/lib/profileData.ts` 만 고치면 됩니다. 배포 후 첫 접속 때 MongoDB 의 내용이 자동으로 갱신됩니다.

## 실행
```bash
npm install
cp .env.example .env.local   # MONGODB_URI 입력 (끝에 /portfolio 처럼 DB 이름 포함)
npm run dev                  # http://localhost:3000
```

## 배포 (Vercel)
1. GitHub 에 저장소를 올리고 Vercel 에서 Import 합니다.
2. Environment Variables 에 `MONGODB_URI` 를 추가하고 배포합니다. (값을 바꾸면 Redeploy 필요)
3. MongoDB Atlas 의 Network Access 에 `0.0.0.0/0` 이 허용돼 있어야 합니다.

## 관련 링크
- SafeBoard 저장소: https://github.com/k35864316-spec/safeboard
- SafeBoard 배포 주소: https://safeboard-hazel.vercel.app/
