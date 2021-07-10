import { CircularProgress, makeStyles } from '@material-ui/core';
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

import {
  deleteCarousel,
  getAllCarousel,
} from '../../../redux/actions/carouselActions';
import { carouselImagesUrl } from '../../../urlConfig';
import SuccessMessage from '../../../components/Message/successMessage';
import {
  CAROUSEL_CREATE_RESET,
  CAROUSEL_DELETE_RESET,
  CAROUSEL_UPDATE_RESET,
} from '../../../redux/constants/carouselConstants';

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
    width: '90px',
    height: '50px',
  },
  description: {
    display: 'block',
    maxWidth: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  name: {
    display: 'block',
    maxWidth: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

const Carousel = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const { loading, carousel } = useSelector((state) => state.getAllCarousel);

  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.deleteCarousel
  );

  const { success: updateSuccess } = useSelector(
    (state) => state.updateCarousel
  );

  const { success: createSuccess } = useSelector(
    (state) => state.createCarousel
  );

  useEffect(() => {
    dispatch(getAllCarousel());
  }, [dispatch, successDelete]);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure ${id} ?`)) {
      dispatch(deleteCarousel(id));
    }
  };

  const carouselList = () => {
    if (carousel) {
      return carousel.map((item) => (
        <tr key={item._id}>
          <td>
            <span className={classes.name}>{item.name}</span>
          </td>
          <td>
            <img
              className={classes.image}
              key={item._id}
              src={carouselImagesUrl(item.image)}
              alt={item._id}
            />
          </td>
          <td>
            <LinkContainer to={`/dashboard/carousel/edit/${item._id}`}>
              <MDBIcon icon='edit' className={classes.editBtn} />
            </LinkContainer>
          </td>
          <td>
            <MDBIcon
              icon='trash'
              className={classes.deleteBtn}
              onClick={() => handleDelete(item._id)}
            />
          </td>
        </tr>
      ));
    }
  };

  return (
    <>
      {createSuccess && (
        <SuccessMessage
          header='Success'
          message='Advertisement Added'
          reset={CAROUSEL_CREATE_RESET}
        />
      )}
      {updateSuccess && (
        <SuccessMessage
          header='Success'
          message='Advertisement Updated'
          reset={CAROUSEL_UPDATE_RESET}
        />
      )}
      {successDelete && (
        <SuccessMessage
          header='Success'
          message='Advertisement Deleted'
          reset={CAROUSEL_DELETE_RESET}
        />
      )}

      {errorDelete && (
        <SuccessMessage
          header='Error'
          message={errorDelete}
          reset={CAROUSEL_DELETE_RESET}
        />
      )}

      <p>
        <Link to='/dashboard/carousel/create'>Create</Link>
      </p>
      <div style={{ width: '70%' }}>
        {loading ? (
          <div style={{ display: 'flex', marginLeft: '50%' }}>
            <CircularProgress />
          </div>
        ) : (
          <MDBTable btn hover responsive>
            <MDBTableHead>
              <tr>
                <th>Name</th>
                <th>Image</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>{carouselList()}</MDBTableBody>
          </MDBTable>
        )}
      </div>
    </>
  );
};

export default Carousel;
