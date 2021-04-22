import React, {
  FunctionComponent,
  useState,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IconButton, Paper, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
    },
    input: {
      marginLeft: theme.spacing(1),
      width: '15ch',
      fontWeight: theme.typography.body2.fontWeight,
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,
      letterSpacing: theme.typography.body2.letterSpacing,

      '&::-webkit-search-cancel-button,&::-webkit-search-decoration,&::-webkit-search-results-button,&::-webkit-search-results-decoration': {
        '-webkit-appearance': 'none',
      },
    },
  })
);

const initialText = '';

export type SearchEventHandler = {
  (text: string): void;
};

type SearchBoxProps = {
  placeholder?: string;
  onSearch: SearchEventHandler;
};

export const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const styles = useStyles();

  const [text, setText] = useState<string>(initialText);

  const handleSubmit: FormEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    props.onSearch(text);
    setText(initialText);
    // while(true); 이 함수 호출이 종료된 후 rerendering되는 것일까?
    // 그렇지 않다면, unmount 이후 text를 수정하기 때문에 문제가 될 것이다.
  };
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setText(event.currentTarget.value);
  };

  return (
    <Paper
      component="form"
      className={styles.root}
      onSubmit={handleSubmit}
      variant="outlined"
    >
      <InputBase
        value={text}
        placeholder={props.placeholder}
        onChange={handleChange}
        type="search"
        classes={{ input: styles.input }}
      />
      <IconButton type="submit" size="small">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
