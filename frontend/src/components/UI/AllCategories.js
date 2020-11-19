import React, { useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
// import { getAllCategories } from '../../redux/actions/categoryActions';
import {
  createCategory,
  getAllCategories,
} from '../../redux/actions/categoryActions';

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

const AllCategoriesTable = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const createCat = useSelector((state) => state.createCategory);
  const { success } = createCat;

  const getAllCategory = useSelector((state) => state.getAllCategory);
  //   console.log(getAllCategory);
  const { category, loading } = getAllCategory;

  useEffect(() => {
    if (success) {
      dispatch(getAllCategories());
    }
  }, [success, dispatch]);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const categoryList = () => {
    if (category) {
      return category.map((cat) => (
        <tr>
          <td>{cat._id}</td>
          <td>{cat.name}</td>
          <td>{cat.slug}</td>
          <td>{cat.createdAt}</td>
          <td>
            <MDBIcon
              icon="edit"
              onClick={() => handleEdit(cat._id)}
              className={classes.editBtn}
            />
            <MDBIcon
              icon="trash"
              className={classes.deleteBtn}
              onClick={() => handleDelete(cat._id)}
            />
          </td>
        </tr>
      ));
    }
  };

  return (
    <>
      <h5 className="py-1">List of Categories</h5>
      <hr />

      {loading ? (
        <div
          className="spinner-grow"
          role="status"
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default AllCategoriesTable;
