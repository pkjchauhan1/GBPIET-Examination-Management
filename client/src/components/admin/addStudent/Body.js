import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addStudent } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const courses = useSelector((state) => state.admin.allCourse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const errorRef = useRef();

  const [value, setValue] = useState({
    name: "",
    email: "",
    course: "",
    contact_number: "",
    university_roll_no: "",
    university_enrollment_no: "",
    college_id: "",
    gender: "",
    year: "",
    father_name: "",
    semester: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      errorRef.current.scrollIntoView({ behavior: "smooth" });
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(value));
    setError({});
    setLoading(true);
  };

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        setValue({
          name: "",
          email: "",
          course: "",
          contact_number: "", 
          gender: "",
          year: "",
          father_name: "",
          semester: "",
          university_roll_no:"",
          university_enrollment_no:"",
          college_id:"",    
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Add Student</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form
            className={`${classes.adminForm0} scrollbar-thin scrollbar-track-white scrollbar-thumb-black overflow-y-scroll h-[35rem]`}
            onSubmit={handleSubmit}
          >
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Name :</h1>

                  <input
                    placeholder="Full Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Email :</h1>

                  <input
                    required
                    placeholder="Email"
                    className={classes.adminInput}
                    type="email"
                    value={value.email}
                    onChange={(e) =>
                      setValue({ ...value, email: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>College ID :</h1>

                  <input
                    required
                    placeholder="College ID"
                    className={classes.adminInput}
                    type="number"
                    value={value.college_id}
                    onChange={(e) =>
                      setValue({ ...value,college_id: e.target.value })
                    }
                  />
                </div>

                {/* <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Batch :</h1>

                  <input
                    required
                    placeholder="yyyy-yyyy"
                    className={classes.adminInput}
                    type="text"
                    value={value.batch}
                    onChange={(e) =>
                      setValue({ ...value, batch: e.target.value })
                    }
                  />
                </div> */}
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Father's Name :</h1>

                  <input
                    required
                    placeholder="Father's Name"
                    className={classes.adminInput}
                    type="text"
                    value={value.father_name}
                    onChange={(e) =>
                      setValue({ ...value, father_name: e.target.value })
                    }
                  />
                </div>
                {/* <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Mother's Name :</h1>

                  <input
                    required
                    placeholder="Mother's Name"
                    className={classes.adminInput}
                    type="text"
                    value={value.motherName}
                    onChange={(e) =>
                      setValue({ ...value, motherName: e.target.value })
                    }
                  />
                </div> */}
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Year :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.year}
                    onChange={(e) =>
                      setValue({ ...value, year: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>University Enrollment No :</h1>
                 <input
                    required
                    placeholder="university enrollment no"
                    className={classes.adminInput}
                    type="number"
                    value={value.university_enrollment_no}
                    onChange={(e) =>
                      setValue({ ...value, university_enrollment_no: e.target.value })
                    }
                  />
                </div>
              </div>

  
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Course :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.course}
                    onChange={(e) =>
                      setValue({ ...value, course: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {courses?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.course}>
                        {dp.course}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Gender :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.gender}
                    onChange={(e) =>
                      setValue({ ...value, gender: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
  
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Contact Number :</h1>

                  <input
                    required
                    placeholder="Contact Number"
                    className={classes.adminInput}
                    type="number"
                    value={value.contact_number}
                    onChange={(e) =>
                      setValue({ ...value, contact_number: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>University Roll No :</h1>

                  <input
                    required
                    placeholder="University roll no"
                    className={classes.adminInput}
                    type="number"
                    value={value.university_roll_no}
                    onChange={(e) =>
                      setValue({ ...value, university_roll_no: e.target.value })
                    }
                  />
                </div>
                
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Semester :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.semester}
                    onChange={(e) =>
                      setValue({ ...value, semester: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    name: "",
                    email: "",
                    course: "",
                    contact_number: "",
                    gender: "",
                    year: "",
                    father_name: "",
                    Semester: "",
                    university_roll_no:"",
                    university_enrollment_no:"",
                    college_id:"",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>
            <div ref={errorRef} className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Student"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.emailError || error.backendError) && (
                <p className="text-red-500">
                  {error.emailError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
