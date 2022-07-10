import axios from "axios";
import {useState, useEffect} from "react";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const getAllStudent = async () => {
    try {
      await axios.get("api/v1/students").then((res) => {
        setStudents(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStudent();
  }, []);

  return students;
};

export const addNewStudent = async (student) => {
  return await axios.post("api/v1/students", student, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteStudent = async (studentId) => {
  return await axios.delete(`api/v1/students/${studentId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const updateStudent = async (student) => {
  return await axios.put(`api/v1/students/`, student, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
