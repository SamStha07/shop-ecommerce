import React, { useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoryActions';

const useStyles = makeStyles({
  editBtn: {
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    },
    fontSize: '1rem',
    '@media(max-width:850px)': {
      fontSize: '1.5rem',
      marginBottom: '10px',
    },
  },
  deleteBtn: {
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
    marginLeft: '1rem',
    fontSize: '1rem',
    '@media(max-width:850px)': {
      marginLeft: '0px',
      fontSize: '1.5rem',
    },
  },
});

const AllCategoriesTable = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.getAllCategory);

  const { category } = allCategories;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const categoryList = () => {
    return category.categoriesList.map((category) => (
      <tr>
        <td>{category._id}</td>
        <td>{category.name}</td>
        <td>{category.slug}</td>
        <td>{category.createdAt}</td>
        <td>
          <MDBIcon
            icon="edit"
            onClick={() => handleEdit(category._id)}
            className={classes.editBtn}
          />

          <MDBIcon
            icon="trash"
            className={classes.deleteBtn}
            onClick={() => handleDelete(category._id)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h5 className="py-1">List of Categories</h5>
      <hr />
      <MDBTable btn hover responsive style={{ marginTop: '-10px' }}>
        <MDBTableHead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{categoryList()}</MDBTableBody>
      </MDBTable>
    </>
  );
};

export default AllCategoriesTable;
