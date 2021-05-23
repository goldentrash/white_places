import React, { ReactElement, useState, ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { negative1ToNull } from 'helpers/util';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'inline-block',
      padding: theme.spacing(1),
    },
  })
);

export type SelectorProps = {
  label: string;
  defaultItem: string;
  items: string[];
  onChange?: (item: string) => void;
};
export const Selector = ({
  defaultItem,
  items,
  onChange,
}: SelectorProps): ReactElement => {
  const classes = useStyles();

  const [selected, setSelected] = useState(defaultItem);

  const handleChange = ({
    target,
  }: ChangeEvent<{
    value: unknown;
  }>): void => {
    const nextItemIdx = target.value;
    if (typeof nextItemIdx !== 'number') {
      throw Error();
    }

    if (onChange) {
      onChange(items[nextItemIdx]);
    }

    setSelected(items[nextItemIdx]);
  };

  return (
    <form className={classes.form}>
      <Select
        value={negative1ToNull(items.indexOf(selected)) ?? ''}
        onChange={handleChange}
      >
        {items.map((item, idx) => {
          return (
            <MenuItem key={idx} value={idx}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </form>
  );
};
export default Selector;
