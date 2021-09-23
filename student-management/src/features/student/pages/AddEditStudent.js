import { Box, Typography } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { ChevronLeft } from "@material-ui/icons";
import StudentForm from "../components/StudentForm";
import { citySelector } from "../../city/citySlice";
import studentApi from "../../../api/studentApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function AddEditStudent() {
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState();
  const history = useHistory();
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log("failed to catch data ", error);
      }
    })();
  }, [studentId]);
  const cityState = useSelector(citySelector);
  let listCityOption = [];
  if (cityState.list) {
    listCityOption = cityState.list.map((city) => ({
      lable: city.name,
      value: city.code,
    }));
  }
  // console.log('note',listCityOption);
  const initialValue = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  };
  const handleStudentFormSubmit = async (value) => {
    // call api to update
    // no use try catch here , because i want to catch error in the form to use "error" variable for notify form
    if (isEdit) {
      await studentApi.update(value);
    } else {
      await studentApi.add(value);
    }
    // toast success
    toast.success("Save Student Successfully");

    history.push("/admin/students");
  };

  console.log(isEdit, student);
  return (
    <Box>
      <Link to="/admin/students">
        <Typography style={{ display: "flex", alignItems: "center" }}>
          <ChevronLeft />
          Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEdit ? "Update Student Infomation" : "Add New Student"}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={1}>
          <StudentForm
            initialValue={initialValue}
            onSubmit={handleStudentFormSubmit}
            listCityOption={listCityOption}
          />
        </Box>
      )}
      {/* <Box mt={1}>
            <StudentForm
              initialValue={initialValue}
              onSubmit={handleStudentFormSubmit}
              listCityOption={listCityOption}
            />
          </Box> */}
    </Box>
  );
}

export default AddEditStudent;
