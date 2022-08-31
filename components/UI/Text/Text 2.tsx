import { ClassNames } from "@emotion/react";
import { Fragment, ReactNode } from "react";
import classes from './Text.module.scss';

const Text = (props:any) => {
    return <div className={`${classes.text} ${props.className}`}>{props.children}</div>
}

export default Text