// Todo
// Logic of RQC Columns

import "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeFetching } from "../store/actions/auth";
import StudentService from "../services/StudentService";
import MainLayout from "./MainLayout";

// API USage : https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
const baseURL = process.env.API_URL;

const MyAssignReport = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fetchingStart = () => dispatch(changeFetching(true));
  const fetchingFinish = () => dispatch(changeFetching(false));
  const [data, setData] = React.useState([]);
  const ownerAssignDetailsURL = baseURL + "students/my_assigns";

  useEffect(() => {
    const fetchData = async () => await fetchOwnerReport();
    fetchData();
  }, []);

  const fetchOwnerReport = async () => {
    try {
      fetchingStart();
      const user = loggedInUser.email.split("@")[0];
      const response = await axios.get(ownerAssignDetailsURL, {
        params: {
          user: user,
        },
      });
      dataConvert(response.data.data);
      fetchingFinish();
    } catch (e) {
      console.error(e);
      fetchingFinish();
    }
  };

  const dataConvert = (data) => {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      data[i].name = data[i].student.name;
      delete data[i].student;
      newData.push(data[i]);
    }
    setData(newData);
  };

  return <MainLayout columns={StudentService.columnMyReports} data={data} />;
};

export default MyAssignReport;
