import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Detail.style.css";
import { useDetail } from "../../hooks/useDetail";
import InfiniteScroll from "react-infinite-scroller";

const Detail = () => {
  const containerRef = useRef(null);
  const [number, setNumber] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const { data: blogData, isLoading, isError, error } = useDetail(id, number);
  const location = useLocation();
  const address = location.state?.address;
  const [isLastPage, setIsLastPage] = useState(false); // 마지막 페이지 여부 상태 추가

  useEffect(() => {
    if (blogData?.meta.is_end === true) {
      setIsLastPage(true); // 받아온 데이터가 없으면 마지막 페이지로 처리
    } else {
      setIsLastPage(false); // 데이터가 있는 경우 마지막 페이지가 아님
    }
  }, [blogData]);

  const loadFunc = () => {
    if (!isLoading) {
      if (isLastPage) return; // 마지막 페이지인 경우 더 이상 데이터를 불러오지 않음
      setNumber((prevNumber) => prevNumber + 1);
    }
  };

  useEffect(() => {
    if (!isLoading && number > 1) {
      const newBlogs = blogData?.documents || [];
      if (newBlogs.length === 0) {
        setIsLastPage(true); // 마지막 페이지에 도달하면 isLastPage를 true로 설정하여 무한 스크롤 종료
      }
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
    }
  }, [blogData]);

  if (isError) {
    return <alert variant="danger">{error.message}</alert>;
  }

  return (
    <div className="detail-page">
      <h1 className="detail-title">{id}</h1>
      <p className="detail-address">{address ? address : "주소없음"}</p>

      <div ref={containerRef} className="scroll-container">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={!isLastPage} // 마지막 페이지인 경우 무한 스크롤 중지
          loader={
            isLoading && (
              <div className="loader" key={0}>
                Loading...
              </div>
            )
          }
        >
          {blogs.map((blog, index) => (
            <a
              className="section"
              href={blog.url}
              rel="noreferrer"
              target="_blank"
              key={index}
            >
              {blog.thumbnail ? (
                <img
                  className="blog-img"
                  src={blog.thumbnail}
                  alt="블로그 대표 이미지"
                />
              ) : (
                <img
                  className="blog-img"
                  src="https://adventure.co.kr/wp-content/uploads/2020/09/no-image.jpg"
                  alt="이미지 없음"
                />
              )}
              <div className="blog-right">
                <h3
                  className="blog-title"
                  dangerouslySetInnerHTML={{ __html: blog.title }}
                ></h3>
                <p
                  className="blog-contents"
                  dangerouslySetInnerHTML={{ __html: blog.contents }}
                ></p>
                <p className="blog-info">
                  {blog.blogname} | {blog.datetime.substr(0, 10)}
                </p>
              </div>
            </a>
          ))}
        </InfiniteScroll>
        {isLastPage && (
          <div className="last-page-message">마지막 페이지입니다.</div>
        )}
      </div>
    </div>
  );
};

export default Detail;
