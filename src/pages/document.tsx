import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'components/markdown';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Menu from 'components/menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleTypography: {
      margin: theme.spacing(2, 0, 1, 0),
    },
    divider: {
      margin: theme.spacing(2, 0, 4, 0),
    },
    contentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

export const Document = (): ReactElement => {
  const classes = useStyles();

  const { documentTitle } = useParams();

  // if document exist!
  return (
    <Container>
      <div className={classes.contentHeader}>
        <Typography variant="h4" classes={{ root: classes.titleTypography }}>
          {documentTitle}
        </Typography>
        <Menu>
          <Menu.Item color="primary" variant="contained" size="small">
            수정
          </Menu.Item>
          <Menu.Item color="primary" variant="contained" size="small">
            삭제
          </Menu.Item>
        </Menu>
      </div>
      <Divider classes={{ root: classes.divider }} />
      <Markdown>{'**동기**  역시 마크다운이 최고다! `code`란 말이야'}</Markdown>
    </Container>
  );
};
export default Document;
