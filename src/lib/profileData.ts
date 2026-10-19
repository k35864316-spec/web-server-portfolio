/**
 * 포트폴리오에 표시되는 내용입니다. 이 파일만 고치고 배포하면 화면과 MongoDB 의 내용이 함께 바뀝니다.
 * (배포 후 첫 접속 때 MongoDB 의 profile 문서가 이 내용으로 갱신됩니다)
 */
export type Project = {
  title: string;
  period: string;
  /** 진행 상태 (예: "진행 중", "완료") */
  status: string;
  summary: string;
  role: string;
  /** 사용한 기술 (빈도수 집계에 쓰임) */
  stack: string[];
  /** 사용한 도구 (빈도수 집계에서 제외) */
  tools: string[];
  /** done: 구현·적용 완료 여부 (false 면 화면에 "구현 예정" 으로 표시) */
  points: { text: string; done: boolean }[];
  repo?: string;
  demo?: string;
};

export type ProfileData = {
  name: string;
  tagline: string;
  intro: string;
  /** About 에 보이는 공부 방식 */
  approach: string[];
  school: string;
  github: string;
  skills: { group: string; items: string[] }[];
  projects: Project[];
  links: { label: string; url: string }[];
};

export const PROFILE: ProfileData = {
  name: "김명준",
  tagline: "정보보호를 공부하는 대학생 · 웹 보안에 관심이 있습니다",
  intro:
    "중부대학교 정보보호학과 2학년입니다. 웹서버보안프로그래밍 수업에서 팀원들과 로그인 기능이 있는 게시판을 만들며 " +
    "Next.js, TypeScript, MongoDB로 웹 서비스를 개발하고 배포하는 과정을 배우고 있습니다. " +
    "기능을 만든 뒤에는 어떤 공격에 취약한지 확인하고 방어하는 방식으로 공부합니다.",
  school: "중부대학교 정보보호학과 · 2학년 재학",
  github: "https://github.com/k35864316-spec",
  approach: [
    "기능을 먼저 만들고, 어떤 공격에 취약한지 직접 확인합니다.",
    "취약점마다 방어를 하나씩 붙이고, 적용한 것과 아직 못 한 것을 구분해서 기록합니다.",
    "만든 것은 GitHub에 올리고 Vercel로 배포해서 주소로 확인합니다.",
  ],
  skills: [
    { group: "Web", items: ["HTML", "CSS", "JS", "Next.js", "React", "TypeScript"] },
    { group: "Database", items: ["MongoDB"] },
    { group: "Language", items: ["Python", "C"] },
    { group: "Tools", items: ["GitHub", "VS Code", "Vercel"] },
  ],
  projects: [
    {
      title: "웹 서버 프로그래밍 팀 프로젝트",
      period: "2026.09 ~",
      status: "진행 중",
      summary: "로그인한 사용자만 이용할 수 있는 게시판입니다. 웹 보안 기능을 기능마다 하나씩 적용해 가는 팀 프로젝트입니다.",
      role: "3인 팀 프로젝트 (웹서버보안프로그래밍)",
      stack: ["Next.js", "React", "TypeScript", "MongoDB"],
      tools: ["GitHub", "VS Code", "Vercel"],
      points: [
        { text: "회원가입·로그인, 서버 세션(HttpOnly 쿠키), bcrypt 비밀번호 해시", done: true },
        { text: "게시글 작성·수정·삭제, 검색, 페이지 나누기, 조회수, 비밀글, 댓글", done: true },
        { text: "작성자·관리자 권한 검사(접근 제어), 로그인 실패 5회 시 5분 잠금", done: true },
        { text: "입력값 검증·인젝션 방어", done: false },
        { text: "XSS 방어", done: false },
        { text: "CSRF 방어", done: false },
      ],
      repo: "https://github.com/k35864316-spec/safeboard",
      demo: "https://safeboard-hazel.vercel.app/",
    },
    {
      title: "개인 포트폴리오 홈페이지",
      period: "2026.10",
      status: "진행 중",
      summary: "지금 보고 계신 이 사이트입니다. 상단 메뉴로 Main·Stack·Project·About을 오가며 볼 수 있습니다.",
      role: "개인 프로젝트",
      stack: ["Next.js", "React", "TypeScript"],
      tools: ["GitHub", "VS Code"],
      points: [
        { text: "상단 메뉴 버튼으로 각 내용 위치로 이동, 현재 위치 표시", done: true },
        { text: "Next.js 와 TypeScript 로 작성, Vercel 배포 예정", done: true },
        { text: "MongoDB 연동은 구현 예정", done: false },
      ],
      repo: "https://github.com/k35864316-spec/web_server_portfolio",
      demo: "https://web-server-portfolio.vercel.app/",
    },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/k35864316-spec" },
    { label: "팀 프로젝트 저장소", url: "https://github.com/k35864316-spec/safeboard" },
    { label: "팀 프로젝트 배포 주소", url: "https://safeboard-hazel.vercel.app/" },
  ],
};
