import React, { useEffect } from 'react';
import { Menu, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { getAllCategories } from '../redux/actions/categoryActions';
import { getSubCatUnderMainCatID } from '../redux/actions/subCategoryActions';
import { getChildCatUnderSubCatID } from '../redux/actions/childCategoryActions';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  spinner: {
    textAlign: 'center',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0',
  },
}));

const List = () => {
  const classes = useStyles();
  const { SubMenu } = Menu;

  const dispatch = useDispatch();

  const categorylist = useSelector((state) => state.getAllCategory);
  const { category: allCategories } = categorylist;

  const subCatwithMainCat = useSelector(
    (state) => state.getSubCatWithCategoryID
  );
  const {
    subCategory: subCategoryList,
    loading: loadingSubCat,
  } = subCatwithMainCat;

  const childCatWithSubCat = useSelector(
    (state) => state.getChildCatWithSubCategoryID
  );
  const {
    childCategory: childCategoryList,
    loading: loadingChildCat,
  } = childCatWithSubCat;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleClick = (e) => {
    console.log('click', e);
  };

  return (
    <>
      <Menu mode='vertical' onClick={handleClick}>
        {allCategories &&
          allCategories.map((cat) => (
            <SubMenu
              key={cat._id}
              title={cat.name}
              onTitleMouseEnter={() =>
                dispatch(getSubCatUnderMainCatID(cat._id))
              }
            >
              {loadingSubCat ? (
                <div className={classes.spinner}>
                  <Spin />
                </div>
              ) : (
                <>
                  {subCategoryList &&
                    subCategoryList.subCategory.map((subCat) => (
                      <SubMenu
                        key={subCat._id}
                        title={subCat.name}
                        onTitleMouseEnter={() =>
                          dispatch(getChildCatUnderSubCatID(subCat._id))
                        }
                      >
                        {loadingChildCat ? (
                          <diV className={classes.spinner}>
                            <Spin />
                          </diV>
                        ) : (
                          <>
                            {childCategoryList &&
                              childCategoryList.childCategory.map(
                                (childCat) => (
                                  // <LinkContainer to={`/{}`}>
                                  <Menu.Item key={childCat._id}>
                                    <Link
                                      to={`${childCat.categoryID.name}/${childCat.subCategoryID.name}/${childCat._id}`}
                                    >
                                      {childCat.name}
                                    </Link>
                                  </Menu.Item>
                                  // </LinkContainer>
                                )
                              )}
                          </>
                        )}
                      </SubMenu>
                    ))}
                </>
              )}
            </SubMenu>
          ))}
      </Menu>
    </>
  );
};

export default List;
