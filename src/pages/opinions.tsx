import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import urlBuilder from 'helpers/urlBuilder';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Selector from 'components/selector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(2, 0, 1, 0),
    },
    typeChip: {
      marginLeft: theme.spacing(1),
    },
    label: {
      textTransform: 'capitalize',
    },
    menu: {
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    item: {
      marginTop: theme.spacing(1),

      '& > *': {
        margin: theme.spacing(1, 2),
      },
    },
    status: {
      display: 'flex',
      alignItems: 'center',

      '& > * ': {
        marginRight: theme.spacing(1),
      },
    },
  })
);

export const Opinions = (): ReactElement => {
  const classes = useStyles();

  const opinions = [
    { id: '123123', title: 'introduction', likes: 1, status: '기각됨' },
    {
      id: '1231f23',
      title: 'introdfsdfasduction',
      likes: 122,
      status: '대기중',
    },
  ];

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">
          대기중인 {opinions.length}개의 의견
        </Typography>

        <div className={classes.menu}>
          <Selector
            label={'상태'}
            defaultItem="대기중"
            items={['대기중', '기각됨', '수용됨']}
          />
          <Button
            classes={{ label: classes.label }}
            color="primary"
            variant="contained"
            size="small"
          >
            의견 제시하기
          </Button>
        </div>
      </div>
      <Divider />

      {opinions.map(({ title, status }, idx) => {
        return (
          <Paper key={idx} variant="outlined" classes={{ root: classes.item }}>
            <div>
              <Link
                underline="none"
                variant="h5"
                component={RouterLink}
                to={urlBuilder.opinion('white places', title)}
              >
                {title}
              </Link>
              <Chip
                classes={{ root: classes.typeChip }}
                label="버그"
                size="small"
              />
            </div>

            <div className={classes.status}>
              <Chip label={status} size="small" />
              <Typography color="textSecondary" variant="subtitle1">
                <b>123</b>명이 찬성합니다
              </Typography>
            </div>
          </Paper>
        );
      })}
    </Container>
  );
};
export default Opinions;
