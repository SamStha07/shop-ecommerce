import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, MenuItem, Button } from '@material-ui/core';
import { Breadcrumb, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { getAllCategories } from '../../../redux/actions/categoryActions';
import { getSubCatUnderMainCatID } from '../../../redux/actions/subCategoryActions';
import { getChildCatUnderSubCatID } from '../../../redux/actions/childCategoryActions';
import { createProduct } from '../../../redux/actions/productActions';
import { CREATE_PRODUCT_RESET } from '../../../redux/constants/productConstants';
import axios from '../../../helpers/axios';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  prevImages: {
    minHeight: ' 100%',
    maxHeight: 'auto',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'left',
  },
  image: {
    width: '200px',
    height: '180px',
    marginLeft: '5px',
  },
}));

const Create = ({ history }) => {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.getAllCategory);
  const { category: categoryList } = allCategories;

  const subCatwithMainCat = useSelector(
    (state) => state.getSubCatWithCategoryID,
  );
  const { subCategory: subCategoryList } = subCatwithMainCat;

  const childCatWithSubCat = useSelector(
    (state) => state.getChildCatWithSubCategoryID,
  );
  const { childCategory: childCategoryList } = childCatWithSubCat;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const uploadMultipleFiles = async (e) => {
    e.preventDefault();

    const file = e.target.files;
    const formdata = new FormData();
    for (let key of file) {
      formdata.append('images', key);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        '/multipleuploads/products',
        formdata,
        config,
      );
      setImages(data);
      // console.log(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      // setUploading(false);
    }

    // let id = e.target.id;

    // const pics = [...productImages, e.target.files[0]];
    // setProductImages(pics);
    // // console.log(pics);

    // // shows the while selecting images
    // if (e.target.files) {
    //   const fileArray = Array.from(e.target.files).map((file) =>
    //     URL.createObjectURL(file),
    //   );
    //   // console.log(fileArray);
    //   setImages((prevImg) => prevImg.concat(fileArray));
    //   Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    // }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    dispatch(getSubCatUnderMainCatID(e.target.value));
  };
  const handleSubCategory = (e) => {
    setSubCategory(e.target.value);
    dispatch(getChildCatUnderSubCatID(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const img = images.map((i) => i);
    // console.log({ name, price, quantity, img });

    dispatch(
      createProduct({
        category,
        subCategory,
        brand,
        name,
        price,
        quantity,
        description,
        images,
      }),
    );
    history.push('/dashboard/products');
  };

  return (
    <>
      <h5>Create</h5>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/dashboard/products">Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>

      <Form style={{ width: '75%' }} onSubmit={handleSubmit}>
        <h6>Select Category</h6>

        <div className="row">
          <div className="col-sm col-lg-3  col-md-4 mt-2">
            <TextField
              style={{ width: '100%' }}
              select
              required
              variant="filled"
              id={uuidV4()}
              label="Category"
              value={category}
              onChange={handleCategory}
            >
              {categoryList &&
                categoryList.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div className="col-sm col-lg-3 col-md-4 mt-2">
            <TextField
              style={{ width: '100%' }}
              select
              required
              variant="filled"
              id={uuidV4()}
              label="Sub-Category"
              value={subCategory}
              onChange={handleSubCategory}
            >
              {subCategoryList &&
                subCategoryList.subCategory.map((cat) => (
                  <MenuItem value={cat._id}>{cat.name}</MenuItem>
                ))}
            </TextField>
          </div>
          <div className="col-sm col-lg-3 col-md-4 mt-2">
            <TextField
              style={{ width: '100%' }}
              select
              required
              variant="filled"
              id={uuidV4()}
              label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {childCategoryList &&
                childCategoryList.childCategory.map((cat) => (
                  <MenuItem value={cat._id}>{cat.name}</MenuItem>
                ))}
            </TextField>
          </div>
        </div>
        <hr />

        <h6>Product Description</h6>
        <div className="row">
          <div className="col-sm col-lg-3  col-md-4 mt-2">
            <TextField
              style={{ width: '100%' }}
              required
              id={uuidV4()}
              label="Name"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-sm col-lg-3  col-md-4 mt-2">
            <TextField
              style={{ width: '100%' }}
              required
              id={uuidV4()}
              label="Price"
              variant="filled"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-sm col-lg-3  col-md-4 mt-2">
            <TextField
              style={{ width: '100%' }}
              required
              variant="filled"
              id={uuidV4()}
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></TextField>
          </div>
        </div>

        <div className="row">
          <div className="col-sm col-lg-9 col-md-12 mt-3">
            <TextField
              style={{ width: '100%' }}
              label="Description"
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
          </div>
        </div>
        <hr />

        <h6>Image Uploads</h6>
        <div className="row mt-3 ml-1">
          <div className="form-group">
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={images}
              onChange={(e) => setImages(e.target.value)}
            ></Form.Control>
            <Form.File
              id={uuidv4()}
              label="Choose Files"
              custom
              multiple
              onChange={uploadMultipleFiles}
            />

            {images.length > 0
              ? images.map((pic, index) => (
                  <div key={index} className="mt-2">
                    <li>{pic.img}</li>
                  </div>
                ))
              : null}
          </div>
        </div>
        <hr />
        <Button type="submit">Create</Button>
      </Form>
    </>
  );
};

export default Create;
