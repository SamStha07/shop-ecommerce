import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { TreeView, TreeItem } from '@material-ui/lab';
import {
  Create,
  Dashboard,
  ViewList,
  Dns,
  Label,
  People,
  ArrowDropDown,
  ArrowRight,
  Shop,
} from '@material-ui/icons';
import { LinkContainer } from 'react-router-bootstrap';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color='inherit' className={classes.labelIcon} />
          <Typography variant='body2' className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant='caption' color='inherit'>
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function GmailTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDown />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <LinkContainer to='/dashboard'>
        <StyledTreeItem
          nodeId='1'
          labelText='Dashboard'
          labelIcon={Dashboard}
        />
      </LinkContainer>

      <StyledTreeItem nodeId='2' labelText='Categories' labelIcon={Label}>
        <LinkContainer to='/dashboard/category/create'>
          <StyledTreeItem
            nodeId='3'
            labelText='Create Category'
            labelIcon={Create}
            color='#a250f5'
            bgColor='#e8f0fe'
          />
        </LinkContainer>
        <LinkContainer to='/dashboard/subcategory/create'>
          <StyledTreeItem
            nodeId='4'
            labelText='Create Sub-Category'
            labelIcon={Create}
            color='#a250f5'
            bgColor='#e8f0fe'
          />
        </LinkContainer>
        <LinkContainer to='/dashboard/childcategory/create'>
          <StyledTreeItem
            nodeId='5'
            labelText='Create Child-Category'
            labelIcon={Create}
            color='#a250f5'
            bgColor='#e8f0fe'
          />
        </LinkContainer>
        <LinkContainer to='/dashboard/categories'>
          <StyledTreeItem
            nodeId='6'
            labelText='All Categories'
            labelIcon={ViewList}
            color='#a250f5'
            bgColor='#e6f4ea'
          />
        </LinkContainer>
      </StyledTreeItem>
      <StyledTreeItem nodeId='7' labelText='Product' labelIcon={Dns}>
        <LinkContainer to='/dashboard/products'>
          <StyledTreeItem
            nodeId='9'
            labelText='All Products'
            labelIcon={ViewList}
            color='#a250f5'
            bgColor='#e6f4ea'
          />
        </LinkContainer>
      </StyledTreeItem>
      <StyledTreeItem nodeId='10' labelText='User' labelIcon={People}>
        <LinkContainer to='/dashboard/user/create'>
          <StyledTreeItem
            nodeId='11'
            labelText='Create '
            labelIcon={Create}
            color='#a250f5'
            bgColor='#e8f0fe'
          />
        </LinkContainer>

        <LinkContainer to='/dashboard/users'>
          <StyledTreeItem
            nodeId='12'
            labelText='Customers'
            labelIcon={ViewList}
            color='#a250f5'
            bgColor='#e6f4ea'
          />
        </LinkContainer>
      </StyledTreeItem>

      <StyledTreeItem nodeId='13' labelText='Orders' labelIcon={Shop}>
        <LinkContainer to='/dashboard/orders/list'>
          <StyledTreeItem
            nodeId='14'
            labelText='List'
            labelIcon={ViewList}
            color='#a250f5'
            bgColor='#e6f4ea'
          />
        </LinkContainer>
      </StyledTreeItem>
    </TreeView>
  );
}
