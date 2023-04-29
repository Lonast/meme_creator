import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hookType";
import { getMemeThunk, MemeType } from "../../features/memeSlice";
import ImageHolder from "../assets/imageHolder/ImageHolder";

const Meme: React.FC = () => {
  const [meme, setMeme] = useState<MemeType>();
  const id = useParams();
  const selector = useAppSelector((state) => state.meme.meme);
  const statusSelector = useAppSelector((state) => state.meme.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (statusSelector === "none") {
      dispatch(getMemeThunk());
    }
    if (!meme) {
      setMeme(
        selector.find((item) => {
          return item.id === id.id;
        })
      );
    }
  }, [statusSelector]);

  return (
    <div className="meme__container">
      {meme && <ImageHolder btn={true} src={meme!.url} />}
    </div>
  );
};

export default Meme;
