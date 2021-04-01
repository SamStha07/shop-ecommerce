import { CircularProgress } from '@material-ui/core';
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { userDelete, userList } from '../../../redux/actions/userActions';
import { userImageUrl } from '../../../urlConfig';
import { LinkContainer } from 'react-router-bootstrap';
import Modal from 'antd/lib/modal/Modal';
import SuccessMessage from '../../../components/Message/successMessage';
import {
  USERS_DELETE_RESET,
  USERS_EDIT_RESET,
} from '../../../redux/constants/userConstants';

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
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  name: {
    display: 'block',
    maxWidth: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

const AllUsers = () => {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.usersList);
  const { loading, usersList } = list;

  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.usersDelete
  );

  const { success: editSuccess } = useSelector((state) => state.usersEdit);

  useEffect(() => {
    dispatch(userList());
  }, [dispatch, deleteSuccess]);

  const allUsersList = () => {
    if (usersList) {
      return usersList.users.map((user) => (
        <tr>
          <td>
            <span className={classes.name}>{user.name}</span>
          </td>
          <td>
            <span className={classes.name}>{user.email}</span>
          </td>
          <td>
            <img
              className={classes.image}
              src={userImageUrl(user.photo)}
              alt={user._id}
            />
          </td>
          <td>{user.role}</td>
          <td>
            <LinkContainer to={`/dashboard/users/edit/${user._id}`}>
              <MDBIcon icon='edit' className={classes.editBtn} />
            </LinkContainer>
          </td>
          <td>
            <MDBIcon
              icon='trash'
              className={classes.deleteBtn}
              onClick={(e) => setVisible(true)}
            />

            <Modal
              title='Delete User'
              visible={visible}
              onOk={() => {
                dispatch(userDelete(user._id));
                setVisible(false);
              }}
              onCancel={() => setVisible(false)}
            >
              <p>Are you sure? You want to delete {user.email}</p>
            </Modal>
          </td>
        </tr>
      ));
    }
  };

  return (
    <>
      <h5>Users List</h5>

      {deleteSuccess && (
        <SuccessMessage
          header='Success'
          message='User Deleted'
          reset={USERS_DELETE_RESET}
        />
      )}

      {deleteError && (
        <SuccessMessage
          header='Error'
          message={deleteError}
          reset={USERS_DELETE_RESET}
        />
      )}

      {editSuccess && (
        <SuccessMessage
          header='Success'
          message='User Edited'
          reset={USERS_EDIT_RESET}
        />
      )}

      <MDBTable btn hover responsive>
        <MDBTableHead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Role</th>
          </tr>
        </MDBTableHead>
        {loading ? (
          <div
            style={{
              position: 'absolute',
              margin: '0 auto',
              top: '50%',
              left: '50%',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <MDBTableBody>{allUsersList()}</MDBTableBody>
        )}
      </MDBTable>
    </>
  );
};

export default AllUsers;
