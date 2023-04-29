import React, { useEffect, useState } from "react";
import "./text.css";
import { Par } from "../assets/imageHolder/ImageHolder";
export interface TextProps {
  id: string;
  fontSize: string;
  color: string;
  stroke: boolean;
  text: string;
  shadow: boolean;
  setPar?: React.Dispatch<React.SetStateAction<Par[]>>;
}
interface textStyle {
  color?: string;
  stroke?: boolean;
  shadow?: boolean;
}
const Text: React.FC<TextProps> = (props) => {
  const [color, setColor] = useState<textStyle>({
    color: props.color,
    stroke: props.stroke,
    shadow: props.shadow,
  });
  useEffect(() => {
    setColor({
      color: props.color,
      stroke: props.stroke,
      shadow: props.shadow,
    });
    return () => {
      setColor({
        color: "",
        stroke: false,
        shadow: false,
      });
    };
  }, [props.color, props.stroke, props.shadow]);

  const changeColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prev) => {
      return { ...prev, color: e.target.value };
    });
    props.setPar!((prev) => {
      return prev.map((item) => {
        return item.id === props.id
          ? { ...item, color: e.target.value.toString() }
          : item;
      });
    });
  };

  const changeStrokeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prev) => {
      return { ...prev, stroke: !prev.stroke };
    });
    props.setPar!((prev) => {
      return prev.map((item) => {
        return item.id === props.id ? { ...item, stroke: !item.stroke } : item;
      });
    });
  };

  const changeShadoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prev) => {
      return { ...prev, shadow: !prev.shadow };
    });
    props.setPar!((prev) => {
      return prev.map((item) => {
        return item.id === props.id ? { ...item, shadow: !item.shadow } : item;
      });
    });
  };

  return (
    <div className="text">
      <h1>Text: {!!color.color && props.text.toUpperCase()}</h1>
      <div className="text__size">
        <h3>Font size </h3>
        <select
          value={parseInt(props.fontSize)}
          onChange={(e) => {
            props.setPar!((prev) => {
              return prev.map((item) => {
                return item.id === props.id
                  ? { ...item, fontSize: e.target.value.toString() + "rem" }
                  : item;
              });
            });
          }}
          name="sizes"
          id="sizes"
        >
          <option value="0.5">0.5</option>
          <option value="1">1</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
          <option value="2.5">2.5</option>
          <option value="3">3</option>
          <option value="3.5">3.5</option>
          <option value="4">4</option>
          <option value="4.5">4.5</option>
          <option value="5">5</option>
          <option value="5.5">5.5</option>
        </select>
      </div>
      <div className="text__color">
        <h3>Color</h3>
        <div className="text__color-colors">
          <div className="color white"></div>
          <input
            checked={color.color === "white"}
            name="color"
            type="radio"
            onChange={changeColorHandler}
            value={"white"}
          />
          <div className="color red"></div>
          <input
            value={"red"}
            onChange={changeColorHandler}
            checked={color.color === "red"}
            name="color"
            type="radio"
          />
          <div className="color green"></div>
          <input
            value={"green"}
            onChange={changeColorHandler}
            checked={color.color === "green"}
            name="color"
            type="radio"
          />
          <div className="color blue"></div>
          <input
            checked={color.color === "blue"}
            name="color"
            type="radio"
            onChange={changeColorHandler}
            value={"blue"}
          />
          <div className="color black"></div>
          <input
            checked={color.color === "black"}
            name="color"
            value={"black"}
            onChange={changeColorHandler}
            type="radio"
          />
        </div>
      </div>
      <div className="stroke">
        <h3>Stroke</h3>
        <label htmlFor="stroke">Yes</label>
        <input
          checked={color.stroke}
          id="stroke"
          name="stroke"
          type="radio"
          onChange={changeStrokeHandler}
        />
        <label id="nostroke" htmlFor="stroke">
          No
        </label>
        <input
          onChange={changeStrokeHandler}
          checked={!color.stroke}
          id="nostroke"
          name="stroke"
          type="radio"
        />
      </div>
      <div className="shadow">
        <h3>Shadow</h3>
        <label htmlFor="shadow">Yes</label>
        <input
          onChange={changeShadoHandler}
          checked={color.shadow}
          id="stroke"
          name="shadow"
          type="radio"
        />
        <label id="nostroke" htmlFor="shadow">
          No
        </label>
        <input
          checked={!color.shadow}
          id="nostroke"
          name="shadow"
          type="radio"
          onChange={changeShadoHandler}
        />
      </div>
    </div>
  );
};

export default Text;
