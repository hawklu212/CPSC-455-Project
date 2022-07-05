import { Autocomplete } from "@react-google-maps/api";
import { Button } from "@mui/material";

export default function Inputs(props) {
  return (
    <box>
      <Autocomplete>
        <input type="text" placeholder="Origin" ref={props.origin} />
      </Autocomplete>
      <Autocomplete>
        <input type="text" placeholder="Destination" ref={props.destination} />
      </Autocomplete>
    </box>
  );
}

function auto_grow(referen) {
  if (referen.current != null) {
    referen.current.style.height = "20px";
    referen.current.style.height = referen.current.scrollHeight + "px";
  }
}
