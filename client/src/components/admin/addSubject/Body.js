import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const courses = useSelector((state) => state.admin.allCourse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    subjectName: "",
    subjectCode: "",
    year: "",
    semester: "",
    totalLectures: "",
    course: "",
    credits: "",
    externalMarks: "",
    sessionalMarks: "",
    totalMarks: "",
    grade: "",
    gradePoint: "",

  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({
        subjectName: "",
        subjectCode: "",
        year: "",
        semester: "",
        totalLectures: "",
        course: "",
        credits: "",
        externalMarks: "",
        sessionalMarks: "",
        totalMarks: "",
        grade: "",
        gradePoint: "",
      });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addSubject(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.subjectAdded) {
      setLoading(false);
      if (store.admin.subjectAdded) {
        setValue({
          subjectName: "",
          subjectCode: "",
          year: "",
          semester: "",
          totalLectures: "",
          course: "",
          credits: "",
          externalMarks: "",
          sessionalMarks: "",
          totalMarks: "",
          grade: "",
          gradePoint: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_SUBJECT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.subjectAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Add Subject</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Subject Name :</h1>

                  <input
                    placeholder="Subject Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.subjectName}
                    onChange={(e) =>
                      setValue({ ...value, subjectName: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Subject Code :</h1>

                  <input
                    required
                    placeholder="Subject Code"
                    className={classes.adminInput}
                    type="text"
                    value={value.subjectCode}
                    onChange={(e) =>
                      setValue({ ...value, subjectCode: e.target.value })
                    }
                  />
                </div>

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
                  <h1 className={classes.adminLabel}>Semester :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.semester}
                    onChange={(e) =>
                      setValue({ ...value, Year: e.target.value })
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
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Total Lectures :</h1>

                  <input
                    required
                    placeholder="Total Lectures"
                    className={classes.adminInput}
                    type="number"
                    value={value.totalLectures}
                    onChange={(e) =>
                      setValue({ ...value, TotalLectures: e.target.value })
                    }
                  />
                  
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Credits :</h1>

                  <input
                    required
                    placeholder="Credits"
                    className={classes.adminInput}
                    type="number"
                    value={value.credits}
                    onChange={(e) =>
                      setValue({ ...value, Credits: e.target.value })
                    }
                  />
               </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>External Marks :</h1>

                  <input
                    required
                    placeholder="External Marks"
                    className={classes.adminInput}
                    type="number"
                    value={value.externalMarks}
                    onChange={(e) =>
                      setValue({ ...value, ExternalMarks: e.target.value })
                    }
                  />   
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Sessional Marks :</h1>

                  <input
                    required
                    placeholder="Sessional Marks"
                    className={classes.adminInput}
                    type="number"
                    value={value.sessionalMarks}
                    onChange={(e) =>
                      setValue({ ...value, SessionalMarks: e.target.value })
                    }
                  />  
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Total Marks :</h1>

                  <input
                    required
                    placeholder="Total Marks"
                    className={classes.adminInput}
                    type="number"
                    value={value.TotalMarks}
                    onChange={(e) =>
                      setValue({ ...value, totalMarks: e.target.value })
                    }
                  />  
                </div>  
                
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
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    subjectName: "",
                    subjectCode: "",
                    year: "",
                    totalLectures: "",
                    course: "",
                    credits: "",
                    externalMarks: "",
                    sessionalMarks: "",
                    totalMarks: "",
                    grade: "",
                    gradePoint: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Subject"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.subjectError || error.backendError) && (
                <p className="text-red-500">
                  {error.subjectError || error.backendError}
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
