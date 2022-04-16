import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DatePicker from "@mui/lab/DatePicker";
import DateFnsUtils from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useSnackbar } from "notistack";

const { allStages } = require("../config");

const baseUrl = import.meta.env.VITE_API_URL;
const SlotBooking = () => {
  const [slotCanceled, setSlotCancelled] = React.useState(true);
  const [CurrentTimeId, setCurrentTimeId] = React.useState(null);
  const [slotBookingDetails, setSlotBookingDetails] = React.useState({});
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    maxWidth: "500px",
    minWidth: "200px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    p: 4,
  };
  const month = {
    Jan: `01`,
    Feb: `02`,
    Mar: `03`,
    Apr: `04`,
    May: `05`,
    Jun: `06`,
    Jul: `07`,
    Aug: `08`,
    Sep: `09`,
    Oct: `10`,
    Nov: `11`,
    Dec: `12`,
  };
  const DefaultTimings = [
    {
      id: 1,
      from: "9:00",
      to: "10:00",
    },
    {
      id: 2,
      from: "10:00",
      to: "11:00",
    },
    {
      id: 3,
      from: "11:00",
      to: "12:00",
    },
    {
      id: 7,
      from: "12:00",
      to: "13:00",
    },
    {
      id: 4,
      from: "13:00",
      to: "14:00",
    },
    {
      id: 5,
      from: "14:00",
      to: "15:00",
    },
    {
      id: 6,
      from: "15:00",
      to: "16:00",
    },
  ];
  const [date, setDate] = React.useState(new Date());
  const [StartTime, setStartTime] = React.useState("");
  const [EndTime, setEndTime] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const studentId = location.pathname.split("/")[2];
  const [studentData, setStudentData] = React.useState({});
  const [Timings, setTimings] = React.useState(DefaultTimings);

  const handleDateChange = (dater) => {
    //console.log(dater);
    const d = `${new Date(dater)}`.split(" ");
    d[2] += ",";
    const DateToSend = [d[3], month[d[1]], d[2]].join("-").replace(",", "");
    setDate(DateToSend);
    fetch(`${baseUrl}/slot/interview/check/ondate/${DateToSend}/1`).then(
      (res) => {
        //
        res.json().then((data) => {
          if (data.data.length > 0) {
            let FilteredTimings;
            if (new Date(dater).getDate() === new Date().getDate()) {
              // console.log(dater);
              FilteredTimings = data.data.filter((time) => {
                if (
                  time.availiblity &&
                  new Date().getHours() < time.from.split(":")[0]
                ) {
                  return true;
                }
                return false;
              });
            } else {
              FilteredTimings = data.data.filter((time) => {
                if (time.availiblity) {
                  return true;
                }
                return false;
              });
            }

            setTimings(FilteredTimings);
          } else {
            //console.log(Timings);
            setTimings(DefaultTimings);
          }
        });
      }
    );
  };

  useEffect(() => {
    // console.log();
    fetch(`${baseUrl}/slot/interview/${studentId}`).then((res) => {
      res.json().then((data) => {
        // console.log(data.data[0]);
        setSlotBookingDetails(data.data[0]);
        setSlotCancelled(data.data[0].is_cancelled);
      });
    });
    fetch(`${baseUrl}/students/${studentId}`).then((res) => {
      res.json().then((data) => {
        // console.log(data.data[0]);
        setStudentData({
          name: data.data[0].name,
          stage: allStages[data.data[0].stage],
          transitionID: data.data[0].lastTransition.id,
        });
      });
    });
    handleDateChange(date);
  }, []);

  const handelDeleteSlot = () => {
    fetch(`${baseUrl}slot/interview/stundet/${slotBookingDetails.id}`, {
      method: "DELETE",
    }).then((res) => {
      res.json().then((data) => {
        if (data.message === "Successfully inserted slot deleted") {
          enqueueSnackbar("Slot Cancelled", {
            variant: "info",
          });
          handleDateChange(date);
          setSlotCancelled(true);
        } else {
          enqueueSnackbar("Slot Not Cancelled", {
            variant: "error",
          });
        }
      });
    });
  };
  const handelSlotBooking = () => {
    fetch(`${baseUrl}slot/interview/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
        student_name: studentData.name,
        topic_name: studentData.stage,
        transition_id: studentData.transitionID,
        start_time: StartTime,
        end_time_expected: EndTime,
        duration: "1hr",
        on_date: date,
      }),
    }).then((res) => {
      res.json().then((data) => {
        //console.log(data);
        if (data.status === "successfully_scheduled") {
          enqueueSnackbar("Slot Booked", {
            variant: "success",
          });
          fetch(`${baseUrl}/slot/interview/${studentId}`).then((_res) => {
            _res.json().then((_data) => {
              setSlotBookingDetails(_data.data[0]);
              setSlotCancelled(_data.data[0].is_cancelled);
            });
          });
        } else {
          enqueueSnackbar("Cannot Book Slot", {
            variant: "error",
          });
        }
      });
    });
  };
  function disablePrevDates() {
    const yesterday = new Date(Date.now() - 86400000);
    const startSeconds = Date.parse(yesterday);
    return (_date) => Date.parse(_date) < startSeconds;
  }
  return (
    <Box sx={style}>
      {slotCanceled ? (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Interview Slot Booking
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Slot Booking for {studentData.name}
          </Typography>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <Grid container justify="space-around">
              <DatePicker
                margin="normal"
                id="date-picker-dialog"
                format="yyyy-MM-dd"
                value={date}
                onChange={(dates) => {
                  handleDateChange(dates);
                }}
                shouldDisableDate={disablePrevDates()}
                inputVariant="outlined"
                fullWidth
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
          <Grid container justify="space-evenly">
            {Timings.length > 0 ? (
              Timings.map((item) => (
                <Grid
                  item
                  key={item.id}
                  onClick={() => {
                    setStartTime(item.from);
                    setEndTime(item.to);
                    setCurrentTimeId(item.id);
                  }}
                  md={4}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    style={{
                      backgroundColor: `${
                        CurrentTimeId === item.id ? "#80b84d" : "#f06243"
                      }`,
                      margin: "5px",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {item.from} - {item.to}
                  </Typography>
                </Grid>
              ))
            ) : (
              <Typography>No Slots Available For Selected Date</Typography>
            )}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ fontSize: "10px" }}
            onClick={() => {
              handelSlotBooking();
              setCurrentTimeId(null);
            }}
          >
            Book Slot
          </Button>
        </>
      ) : (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Interview Slot Booked For {slotBookingDetails.student_name} For{" "}
            {slotBookingDetails.topic_name}
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            On {slotBookingDetails.on_date.split("T")[0]}
          </Typography>
          <Typography variant="h6" component="h3">
            From {slotBookingDetails.start_time} To
            {slotBookingDetails.end_time_expected}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ fontSize: "10px" }}
            onClick={() => {
              handelDeleteSlot();
              setCurrentTimeId(null);
            }}
          >
            Delete Slot
          </Button>
        </>
      )}
    </Box>
  );
};

export default SlotBooking;
