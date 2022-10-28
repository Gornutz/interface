import { Button } from "@mui/material";
import React from "react";

interface Props {
	onClick: () => void
}

const MaxButton = (props: Props) => {
	return (
		<Button className="maxbtn" onClick={props.onClick}>Max</Button>
	)
}

export default MaxButton;