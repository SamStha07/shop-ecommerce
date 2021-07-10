import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Breadcrumb } from 'react-bootstrap';

import {
  getCarouselByID,
  editCarousel,
} from '../../../redux/actions/carouselActions';
import { carouselImagesUrl } from '../../../urlConfig';
import {
  CAROUSEL_BY_ID_RESET,
  CAROUSEL_UPDATE_RESET,
} from '../../../redux/constants/carouselConstants';
import ErrorMessage from '../../../components/Message/errorMessage';
import { Link } from 'react-router-dom';

const EditCarousel = ({ match, history }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const { loading, carousel } = useSelector((state) => state.carouselByID);

  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.updateCarousel
  );

  const id = match.params.id;

  useEffect(() => {
    if (updateSuccess) {
      history.push('/dashboard/carousel/list');
      dispatch({ type: CAROUSEL_BY_ID_RESET });
      dispatch({ type: CAROUSEL_UPDATE_RESET });
    }
  }, [history, dispatch, updateSuccess]);

  useEffect(() => {
    if (!carousel) {
      dispatch(getCarouselByID(id));
    } else {
      if (carousel._id !== id) {
        dispatch(getCarouselByID(id));
      } else {
        setName(carousel.name);
        setImage(carousel.image);
      }
    }
  }, [dispatch, id, carousel]);

  const fileSelectedHandler = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    dispatch(editCarousel(id, formData));
  };

  return (
    <>
      <h4>Edit</h4>
      {updateError && (
        <ErrorMessage
          header='Error'
          message={updateError}
          reset={CAROUSEL_UPDATE_RESET}
        />
      )}

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/dashboard'>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/dashboard/carousel/list'>Carousel</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ width: '40%', margin: '0 20px' }}>
          <Form onSubmit={submitHandler} encType='multipart/form-data'>
            <Form.Group controlId='formName'>
              <Form.Label>Name of the Ad</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.File id='formcheck-api-regular'>
              <Form.File.Label>Upload Image</Form.File.Label>
              <input type='file' onChange={fileSelectedHandler} />
            </Form.File>

            {selectedFile ? (
              <img
                style={{ width: '100%', marginTop: '20px', height: '200px' }}
                src={selectedFile}
                alt=''
              />
            ) : (
              <img
                style={{ width: '100%', marginTop: '20px' }}
                src={carouselImagesUrl(image)}
                alt=''
              />
            )}

            <Button
              style={{ marginTop: '30px', width: '100%', marginLeft: '0px' }}
              variant='dark'
              size='sm'
              type='submit'
            >
              Submit
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditCarousel;
