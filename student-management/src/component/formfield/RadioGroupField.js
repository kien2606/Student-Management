import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

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
  return (
    <FormControl component="fieldset" error={invalid} disabled={disabled}>
      <FormLabel component="legend">{lable}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => {
          return <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.lable}
          />;
          
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default SelectField;
