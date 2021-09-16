import React from "react";
import { TextField } from "@material-ui/core";
import { useController } from "react-hook-form";

function InputField({ control, name, lable, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      label={lable}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}

export default InputField;
