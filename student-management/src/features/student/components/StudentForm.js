import * as yup from "yup";

import { Box, Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";

import { Alert } from "@material-ui/lab";
import InputField from "../../../component/formfield/InputField";
import RadioGroupField from "../../../component/formfield/RadioGroupField";
import SelectField from "../../../component/formfield/SelectField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please type your name")
    .test("two-work", "Please type at least two word", (value) => {
      if (!value) return true;
      const parts = value.split(" ") || [];
      return parts.filter((x) => Boolean(x)).length >= 2; // check boolean
    }),
  age: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(18)
    .max(60)
    .typeError("Please type a Number (default is beetwen 18-60)"),
  mark: yup
    .number()
    .positive()
    .required()
    .min(0)
    .max(10)
    .typeError("Please type your mark ( 0-10)"),
  gender: yup.string().oneOf(["male", "female"]).required(),
  city: yup.string().required("Please select your city"),
});

function StudentForm({ initialValue, onSubmit, listCityOption }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const [error,setError] = useState('');
  const handleFormSubmit = async (value) => {
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 3000);
    // });
    // onSubmit(value);
    try {
      setError('');
      await onSubmit(value);
    } catch (error) {
      console.log("failed to update");
      setError(error.message);
    }
  };
  // console.log("heh", listCityOption);
  
  return (
    <Box maxWidth={500}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* form file here */}
        <InputField name="name" control={control} lable="Full Name" />

        <RadioGroupField
          name="gender"
          control={control}
          lable="Gender"
          options={[
            { lable: "Male", value: "male" },
            { lable: "Female", value: "female" },
          ]}
        />
        <InputField name="age" control={control} lable="Age" />
        <InputField name="mark" control={control} lable="Mark" />
        {/* <InputField name="gender" control={control} lable="Gender" /> */}
        <Box mt={3} mb={3}>
          <SelectField
            name="city"
            control={control}
            lable="City"
            options={listCityOption}
          />
        </Box>
        {/* <InputField name="city" control={control} lable="City" /> */}
        {error && <Alert severity="error">{error}</Alert> }
        <Box>
          <Button
            mt={3}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}&nbsp;Save
          </Button>
        </Box>
        {/* end form field */}
      </form>
    </Box>
  );
}

export default StudentForm;
