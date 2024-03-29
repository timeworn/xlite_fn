import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    marginBottom: 8,
  },
  content: {
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
    padding: 8,
    paddingBottom: "8px !important"
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    height: 32,
    width: 32
  },
  icon: {
    height: 16,
    width: 16
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Summary = props => {
  const { className, Icon, title, value, color, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content} style={{ borderColor: color }}>
        <Grid container display="flex" justify="space-between" alignItems={"center"}>
          <Grid item>
            <Box ml={1}>
              <Typography className={classes.title} style={{ color }} gutterBottom variant="body2">
                {title}
              </Typography>
              <Typography variant="h3">{value}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar} style={{ backgroundColor: color}}>
              <Icon className={classes.icon}/>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Summary.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired
};

export default Summary;
