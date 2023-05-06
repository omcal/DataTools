import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '80%',
    justifyContent: 'space-between',

  },
  toggle: {
    width: '80%',
    fontSize: '.6rem',
    border: 'solid rgba(0, 0, 0, 0.15)',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',}
    ,
    '&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
      borderRadius: '2px',
      border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '&.Mui-selected': {
      borderRadius: '7px',
      background: '#000',
      color: '#fff',
    },
    '&.MuiToggleButton-root': {
      '&:hover': {
        background: '#000',
        color: '#fff',
      },
    },
  },
});

const FilterListToggle = ({ options, value, selectToggle }) => {
  const classes = useStyles();
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={selectToggle}
      className={classes.root}
    >
      {options.map(({ label, id, value }) => (
        <ToggleButton className={classes.toggle} key={id} value={value}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FilterListToggle;
