/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";

export default function Inputs(props) {
  return (
    <Box>
      <Autocomplete>
        <input type="text" placeholder="Origin" style={{width: '250px', fontSize: '14px'}} ref={props.origin} />
      </Autocomplete>
      <Autocomplete>
        <input type="text" placeholder="Destination" style={{width: '250px', fontSize: '14px'}} ref={props.destination} />
      </Autocomplete>
    </Box>
  );
}

// function auto_grow(referen) {
//   if (referen.current != null) {
//     referen.current.style.height = "20px";
//     referen.current.style.height = referen.current.scrollHeight + "px";
//   }
// }
