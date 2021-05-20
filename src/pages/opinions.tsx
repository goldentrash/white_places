import React, { ReactElement } from 'react';
import Chip from '@material-ui/core/Chip';
import PageList from 'components/pageList';
import urlBuilder from 'helpers/urlBuilder';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    opinionBio: {
      display: 'flex',
      alignItems: 'center',
    },
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

type OpinionBioProps = {
  state: string;
  likes: number;
};
const OpinionBio = ({ state, likes }: OpinionBioProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.opinionBio}>
      <Chip
        classes={{ root: classes.chip }}
        label={state}
        size="small"
        color="primary"
      />
      <Typography color="textSecondary" variant="subtitle1" component="div">
        <b>{likes}</b> people likes this opinion
      </Typography>
    </div>
  );
};

export const Opinions = (): ReactElement => {
  const opinions = [
    { id: '123123', title: 'introduction', likes: 1, state: 'pendding' },
    {
      id: '1231f23',
      title: 'introdfsdfasduction',
      likes: 122,
      state: 'pdendding',
    },
  ];

  return (
    <PageList>
      <PageList.Statistics numberOfResult={32} type="Opinions" />
      {opinions.map(({ id, title, state, likes }) => {
        return (
          <PageList.Item
            key={id}
            title={title}
            pageUrl={urlBuilder.opinions('white_places')}
            contents={<OpinionBio state={state} likes={likes} />}
          />
        );
      })}
    </PageList>
  );
};
export default Opinions;
