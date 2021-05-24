import React, { ReactElement, useState, ChangeEvent, FormEvent } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(4, 2),
      display: 'flex',
      flexDirection: 'column',

      '& > *': {
        marginTop: theme.spacing(1),
      },
    },
    submitButton: {
      marginLeft: 'auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',

      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export type CommentorType = {
  onSubmit?: (comment: string) => void;
  placeholder?: string;
};
export const Commentor = ({
  onSubmit,
  placeholder,
}: CommentorType): ReactElement => {
  const classes = useStyles();

  const [comment, setComment] = useState('');

  const handleCommentChange = ({
    target: { value: newComment },
  }: ChangeEvent<HTMLInputElement>): void => {
    setComment(newComment);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(comment);
    }
  };

  return (
    <div className={classes.root}>
      <Divider />

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          multiline
          name="comment"
          placeholder={placeholder ?? '댓글 작성'}
          required
          value={comment}
          type="text"
          onChange={handleCommentChange}
          variant="outlined"
        />
        <Button
          classes={{ root: classes.submitButton }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          저장
        </Button>
      </form>
    </div>
  );
};
export default Commentor;
