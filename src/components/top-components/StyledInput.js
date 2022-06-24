import { styled } from "@mui/system";

const CustomInput = styled("input")({
  fontFamily: "inherit",
  width: "100%",
  border: 0,
  borderBottom: "1px solid #d2d2d2",
  borderRight: "1px solid #d2d2d2",
  outline: 0,
  // fontSize: 16px,
  padding: "7px 0",
  background: "transparent",
  transition: "border-color 0.2s",
});

export const StyledInput = (props) => {
  return (
    <>
      <CustomInput>{props.children}</CustomInput>
    </>
  );
};
