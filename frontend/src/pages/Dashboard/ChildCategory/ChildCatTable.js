import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllChildCategories,
  deleteChildCategory,
  editChildCategory,
  getSubCatUnderMainCatID,
} from '../../../redux/actions/childCategoryActions';
import SuccessMessage from '../../../components/Message/successMessage';
import ErrorMessage from '../../../components/Message/errorMessage';
import {
  DELETE_CHILD_CATEGORY_RESET,
  EDIT_CHILD_CATEGORY_RESET,
} from '../../../redux/constants/categoryConstants';

const useStyles = makeStyles({
  editBtn: {
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    },

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
    fontSize: '1rem',
    '@media(max-width:850px)': {
      marginLeft: '0px',
      fontSize: '1.5rem',
    },
  },
});

const ChildCatTable = () => {
  const [visible, setVisible] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.getAllCategory);
  const { category: categoryList } = allCategories;

  const subCatwithMainCat = useSelector(
    (state) => state.getSubCatWithCategoryID,
  );
  const { childCategory: listSubCat } = subCatwithMainCat;

  const createChildCat = useSelector((state) => state.createChildCategory);
  const { success } = createChildCat;

  const allChildCategories = useSelector((state) => state.getAllChildCategory);
  const { childCategory, loading } = allChildCategories;

  const deleteChild = useSelector((state) => state.deleteChildCategory);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = deleteChild;

  const editChild = useSelector((state) => state.editChildCategory);
  const { success: editSuccess, error: editError } = editChild;

  useEffect(() => {
    if (success || successDelete || editSuccess) {
      dispatch(getAllChildCategories());
    }
  }, [dispatch, success, successDelete, editSuccess]);

  const handleSubCategory = (e) => {
    setCategory(e.target.value);
    dispatch(getSubCatUnderMainCatID(e.target.value));
  };

  const childCategoryList = () => {
    if (childCategory) {
      return childCategory.childCategoriesList.map((cat) => (
        <tr>
          <td>{cat.categoryID}</td>
          <td>{cat.subCategoryID}</td>
          <td>{cat.name}</td>
          <td>{cat.createdAt}</td>
          <td>
            <MDBIcon
              icon="edit"
              className={classes.editBtn}
              onClick={(e) => {
                console.log(cat._id);
                setEditOpen(true);
                setName(cat.name);
              }}
            />
            <Modal
              title="Edit Child-Category"
              visible={editOpen}
              onOk={() => {
                dispatch(
                  editChildCategory(
                    {
                      id: cat._id,
                    },
                    name,
                    category,
                    subCategory,
                  ),
                );
                setEditOpen(false);
              }}
              onCancel={() => setEditOpen(false)}
            >
              <label
                htmlFor="editchildcategory"
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
                Main Category*
              </label>
              <div>
                <Select
                  style={{ minWidth: '100%' }}
                  labelId={uuidv4()}
                  id={uuidv4()}
                  value={category}
                  onChange={handleSubCategory}
                >
                  {categoryList &&
                    categoryList.map((cat) => (
                      <MenuItem value={cat._id}>{cat.name}</MenuItem>
                    ))}
                </Select>
              </div>
              <br />
              <label
                htmlFor="Sub-Category"
                className="grey-text font-weight-light h6"
              >
                Sub-Category*
              </label>
              <div>
                <Select
                  style={{ minWidth: '100%' }}
                  labelId={uuidv4()}
                  id={uuidv4()}
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  {listSubCat &&
                    listSubCat.subCategory.map((cat) => (
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
              title="Delete Child-Category"
              visible={visible}
              onOk={() => {
                dispatch(deleteChildCategory(cat._id));
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
      <h5 className="py-1">List of Child-Categories</h5>
      <hr />

      {successDelete && (
        <SuccessMessage
          header="Success"
          message="Child-Category Deleted"
          reset={DELETE_CHILD_CATEGORY_RESET}
        />
      )}
      {errorDelete && (
        <ErrorMessage
          header="Error"
          message={errorDelete}
          reset={DELETE_CHILD_CATEGORY_RESET}
        />
      )}
      {editSuccess && (
        <SuccessMessage
          header="Success"
          message="Child-Category updated"
          reset={EDIT_CHILD_CATEGORY_RESET}
        />
      )}
      {editError && (
        <ErrorMessage
          header="Error"
          message={editError}
          reset={EDIT_CHILD_CATEGORY_RESET}
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
              <th>Child-Category</th>
              <th>Date</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>{childCategoryList()}</MDBTableBody>
        </MDBTable>
      )}
    </>
  );
};

export default ChildCatTable;
