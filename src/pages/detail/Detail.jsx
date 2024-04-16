import React from 'react';
import { useParams } from 'react-router-dom';
import './Detail.style.css';
import { useDetail } from '../../hooks/useDetail';

const Detail = () => {
  const { id } = useParams();
  console.log('검색어 페이지 주소 : ', id);
  const { data, isLoading, isError, error } = useDetail(id);
  console.log('검색 데이터', data);
  if (isLoading) {
    // return <isLoading />;
  }
  if (isError) {
    // return <Alert variant="danger">{error.message}</Alert>;
  }

  return <div>Detail</div>;
};

export default Detail;
