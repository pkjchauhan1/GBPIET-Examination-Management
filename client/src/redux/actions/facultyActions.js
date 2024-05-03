import {
  SET_ERRORS,
  FACULTY_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_FACULTY,
  ADD_TEST,
  GET_TEST,
  ADD_SUBJECT,
  ADD_STUDENT,
  GET_SUBJECT,
  GET_ALL_SUBJECT,
  GET_ALL_STUDENT,
  GET_STUDENT,
  DELETE_STUDENT,
  DELETE_SUBJECT,
  MARKS_UPLOADED,
  ADD_FACULTY,
} from "../actionTypes";

import * as api from "../api";

export const facultySignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.facultySignIn(formData);
    dispatch({ type: FACULTY_LOGIN, data });
    if (data.result.passwordUpdated) navigate("/faculty/home");
    else navigate("/faculty/password");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addSubject = (formData) => async (dispatch) => {
  try {
    const {} = await api.addSubject(formData);
    alert("Subject Added Successfully");
    dispatch({ type: ADD_SUBJECT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getSubject = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getSubject(formData);
    dispatch({ type: GET_SUBJECT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addStudent = (formData) => async (dispatch) => {
  try {
    const {} = await api.addStudent(formData);
    alert("Student Added Successfully");
    dispatch({ type: ADD_STUDENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getStudent(formData);
    dispatch({ type: GET_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getAllStudent();
    dispatch({ type: GET_ALL_STUDENT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllSubject = () => async (dispatch) => {
  try {
    const { data } = await api.getAllSubject();
    dispatch({ type: GET_ALL_SUBJECT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const deleteStudent = (formData) => async (dispatch) => {
  try {
    const {} = await api.deleteStudent(formData);
    alert("Student Deleted");
    dispatch({ type: DELETE_STUDENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteSubject = (formData) => async (dispatch) => {
  try {
    const {} = await api.deleteSubject(formData);
    alert("Subject Deleted");
    dispatch({ type: DELETE_SUBJECT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addFaculty = (formData) => async (dispatch) => {
  try {
    const {} = await api.addFaculty(formData);
    alert("Faculty Added Successfully");
    dispatch({ type: ADD_FACULTY, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const facultyUpdatePassword =
  (formData, navigate) => async (dispatch) => {
    try {
      const {} = await api.facultyUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/faculty/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const updateFaculty = (formData) => async (dispatch) => {
  try {
    const {} = await api.updateFaculty(formData);
    dispatch({ type: UPDATE_FACULTY, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const createTest = (formData) => async (dispatch) => {
  try {
    const {} = await api.createTest(formData);
    alert("Test Created Successfully");

    dispatch({ type: ADD_TEST, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getTest = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getTest(formData);
    dispatch({ type: GET_TEST, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const uploadMark =
  (marks, course, section, year, test) => async (dispatch) => {
    try {
      const formData = {
        marks,
        course,
        section,
        year,
        test,
      };
      const {} = await api.uploadMarks(formData);
      alert("Marks Uploaded Successfully");
      dispatch({ type: MARKS_UPLOADED, payload: true });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
