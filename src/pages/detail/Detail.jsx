import React from 'react';
import { useParams } from 'react-router-dom';
import './Detail.style.css';
import { useDetail } from '../../hooks/useDetail';

const Detail = () => {
  const { id } = useParams();
  console.log('검색어 페이지 주소 : ', id);
  const { data: blogData, isLoading, isError, error } = useDetail(id);
  console.log('검색 데이터', blogData);
  const blogs = blogData?.documents;

  if (isLoading) {
    // return <isLoading />;
  }
  if (isError) {
    return <alert variant="danger">{error.message}</alert>;
  }

  return (
    <div className="detail-page">
      <div className="detail-subject">영주시 디저트 카페</div>
      <h1 className="detail-title">로슈아커피</h1>
      <p className="detail-address">경기 양주시 광사로 145 1,2층 (우)11494</p>
      {blogs?.map((blog, index) => (
        <a className="section" href={blog.url} rel="noreferrer" target="_blank">
          <img className="blog-img" src={blog.thumbnail} alt="블로그 대표 이미지" width={520} />
          <div className="blog-right">
            <h3 className="blog-title" dangerouslySetInnerHTML={{ __html: blog.title }}></h3>
            <p className="blog-contents" dangerouslySetInnerHTML={{ __html: blog.contents }}></p>
            <p className="blog-info">
              {blog.blogname} | {blog.datetime.substr(0, 10)}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Detail;
