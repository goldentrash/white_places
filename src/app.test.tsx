/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';
import Router from './router';

jest.mock('./router');

describe('모바일 & 태블릿 환경에서', () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(min-width:1440px)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
  });

  test('제공되는 UI가 없다', () => {
    render(<App />);

    expect(screen.getByText('1440px 이상의 화면 UI만 제공됩니다')).toBeTruthy();
  });
});

describe('데스크탑 환경에서', () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === '(min-width:1440px)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
  });

  test('라우터가 렌더링 된다', () => {
    (Router as jest.MockedFunction<typeof Router>).mockImplementation(() => {
      return <div>mocked router</div>;
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(Router).toBeCalled();
  });
});
