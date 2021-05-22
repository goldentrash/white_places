import React, { ReactElement } from 'react';
import useDecodedParams from 'hooks/useDecodedParams';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Markdown from 'components/markdown';
import Alert from 'components/alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
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
  })
);

export const Document = (): ReactElement => {
  const classes = useStyles();

  const { documentTitle } = useDecodedParams();

  const buttonOptions: ButtonProps = {
    color: 'primary',
    variant: 'contained',
    size: 'small',
  };

  // if document exist!
  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h4">{documentTitle}</Typography>
        <div className={classes.menu}>
          <Button {...buttonOptions}>수정</Button>
          <Alert
            button={<Button {...buttonOptions}>삭제</Button>}
            title="정말로 삭제하시겠습니까?"
          />
        </div>
      </div>

      <Divider classes={{ root: classes.divider }} />
      <Markdown>{'**동기**  역시 마크다운이 최고다! `code`란 말이야'}</Markdown>
    </Container>
  );
};
export default Document;
