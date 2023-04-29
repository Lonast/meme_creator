import React, { useEffect, useState } from "react";
import { getMemeThunk } from "../../features/memeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hookType";
import ImageCard from "../imgCard/ImageCard";
import "./memesPage.css";
import ReactLoading from "react-loading";
import Pagination from "../pagination/Pagination";
import Page from "../page/Page";

const MemesPage = () => {
  const selector = useAppSelector((state) => state.meme);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imgPerPage, setImgPerPage] = useState<number>(8);
  const dispatch = useAppDispatch();
  // const [activePage, setActivePage] = useState<number>(1);

  const indexOfLastPost: number = currentPage * imgPerPage;
  const indexOfFirstPost: number = indexOfLastPost - imgPerPage;
  const currentPosts = selector.meme.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(selector.meme.length / imgPerPage);

  useEffect(() => {
    dispatch(getMemeThunk());
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="memeContainer">
      <div className="memesPage">
        {selector.status === "fulfilled" ? (
          currentPosts.map((item) => {
            return <ImageCard id={item.id} key={item.id} img={item.url} />;
          })
        ) : (
          <ReactLoading height={667} width={375} />
        )}
      </div>
      {/* <Pagination
        active={activePage}
        setActive={setActivePage}
        imgPerPage={imgPerPage}
        totalImgs={selector.meme.length}
        paginate={paginate}
      /> */}
      {selector.status === "fulfilled" && (
        <Page pages={howManyPages} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default MemesPage;
