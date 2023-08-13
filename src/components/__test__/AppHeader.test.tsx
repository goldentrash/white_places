/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RootLevelPath from 'src/routes/RootLevelPath';
import { APP_NAME } from 'src/constants';
import { MemoryRouter, Routes, Route } from 'react-router';
import AppHeader from '../AppHeader';
import { User } from 'gotrue-js';

const TEST_ENTRY = '/some/path';

test('브랜드 링크를 클릭하면 메인 페이지로 이동한다', () => {
  const MainPage = () => <div>main page</div>;

  render(
    <MemoryRouter initialEntries={[TEST_ENTRY]}>
      <Routes>
        <Route path={TEST_ENTRY} element={<AppHeader user={null} />} />
        <Route path={RootLevelPath.Main} element={<MainPage />} />
      </Routes>
    </MemoryRouter>
  );

  const brandLink = screen.getByText(APP_NAME);
  fireEvent.click(brandLink);

  expect(screen.queryByText('main page')).not.toBeNull();
});

describe('로그인 한 상황에서', () => {
  test('프로필 링크를 클릭하면 프로필 페이지로 이동한다', () => {
    const ProfilePage = () => <div>profile page</div>;
    const user: Pick<User, 'id'> = { id: '123' };

    render(
      <MemoryRouter initialEntries={[TEST_ENTRY]}>
        <Routes>
          <Route path={TEST_ENTRY} element={<AppHeader user={user} />} />
          <Route path={RootLevelPath.Profile} element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    const profileLink = screen.getByText('프로필');
    fireEvent.click(profileLink);

    expect(screen.queryByText('profile page')).not.toBeNull();
  });
});

describe('로그아웃 한 상황에서', () => {
  test('로그인 링크를 클릭하면 로그인 페이지로 이동한다', () => {
    const LoginPage = () => <div>login page</div>;

    render(
      <MemoryRouter initialEntries={[TEST_ENTRY]}>
        <Routes>
          <Route path={TEST_ENTRY} element={<AppHeader user={null} />} />
          <Route path={RootLevelPath.Auth} element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    const loginLink = screen.getByText('로그인');
    fireEvent.click(loginLink);

    expect(screen.queryByText('login page')).not.toBeNull();
  });
});
