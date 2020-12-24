import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Spin } from 'antd';
import { makeStyles } from '@material-ui/core';

import { getAllCategories } from '../../redux/actions/categoryActions';
import { getSubCatUnderMainCatID } from '../../redux/actions/subCategoryActions';
import { getChildCatUnderSubCatID } from '../../redux/actions/childCategoryActions';

const useStyles = makeStyles((theme) => ({
  spinner: {
    textAlign: 'center',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0',
  },
}));

const DrawerList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { SubMenu } = Menu;

  const categorylist = useSelector((state) => state.getAllCategory);
  const { category: allCategories } = categorylist;

  const subCatwithMainCat = useSelector(
    (state) => state.getSubCatWithCategoryID,
  );
  const {
    subCategory: subCategoryList,
    loading: loadingSubCat,
  } = subCatwithMainCat;

  const childCatWithSubCat = useSelector(
    (state) => state.getChildCatWithSubCategoryID,
  );
  const {
    childCategory: childCategoryList,
    loading: loadingChildCat,
  } = childCatWithSubCat;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <Menu
        style={{
          width: 230,
          marginLeft: '-15px',
          fontWeight: 'normal',
          zIndex: '2345888',
        }}
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
      >
        {allCategories &&
          allCategories.map((cat) => (
            <SubMenu
              key={cat._id}
              title={cat.name}
              onTitleClick={() => dispatch(getSubCatUnderMainCatID(cat._id))}
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
                        onTitleClick={() =>
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
                                  <Menu.Item key={childCat._id}>
                                    {childCat.name}
                                  </Menu.Item>
                                ),
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
    </div>
  );
};

export default DrawerList;
