import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

import lime from '@material-ui/core/colors/lime';

import STE from './staffView.js';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#301615',
    color: theme.palette.common.white,
    fontSize: 14,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 1000,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  red:{
    backgroundColor: 'red',
  },
  default:{

  },
  paper: {
    margin: theme.spacing.unit,
    position: 'absolute',
    width: theme.spacing.unit * 150,
    height: theme.spacing.unit * 50,
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});


class EnhancedTable extends React.Component {
    render() {
    return (
      <Paper>
      <LinearProgress style={{ color: lime[500] }}  variant="query" />
    </Paper>
    );
  }
}


EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EnhancedTable);