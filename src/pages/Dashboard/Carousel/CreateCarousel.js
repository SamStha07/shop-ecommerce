import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Button, Form } from 'react-bootstrap';

import { createCarousel } from '../../../redux/actions/carouselActions';
import { CAROUSEL_CREATE_RESET } from '../../../redux/constants/carouselConstants';
import ErrorMessage from '../../../components/Message/errorMessage';
import { Link } from 'react-router-dom';

const CreateCarousel = ({ match, history }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const { success: createSuccess, error: errorCreate } = useSelector(
    (state) => state.createCarousel
  );

  useEffect(() => {
    if (createSuccess) {
      history.push('/dashboard/carousel/list');

      dispatch({ type: CAROUSEL_CREATE_RESET });
    }
  }, [history, createSuccess, dispatch]);

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

    dispatch(createCarousel(formData));
  };

  return (
    <>
      <h4>Create</h4>
      {errorCreate && (
        <ErrorMessage
          header='Error'
          message={errorCreate}
          reset={CAROUSEL_CREATE_RESET}
        />
      )}

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/dashboard'>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/dashboard/carousel/list'>Carousel</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>

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
            <Form.File.Input type='file' onChange={fileSelectedHandler} />
          </Form.File>

          {selectedFile && (
            <img
              style={{ width: '100%', marginTop: '20px', height: '200px' }}
              src={selectedFile}
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
    </>
  );
};

export default CreateCarousel;
