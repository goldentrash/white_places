import React, { ReactElement } from 'react';
import { Markdown } from 'components';
import { Container } from '@material-ui/core';

export const Information = (): ReactElement => {
  const introduction = `# 제작 동기
오픈소스를 찾더라도 해당 프로젝트에서 어떤 일을 기여를 해야할지 모르겠다. 의견을 제시하고 그 의견이 수락되는지 확인할 수 있는 웹페이지를 만들기로 마음먹었다.

## 목표
- 우리들만의 문서화도구!! (ts 우선 제작 예정)
- 서치 엔진 (현재는 아쉽게도 exat 만 기능합니다 ㅠㅠ)

## 사용방법
1. Opinion
- 자유로운 의견 제사
- 좋아요에 따라 포인트 적립!
- 수락되면 Task로 자동 전환!

2. Task
- 등록된 Task는 언제나 확인 중!
- Wating PR 목록을 확인해서 기여 진행 정도를 파악
- 수락될 경우 포인트 적립!

3. Convention
- 프로젝트의 Convention Tab을 확인하고 잘 지켜줄 것!
- 컨벤션을 지키지 않는것도 Task Submit의 Deny 사유가 될 수 있음!!
*컨벤션 예시*
\`\`\`js
export const func; // Ok

const func;
export default func; // No!


class AAA extends BBB {
  constroctur() {
    this.name = 'hi';
  }

  getName(){
    return this.name;
  }
}
\`\`\`


언어를 명시하지 않을 경우
\`\`\`
some code there
\`\`\`

### test for inline code block
\`function\` keyword was not speciall  
\`export \` 좀 긴 인라인 코드 줄바꿈이 생길정도로 길게~~~~~~~~asdfasdfasdfasdfasdf~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~이정도면 되지 않을까
`;

  return (
    <Container>
      <Markdown>{introduction}</Markdown>
    </Container>
  );
};
