/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SCREEN_MIN_WIDTH_DESKTOP } from 'src/constants';
import Root from '../Root';

const mockMatchMedia = (screenWidth: number) =>
  jest.fn().mockImplementation((query) => {
    return {
      matches: query === `(min-width:${screenWidth}px)`,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

describe('모바일 & 태블릿 환경에서', () => {
  beforeAll(() => {
    const mobileScreenWidth = SCREEN_MIN_WIDTH_DESKTOP - 1;

    window.matchMedia = mockMatchMedia(mobileScreenWidth);
  });

  test('제공되는 UI가 없다', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    expect(
      screen.queryByText('Sorry, mobile page is not yet implemented')
    ).not.toBeNull();
  });
});

describe('데스크탑 환경에서', () => {
  beforeAll(() => {
    const desktopScreenWidth = SCREEN_MIN_WIDTH_DESKTOP;

    window.matchMedia = mockMatchMedia(desktopScreenWidth);
  });

  test('render desktop page', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    expect(screen.queryByText('desktop page')).not.toBeNull();
  });
});
