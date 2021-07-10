import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategories,
  deleteCategory,
  editCategory,
} from '../../../redux/actions/categoryActions';
import SuccessMessage from '../../../components/Message/successMessage';
import ErrorMessage from '../../../components/Message/errorMessage';
import {
  DELETE_CATEGORY_RESET,
  EDIT_CATEGORY_RESET,
} from '../../../redux/constants/categoryConstants';

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
  const [visible, setVisible] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  const createCat = useSelector((state) => state.createCategory);
  const { success } = createCat;

  const getAllCategory = useSelector((state) => state.getAllCategory);
  const { category, loading } = getAllCategory;

  const deleteCat = useSelector((state) => state.deleteCategory);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = deleteCat;

  const editCat = useSelector((state) => state.editCategory);
  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = editCat;

  useEffect(() => {
    if (success || successDelete || editSuccess) {
      dispatch(getAllCategories());
    }
  }, [success, dispatch, successDelete, editSuccess]);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure ${id} ?`)) {
      dispatch(deleteCategory(id));
    }
  };

  const categoryList = () => {
    if (category) {
      return category.map((cat) => (
        <tr key={cat._id}>
          <td>{cat.name}</td>
          <td>{cat.slug}</td>
          <td>{cat.createdAt}</td>
          <td>
            <MDBIcon
              icon='edit'
              onClick={(e) => {
                setEditOpen(true);
                setName(cat.name);
              }}
              className={classes.editBtn}
            />
            <Modal
              title='Edit Category'
              visible={editOpen}
              onOk={() => {
                dispatch(editCategory({ id: cat._id, name }));
                setEditOpen(false);
              }}
              onCancel={() => setEditOpen(false)}
            >
              <label
                htmlFor='editcategory'
                className='grey-text font-weight-light h6'
              >
                Name*
              </label>
              <input
                type='text'
                id={uuidv4()}
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Modal>
          </td>
          <td>
            <MDBIcon
              icon='trash'
              className={classes.deleteBtn}
              onClick={() => handleDelete(cat._id)}
            />

            <Modal
              title='Delete Category'
              visible={visible}
              onOk={() => {
                dispatch(deleteCategory(cat._id));
                setVisible(false);
              }}
              onCancel={() => setVisible(false)}
            >
              <p>Are you sure? You want to delete</p>
            </Modal>
          </td>
        </tr>
      ));
    }
  };

  return (
    <>
      <h5 className='py-1'>List of Categories</h5>
      <hr />

      {successDelete && (
        <SuccessMessage
          header='Success'
          message='Category Deleted'
          reset={DELETE_CATEGORY_RESET}
        />
      )}
      {errorDelete && (
        <ErrorMessage
          header='Error'
          message={errorDelete}
          reset={DELETE_CATEGORY_RESET}
        />
      )}
      {editSuccess && (
        <SuccessMessage
          header='Success'
          message='Category updated'
          reset={EDIT_CATEGORY_RESET}
        />
      )}
      {editError && (
        <ErrorMessage
          header='Error'
          message={editError}
          reset={EDIT_CATEGORY_RESET}
        />
      )}

      {loading || loadingDelete || editLoading ? (
        <div style={{ display: 'flex', marginLeft: '50%' }}>
          <CircularProgress />
        </div>
      ) : (
        <MDBTable btn hover responsive style={{ marginTop: '-10px' }}>
          <MDBTableHead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Date</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>{categoryList()}</MDBTableBody>
        </MDBTable>
      )}
    </>
  );
};

export default AllCategoriesTable;
