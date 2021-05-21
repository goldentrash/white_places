import React, { ReactElement } from 'react';
import useDecodedParams from 'hooks/useDecodedParams';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Markdown from 'components/markdown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(2, 0, 1, 0),
    },
    menu: {
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    divider: {
      margin: theme.spacing(2, 0, 4, 0),
    },
    status: {
      display: 'flex',
      alignItems: 'center',

      '& > * ': {
        marginRight: theme.spacing(1),
      },
    },
    fabsBox: {
      position: 'fixed',
      top: '45%',
      right: 0,
    },
  })
);

type HeaderProps = {
  title: string;
};
const Header = ({ title }: HeaderProps): ReactElement => {
  const classes = useStyles();

  const buttonOptions: ButtonProps = {
    color: 'primary',
    variant: 'contained',
    size: 'small',
  };

  return (
    <div>
      <Typography variant="h4">{title}</Typography>

      <div className={classes.subHeader}>
        <div className={classes.status}>
          <Chip label={status} size="small" />
          <Typography color="textSecondary" variant="subtitle1">
            <b>#aa124adffd</b> task working for this opinion!
          </Typography>
        </div>

        <div className={classes.menu}>
          <Button {...buttonOptions}>수정</Button>
          <Button {...buttonOptions}>삭제</Button>
        </div>
      </div>
    </div>
  );
};

type FabsProps = {
  fabs: {
    icon: ReactElement;
    onClick(): void;
  }[];
};
const Fabs = ({ fabs }: FabsProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.fabsBox}>
      {fabs.map(({ icon, onClick }, idx) => {
        return (
          <Fab key={idx} onClick={onClick}>
            {icon}
          </Fab>
        );
      })}
    </div>
  );
};

export const Opinion = (): ReactElement => {
  const classes = useStyles();

  const { opinionTitle } = useDecodedParams();

  return (
    <Container>
      <Fabs
        fabs={[
          {
            icon: <b>btn</b>,
            onClick() {
              //todo
            },
          },
        ]}
      />
      <Header title={opinionTitle} />
      <Divider classes={{ root: classes.divider }} />
      <Markdown>{'**동기**  역시 마크다운이 최고다! `code`란 말이야'}</Markdown>
    </Container>
  );
};
export default Opinion;
