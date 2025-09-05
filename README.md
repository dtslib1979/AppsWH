# Claude Code 마스터 용어 학습앱 (PWA)

- 정적 사이트(Static site) + PWA(Service Worker)
- 오프라인 지원, 설치형 앱처럼 사용 가능

## 파일 구성
- claude-code-master-terms.html  ← 메인 페이지
- manifest.json                   ← PWA 설정
- sw.js                           ← 오프라인 캐시

## 로컬에서 열기(선택)
- 단순 더블클릭으로도 열리지만, **PWA 설치 버튼/오프라인**은 보통 HTTP로 서빙해야 안정적.
- Python 내장 서버:
  ```bash
  python -m http.server 8000
  # 브라우저에서 http://localhost:8000/claude-code-master-terms.html
  ```

## 배포(GitHub Pages 권장)

1. 이 폴더를 깃으로 커밋/푸시
2. GitHub Pages를 main 브랜치 / 루트(/)로 설정
3. 최종 URL:
   ```
   https://{GitHubID}.github.io/{REPO_NAME}/claude-code-master-terms.html
   ```

## 용어 추가

claude-code-master-terms.html 하단의 TERMS 배열에 { term, desc } 항목을 추가하면 됨.

---

# 업로드/배포 방법(요약)

1. 위 4개 파일을 **같은 폴더**에 저장.  
2. VS Code 열기 → Copilot Chat에 **아까 준 인스트럭션** 그대로 붙여넣기.  
3. `gh repo create …` 후 GitHub Pages **main/(root)** 로 설정.  
4. 최종 URL로 접속해서 **PWA 설치** 버튼 보이면 성공.

---

# 왜 네 파일이 "세트"로 필요하냐 (핵심 이유)

- HTML(메인 화면): 화면과 로직의 본체.
- manifest.json(PWA 매니페스트): 브라우저가 "앱처럼 설치(Install)"할 수 있게 정체성 제공.
- sw.js(Service Worker): 오프라인 캐시 등 앱다운 동작 제공.
- README.md(문서): 설치/배포/수정 방법을 잊지 않게 최소 설명.

즉, **한 장짜리 그림책(HTML)** + **표지/목차(manifest.json)** + **책갈피/복사본(sw.js)** 구성이어야 **"앱처럼"** 굴러간다. (개념: PWA(Progressive Web App))

이제 이 4개를 올리면, 바로 **GitHub Pages 링크**로 iOS/Android/PC에서 실행된다.
