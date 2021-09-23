import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";

import React from "react";
import { useController } from "react-hook-form";

function SelectField({ control, name, lable, disabled, options }) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  // console.log('xxcxc',error);
  return (
    <FormControl
      variant="outlined"
      fullWidth={true}
      disabled={disabled}
      error={invalid}
      
    >
      <InputLabel id={`${name}_lable`}>{lable}</InputLabel>
      <Select
        labelId={`${name}_lable`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={lable}
      >
        <MenuItem value="">
          <em>Nothing</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem value={option.value} key={option.value}>
              {option.lable}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{ error?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectField;
