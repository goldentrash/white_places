import React, {
  ReactElement,
  FormEventHandler,
  ChangeEventHandler,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

const SearchBox = (): ReactElement => {
  const [searching, setSearching] = useState<string>('');
  const history = useHistory();

  const onSearchingChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearching(event.currentTarget.value);
  };

  const search: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // 페이지 위치가 바껴도, 로직들은 그대로 실행되며, 데이터는 여전히 사용 가능하다
    // 서칭 페이지로 이동시킨 후, 데이터를 받아오는 방향으로 하면 될 것 같다.
    // history.push('/test/hello');
    // console.log('hello');
    // setTimeout(() => console.log('hihi~~'), 2000);
  };

  return (
    <form onSubmit={search}>
      <input
        type="search"
        placeholder="Search"
        value={searching}
        onChange={onSearchingChanged}
      />
    </form>
  );
};

export default SearchBox;
