import { Fragment, ReactNode } from "react";
import classes from "./Card.module.scss";

const Card = (props: any) => {
  return (
    <div className={`${props.className} md:px-16 sm:px-1 2sm:px0`}>
      {props.children}
    </div>
  );
};

export default Card;
