import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Row, Col, Form } from 'react-bootstrap';

const UserUpdateLoader = () => {
  return (
    <Row>
      <Col>
        <Form>
          <SkeletonTheme color="lightGray">
            <Skeleton avatar circle={true} height={50} width={50} />
            <Skeleton width={'50%'} height={30} />
            <br />
            <Skeleton width={'100%'} height={33} />
            <br />
            <br />
            <Skeleton width={'50%'} height={30} />
            <br />
            <Skeleton width={'100%'} height={33} />
            <br />
            <br />
          </SkeletonTheme>
        </Form>
      </Col>
    </Row>
  );
};

export default UserUpdateLoader;
