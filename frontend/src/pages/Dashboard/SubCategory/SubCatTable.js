import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSubCategories,
  deleteSubCategory,
  editSubCategory,
} from '../../../redux/actions/subCategoryActions';
import { getCategoryByID } from '../../../redux/actions/categoryActions';
import SuccessMessage from '../../../components/Message/successMessage';
import ErrorMessage from '../../../components/Message/errorMessage';
import {
  DELETE_SUB_CATEGORY_RESET,
  EDIT_SUB_CATEGORY_RESET,
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

const SubCatTable = () => {
  const [visible, setVisible] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.getAllCategory);
  const { category: categoryList } = allCategories;

  const createSubCat = useSelector((state) => state.createSubCategory);
  const { success } = createSubCat;

  const allSubCategories = useSelector((state) => state.getAllSubCategory);
  const { subCategory, loading } = allSubCategories;

  const catByID = useSelector((state) => state.getCategoryByID);
  const { category: categoryName } = catByID;

  const deleteSub = useSelector((state) => state.deleteSubCategory);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = deleteSub;

  const editSub = useSelector((state) => state.editSubCategory);
  const { success: editSuccess, error: editError } = editSub;

  useEffect(() => {
    if (success || successDelete || editSuccess) {
      dispatch(getAllSubCategories());
    }
  }, [success, dispatch, successDelete, editSuccess]);

  // const mainID = categoryList && categoryList.map((item) => item.id);

  const subCategoryList = () => {
    if (subCategory) {
      return subCategory.subCategoriesList.map((cat) => (
        <tr>
          <td>{cat.categoryID.name}</td>

          <td>{cat.name}</td>
          <td>{cat.createdAt}</td>
          <td>
            <MDBIcon
              icon="edit"
              className={classes.editBtn}
              onClick={(e) => {
                setEditOpen(true);
                setName(cat.name);
              }}
            />
            <Modal
              title="Edit Sub-Category"
              visible={editOpen}
              onOk={() => {
                dispatch(editSubCategory({ id: cat._id }, name, category));
                setEditOpen(false);
              }}
              onCancel={() => setEditOpen(false)}
            >
              <label
                htmlFor="editsubcategory"
                className="grey-text font-weight-light h6"
              >
                Name*
              </label>
              <input
                type="text"
                id={uuidv4()}
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label
                htmlFor="Category"
                className="grey-text font-weight-light h6"
              >
                Category*
              </label>
              <div>
                <Select
                  style={{ minWidth: '100%' }}
                  labelId={uuidv4()}
                  id={uuidv4()}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryList &&
                    categoryList.map((cat) => (
                      <MenuItem value={cat._id}>{cat.name}</MenuItem>
                    ))}
                </Select>
              </div>
            </Modal>
          </td>
          <td>
            <MDBIcon
              icon="trash"
              className={classes.deleteBtn}
              onClick={() => setVisible(true)}
            />
            <Modal
              title="Delete Sub-Category"
              visible={visible}
              onOk={() => {
                dispatch(deleteSubCategory(cat._id));
                setVisible(false);
              }}
              onCancel={() => setVisible(false)}
            >
              <p>Are you sure? You want to delete {cat.name}</p>
            </Modal>
          </td>
        </tr>
      ));
    }
  };

  return (
    <>
      <h5 className="py-1">List of Sub-Categories</h5>
      <hr />

      {successDelete && (
        <SuccessMessage
          header="Success"
          message="Sub-Category Deleted"
          reset={DELETE_SUB_CATEGORY_RESET}
        />
      )}
      {errorDelete && (
        <ErrorMessage
          header="Error"
          message={errorDelete}
          reset={DELETE_SUB_CATEGORY_RESET}
        />
      )}

      {editSuccess && (
        <SuccessMessage
          header="Success"
          message="Sub-Category updated"
          reset={EDIT_SUB_CATEGORY_RESET}
        />
      )}
      {editError && (
        <ErrorMessage
          header="Error"
          message={editError}
          reset={EDIT_SUB_CATEGORY_RESET}
        />
      )}

      {loading || loadingDelete ? (
        <div style={{ display: 'flex', marginLeft: '50%' }}>
          <CircularProgress />
        </div>
      ) : (
        <MDBTable btn hover responsive style={{ marginTop: '-10px' }}>
          <MDBTableHead>
            <tr>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Date</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>{subCategoryList()}</MDBTableBody>
        </MDBTable>
      )}
    </>
  );
};

export default SubCatTable;
