import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentService from "../../services/StudentService";
import DashboardPage from "../dashboard/Dashboard";
import StudentsProgressCards from "../student/StudentsProgressCards";
import SelectUiByButtons from "../smallComponents/SelectUiByButtons";
import GraphingPresentationJob from "./GraphingPresentationJob";

const baseUrl = import.meta.env.VITE_API_URL;

const PartnerStudentsProgressInCampus = () => {
  const { partnerId } = useParams();
  const [state, setState] = React.useState({
    partnerName: "",
    dataView: 1,
  });

  useEffect(() => {
    axios.get(`${baseUrl}partners/${partnerId}`).then((res) => {
      setState({
        ...state,
        partnerName: res.data.data.name,
      });
    });
  }, []);

  const progressMade = () => {
    setState({ ...state, dataView: 1 });
  };
  const tabularData = () => {
    setState({ ...state, dataView: 0 });
  };
  const showGraphData = () => {
    setState({ ...state, dataView: 2 });
  };
  const { partnerName, dataView } = state;

  const getView = (viewNo) => {
    switch (viewNo) {
      case 0:
        return (
          <DashboardPage
            displayData={StudentService.CampusData}
            url={`partners/joined_progress_made/${partnerId}`}
          />
        );
      case 1:
        return <StudentsProgressCards url={`partners/${partnerId}`} />;

      case 2:
        return (
          <GraphingPresentationJob
            url={`/partners/${partnerId}/students/distribution`}
          />
        );
      default:
        return <StudentsProgressCards url={`partners/${partnerId}`} />;
    }
  };
  return (
    <div>
      <SelectUiByButtons
        name={`Hello ${partnerName}`}
        progressMade={{ label: "Progress Made", action: progressMade }}
        tabularData={{ label: "Tabular Data", action: tabularData }}
        showGraphData={{ label: "Graph on Job", action: showGraphData }}
        selected={
          dataView === 0
            ? "tabularData"
            : dataView === 1
            ? "progressMade"
            : "showGraphData"
        }
      />
      {getView(dataView)}
    </div>
  );
};

export default PartnerStudentsProgressInCampus;
