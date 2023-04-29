import React, { useEffect, useState } from "react";
import ImageHolder from "../assets/imageHolder/ImageHolder";
import "./yourMeme.css";

const YourMeme = () => {
  const [drag, setDrag] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [device, setDevice] = useState<boolean>(false);

  useEffect(() => {
    setDevice(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
  }, []);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setDrag(false);
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let files = e.dataTransfer.files;
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result!.toString());
    };
    reader.readAsDataURL(files[0]);
    setDrag(false);
  };
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result!.toString());
    };
    reader.readAsDataURL(files);
  };
  return (
    <>
      {image ? (
        <ImageHolder setImage={setImage} btn={false} src={image} />
      ) : (
        <div className="yourMeme">
          {!device && (
            <div
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDrop={(e) => dropHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              className={drag ? "leaveArea" : "dropArea"}
            >
              <span className={drag ? "greenText" : "orangeText"}>
                {drag ? "Drop" : "Drag"}
              </span>
               your image here
            </div>
          )}
          {device && (
            <>
              <label className="fileLable" htmlFor="file">
                UPLOAD
              </label>
              <input
                onChange={(e) => {
                  uploadHandler(e);
                }}
                className="fileInput"
                id="file"
                type="file"
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default YourMeme;
