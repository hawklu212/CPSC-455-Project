/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";

export default function Inputs(props) {
  return (
    <Box sx={{ width: 1}}>
      <Autocomplete>
        <input type="text" placeholder="Origin" style={{width: '100%', fontSize: '14px'}} ref={props.origin} />
      </Autocomplete>
      <Autocomplete>
        <input type="text" placeholder="Destination" style={{width: '100%', fontSize: '14px'}} ref={props.destination} />
      </Autocomplete>
    </Box>
  );
}
