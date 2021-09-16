import { Box, Button } from "@material-ui/core";

import InputField from "../../../component/formfield/InputField";
import RadioGroupField from "../../../component/formfield/RadioGroupField";
import React from "react";
import { useForm } from "react-hook-form";

function StudentForm({ initialValue, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
    // resolver :
  });
  const handleFormSubmit = (value) => {
    console.log(value);
  };
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
        <InputField name="city" control={control} lable="City" />

        <Box>
          <Button mt={3} variant="contained" color="primary" type = 'submit'>
            Save
          </Button>
        </Box>
        {/* end form field */}
      </form>
    </Box>
  );
}

export default StudentForm;
