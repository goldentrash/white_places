import React, { ReactElement, FormEventHandler } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      display: 'flex',
      alignItems: 'center',
    },
    searchBoxInput: {
      marginLeft: theme.spacing(1),
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    searchBoxIconButton: {
      padding: 10,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    grow: {
      flexGrow: 1,
    },
  })
);

const Header = (): ReactElement => {
  const searchProject: FormEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    console.log('hello');
  };

  const classes = useStyles();
  return (
    <AppBar position="static" color="default" variant="outlined">
      <Toolbar>
        <Button
          color="primary"
          size="small"
          variant="text"
          component={RouterLink}
          to="/"
          classes={{ root: classes.link }}
        >
          White Places
        </Button>
        <div className={classes.grow} />
        <Paper
          component="form"
          onSubmit={searchProject}
          variant="outlined"
          className={classes.searchBox}
        >
          <InputBase
            color="primary"
            placeholder="Search Project"
            type="search"
            className={classes.searchBoxInput}
          />
          <IconButton type="submit" className={classes.searchBoxIconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          href="/"
          size="small"
          color="primary"
          variant="contained"
          className={classes.link}
        >
          Log In?
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
