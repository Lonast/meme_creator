import React from "react";
import { useNavigate } from "react-router-dom";
import "./imgCard.css";
interface CardProps {
  id: string;
  img: string;
}
const ImageCard = (props: CardProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`${props.id}`)} className="imgCard">
      <img className="imgCard__img" src={props.img} alt="" />
    </div>
  );
};

export default ImageCard;
