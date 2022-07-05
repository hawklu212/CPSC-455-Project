import Details from "./Details";
import React, { useRef } from "react";
import { Box } from "@mui/material";
export default function LeftBottomContainer() {
  const refer1 = useRef(null);
  const refer2 = useRef(null);
  return (
    <Box id="LEFT_BOTTOM" style={{ display: "inline-block" }}>
      <Details ref1={refer1} ref2={refer2} />
    </Box>
  );
}
