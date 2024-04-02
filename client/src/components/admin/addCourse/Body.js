import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_COURSE, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("");
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addCourse({ course }));
    setCourse("");
  };

  useEffect(() => {
    if (store.errors || store.admin.courseAdded) {
      setLoading(false);
      if (store.admin.courseAdded) {
        setCourse("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_COURSE, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.courseAdded]);

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
            <div className="flex py-10 ml-10 space-x-28">
              <div className="flex space-y-10 ">
                <div className="flex space-x-3">
                  <h1 className={classes.adminLabel}>Course :</h1>

                  <input
                    placeholder="Course"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => setCourse("")}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Course"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.courseError || error.backendError) && (
                <p className="text-red-500">
                  {error.courseError || error.backendError}
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
