import React from "react";
import BodyLeftRow from "./BodyLeftRow";
import { icons } from "./IconData";
import "./BodyLeft.css";
const BodyLeft = () => {
  const renderIcons = icons.map(({ Icon, Title, id }) => {
    return (
      <>
        <BodyLeftRow key={id} Icon={Icon} title={Title} />
        {id === 2 && <hr />}
        {id === 8 && <hr />}
      </>
    );
  });

  return <div className="body__left">{renderIcons}</div>;
};

export default BodyLeft;
