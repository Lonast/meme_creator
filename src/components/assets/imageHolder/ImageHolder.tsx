import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./meme.css";
import { toPng } from "html-to-image";
import { v4 as uuid } from "uuid";
import { useMousePosition } from "../../../hooks/useMousePosition";
import Text from "../../meme/Text";
import { TextProps } from "../../meme/Text";
export interface Par {
  id: string;
  text: string;
  pX: number;
  pY: number;
  background: string;
  borderRadius: string;
  padding: string;
  color: string;
  fontSize: string;
  stroke: boolean;
  shadow: boolean;
  style?: {
    left: number;
    top: number;
  };
  move: boolean;
}
interface ImageHolderTypes {
  src: string;
  btn: boolean;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
}

const ImageHolder = (props: ImageHolderTypes) => {
  const [text, setText] = useState<string>("");
  const [par, setPar] = useState<Par[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { x, y } = useMousePosition(ref);
  const [textStyle, setTextStyle] = useState<TextProps>({
    id: "1",
    text: "",
    stroke: true,
    fontSize: "4rem",
    shadow: false,
    color: "white",
  });

  const setParagrph: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    if (text) {
      setPar((prev) => {
        return [
          ...prev,
          {
            id: uuid(),
            background: "none",
            padding: "none",
            borderRadius: "none",
            stroke: true,
            fontSize: "4rem",
            shadow: false,
            color: "white",
            text: text,
            pX: e.clientX - left,
            pY: e.clientY - top,
            style: {
              left: left,
              top: top,
            },
            move: false,
          },
        ];
      });
    }
  };
  const deletePar = (id: string) => {
    setTextStyle((prev) => {
      return { ...prev, text: "" };
    });
    setPar((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
    console.log(par.length);

    if (par.length === 1) {
      setActive(false);
      console.log(active);

      console.log("a");
    }
  };
  const show = (showId: string) => {
    if (check === false) {
      setPar((prev) => {
        return prev.map((item) => {
          return item.id === showId
            ? {
                ...item,
                borderRadius: "10px",

                background: "rgba(33, 184, 237, 0.3)",
              }
            : item;
        });
      });
    }
    setCheck(true);
  };
  const hide = () => {
    setPar((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          padding: "0",
          background: "none",
        };
      });
    });
    setCheck(false);
  };
  const move = (e: React.MouseEvent<HTMLHeadingElement>, id: string) => {
    setPar((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, move: true } : item;
      });
    });
  };
  const stop = (e: React.MouseEvent<HTMLHeadingElement>, id: string) => {
    setPar((prev) => {
      return prev.map((item) => {
        return item.id === id
          ? {
              ...item,
              pX: x - item.style!.left - 10,
              pY: y - item.style!.top - 10,
              move: false,
            }
          : item;
      });
    });
  };

  const downloadPng = () => {
    ref.current!.style.borderRadius = "0px";
    toPng(ref.current!, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      ref.current!.style.borderRadius = "20px";
    }, 200);
  };
  const buttonHandler = () => {
    if (props.btn) {
      navigate(-1);
    } else {
      props.setImage!("");
    }
  };

  return (
    <div className="meme">
      <div className="button__contaier">
        <button onClick={buttonHandler} className="meme__back">
          Back
        </button>
      </div>
      <input
        onChange={(e) => setText(e.target.value)}
        className="meme__input"
        placeholder="Input your text"
      ></input>
      <div className="image_block">
        <div className="save__block" ref={ref}>
          <img
            className="save__block_img"
            onClick={setParagrph}
            src={props.src}
            alt=""
          />
          <div>
            {par.map((item) => {
              return (
                <h1
                  key={uuid()}
                  className="meme__Text"
                  onMouseDown={(e) => move(e, item.id)}
                  onMouseUp={(e) => stop(e, item.id)}
                  style={{
                    left: item.move ? x - item.style!.left - 10 : item.pX,
                    top: item.move ? y - item.style!.top - 10 : item.pY,
                    background: item.background,
                    color: item.color,
                    fontSize: item.fontSize,
                    textShadow: item.shadow
                      ? "5px 5px 5px rgba(0,0,0,0.7)"
                      : "none",
                    WebkitTextStroke: item.stroke ? "2px #000" : "none",
                    padding: item.padding,
                    borderRadius: item.borderRadius,
                  }}
                >
                  {item.text}
                </h1>
              );
            })}
          </div>
        </div>

        <div className="text__container">
          {active && (
            <Text
              id={textStyle.id}
              setPar={setPar}
              color={textStyle.color}
              shadow={textStyle.shadow}
              stroke={textStyle.stroke}
              fontSize={textStyle.fontSize}
              text={textStyle.text}
            />
          )}
          <div className="list">
            <ul>
              {par.map((item) => {
                return (
                  <div key={uuid()}>
                    <div className="list__item">
                      <li
                        onClick={() => {
                          setTextStyle({
                            id: item.id,
                            color: item.color,
                            fontSize: item.fontSize,
                            shadow: item.shadow,
                            stroke: item.stroke,
                            text: item.text,
                          });
                          setActive(true);
                        }}
                        className="list__item"
                        onMouseOver={() => show(item.id)}
                        onMouseOut={hide}
                      >
                        {item.text}
                      </li>
                      <button
                        onClick={() => deletePar(item.id)}
                        className="list__item-button"
                      >
                        x
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <button onClick={downloadPng} className="download__btn">
        Download
      </button>
    </div>
  );
};

export default ImageHolder;
