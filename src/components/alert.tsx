import React, { Fragment, ReactElement, cloneElement } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export type AlertProps = {
  button: ReactElement;
  title: string;
  onYes?: () => void;
  onNo?: () => void;
};
export const Alert = ({
  button,
  title,
  onYes,
  onNo,
}: AlertProps): ReactElement => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    if (onYes) {
      onYes();
    }

    handleClose();
  };
  const handleNo = () => {
    if (onNo) {
      onNo();
    }

    handleClose();
  };

  return (
    <Fragment>
      {cloneElement(button, { onClick: handleOpen })}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>

        <DialogActions>
          <Button onClick={handleNo} color="primary">
            아니요
          </Button>
          <Button onClick={handleYes} color="secondary">
            예
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default Alert;
