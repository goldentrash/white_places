import React, {
  ReactElement,
  useState,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Markdown from 'components/markdown';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    editorForm: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',

      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    preview: {
      width: '50%',
    },
    titleTypography: {
      margin: theme.spacing(2, 0, 1, 0),
    },
    divider: {
      margin: theme.spacing(0, 2),
    },
    divider2: {
      margin: theme.spacing(2, 0, 4, 0),
    },
    submitButton: {
      marginLeft: 'auto',
    },
  })
);

export const WriteDocument = (): ReactElement => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = ({
    target: { value: newTitle },
  }: ChangeEvent<HTMLInputElement>): void => {
    setTitle(newTitle);
  };
  const handleTitleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  const handleContentChange = ({
    target: { value: newContent },
  }: ChangeEvent<HTMLInputElement>): void => {
    setContent(newContent);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <Container className={classes.root}>
      <div className={classes.preview}>
        <Typography variant="h4" classes={{ root: classes.titleTypography }}>
          {title}
        </Typography>
        <Divider classes={{ root: classes.divider2 }} />
        <Markdown>{content}</Markdown>
      </div>

      <Divider
        classes={{ root: classes.divider }}
        orientation="vertical"
        flexItem
      />

      <form className={classes.editorForm} onSubmit={handleSubmit}>
        <TextField
          name="title"
          placeholder="제목"
          required
          value={title}
          type="text"
          onChange={handleTitleChange}
          onKeyPress={handleTitleKeyPress}
          variant="outlined"
        />
        <TextField
          multiline
          name="content"
          placeholder="본문"
          required
          value={content}
          type="text"
          onChange={handleContentChange}
          variant="outlined"
        />
        <Button
          classes={{ root: classes.submitButton }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          작성완료
        </Button>
      </form>
    </Container>
  );
};
export default WriteDocument;
