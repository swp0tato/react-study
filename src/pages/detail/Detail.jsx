import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './Detail.style.css';
import { useDetail } from '../../hooks/useDetail';
import InfiniteScroll from 'react-infinite-scroller';

const Detail = () => {
  const [number, setNumber] = useState(1);
  const { id } = useParams();
  const { data: blogData, isLoading, isError, error } = useDetail(id, number);
  console.log(blogData);
  const blogs = blogData?.documents;

  const location = useLocation();
  const address = location.state?.address;

  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <alert variant="danger">{error.message}</alert>;
  }

  const loadFunc = () => {
    if (!isLoading) {
      setNumber(number + 1);
    }
  };

  return (
    <div className="detail-page">
      <h1 className="detail-title">{id}</h1>
      <p className="detail-address">{address ? address : '주소없음'}</p>

      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {blogs ? (
          blogs?.map((blog, index) => (
            <a className="section" href={blog.url} rel="noreferrer" target="_blank" key={index}>
              {blog.thumbnail ? (
                <img className="blog-img" src={blog.thumbnail} alt="블로그 대표 이미지" />
              ) : (
                <img
                  className="blog-img"
                  src="https://adventure.co.kr/wp-content/uploads/2020/09/no-image.jpg"
                  alt="이미지 없음"
                />
              )}
              <div className="blog-right">
                <h3 className="blog-title" dangerouslySetInnerHTML={{ __html: blog.title }}></h3>
                <p className="blog-contents" dangerouslySetInnerHTML={{ __html: blog.contents }}></p>
                <p className="blog-info">
                  {blog.blogname} | {blog.datetime.substr(0, 10)}
                </p>
              </div>
            </a>
          ))
        ) : (
          <></>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Detail;
