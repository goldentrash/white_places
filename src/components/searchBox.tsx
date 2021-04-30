import React, { ReactElement, useState, ChangeEvent, FormEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IconButton, Paper, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'inline-block',
    },
    input: {
      marginLeft: theme.spacing(1),
      width: '15ch',
      fontWeight: theme.typography.body2.fontWeight,
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,
      letterSpacing: theme.typography.body2.letterSpacing,

      // now, only chrome is supported
      '&::-webkit-search-cancel-button,&::-webkit-search-decoration,&::-webkit-search-results-button,&::-webkit-search-results-decoration': {
        '-webkit-appearance': 'none',
      },
    },
  })
);

type SearchBoxProps = {
  placeholder?: string;
  onSearch(text: string): void;
};

export const SearchBox = (props: SearchBoxProps): ReactElement => {
  const classes = useStyles();

  const [text, setText] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLDivElement>): void => {
    event.preventDefault();

    props.onSearch(text);
    setText('');
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.currentTarget.value);
  };

  return (
    <Paper
      component="form"
      classes={{ root: classes.paper }}
      onSubmit={handleSubmit}
      variant="outlined"
    >
      <InputBase
        value={text}
        placeholder={props.placeholder}
        onChange={handleChange}
        type="search"
        classes={{ input: classes.input }}
      />
      <IconButton type="submit" size="small">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
