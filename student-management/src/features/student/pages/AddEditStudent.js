import { Box, Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { ChevronLeft } from "@material-ui/icons";
import StudentForm from "../components/StudentForm";
import studentApi from "../../../api/studentApi";

function AddEditStudent() {
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState();
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  const initialValue = {
    name: "",
    age: "",
    mark: "",
    gender: "",
    city: "",
    ...student,
  };
  const handleStudentFormSubmit = (value) => {
    console.log("value student form", value);
  };
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

      {!isEdit ||
        (Boolean(student) && (
          <Box mt={1}>
            <StudentForm
              initialValue={initialValue}
              onSubmit={handleStudentFormSubmit}
            />
          </Box>
        ))}
    </Box>
  );
}

export default AddEditStudent;
