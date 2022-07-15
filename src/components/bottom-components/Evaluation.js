/* eslint-disable react/prop-types */
export default function Evaluations(props) {
  return (
    <span>
      <h1>
        RESULT
        <textarea
          ref={props.ref1}
          onInput={() => {
            auto_grow(props.ref1);
          }}
        ></textarea>
      </h1>
      <h1>
        RATING
        <textarea
          ref={props.ref2}
          onInput={() => {
            auto_grow(props.ref2);
          }}
        ></textarea>
      </h1>
    </span>
  );
}

function autoGrow(referen) {
  if (referen.current != null) {
    referen.current.style.height = "20px";
    referen.current.style.height = referen.current.scrollHeight + "px";
  }
}
