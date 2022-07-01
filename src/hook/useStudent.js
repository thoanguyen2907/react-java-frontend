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
