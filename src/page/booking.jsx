import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CardHeader,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

export default function Booking() {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleDateChange = (direction) => {
    if (direction === "prev") {
      setCurrentDate(new Date(currentDate.getTime() - 86400000 * 8));
    } else {
      setCurrentDate(new Date(currentDate.getTime() + 86400000 * 8));
    }
  };

  const handleClickOpen = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  const rooms = [
    { number: 1, status: "available" },
    { number: 2, status: "booked" },
    { number: 3, status: "payment_received" },
    { number: 4, status: "advance_received" },
    { number: 5, status: "canceled" },
  ];

  const totalBookings = rooms.filter(
    (room) =>
      room.status === "booked" ||
      room.status === "payment_received" ||
      room.status === "advance_received"
  ).length;

  const totalRevenue = rooms.reduce((acc, room) => {
    switch (room.status) {
      case "payment_received":
        return acc + 100;
      case "advance_received":
        return acc + 50;
      default:
        return acc;
    }
  }, 0);

  const statusColors = {
    available: { bgColor: "#e0ffe0", textColor: "#4caf50" },
    booked: { bgColor: "#fffbe0", textColor: "#ff9800" },
    payment_received: { bgColor: "#e0f7ff", textColor: "#2196f3" },
    advance_received: { bgColor: "#fff0e0", textColor: "#ff5722" },
    canceled: { bgColor: "#ffe0e0", textColor: "#f44336" },
  };

  return (
    <>
      <div className="date-controls">
        <button onClick={() => handleDateChange("prev")}>Prev</button>
        <span>
          {currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <button onClick={() => handleDateChange("next")}>Next</button>
      </div>
      <Grid container spacing={3}>
        {Array.from({ length: 8 }, (_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <div key={i} className="day-card">
              <Card sx={{ minWidth: 275, p: 0.3 }}>
                <CardHeader
                  sx={{ py: 0 }}
                  subheader={new Date(
                    currentDate.getTime() + i * 86400000
                  ).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                />
                <CardContent sx={{ py: 0 }}>
                  <div className="rooms">
                    {rooms.map((room) => (
                      <Card
                        sx={{
                          width: "100%",
                          my: 1,
                          boxShadow: "0",
                          backgroundColor: statusColors[room.status].bgColor,
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: `${
                              statusColors[room.status].bgColor
                            }AA`, // Add transparency for hover effect
                          },
                        }}
                        key={room.number}
                        onClick={() => handleClickOpen(room)}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ p: 1 }}
                        >
                          <span>Room {room.number}</span>
                          <Chip
                            label={`${room.status.replace(/_/g, " ")}`}
                            sx={{
                              backgroundColor:
                                statusColors[room.status].textColor,
                              color: "#ffffff",
                            }}
                          />
                        </Stack>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
      <footer className="footer">
        <span>Total Bookings: {totalBookings}</span>
        <span>Total Revenue: ${totalRevenue.toFixed(2)}</span>
      </footer>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: isMediumUp ? "50%" : "90%",
            maxWidth: "none",
            maxHeight: "none",
          },
        }}
      >
        <DialogTitle>Room Details</DialogTitle>
        <DialogContent>
          {selectedRoom && (
            <>
              <Stack spacing={2}>
                <p>Room Number: {selectedRoom.number}</p>
                <p>Status: {selectedRoom.status.replace(/_/g, " ")}</p>
                <p>Booked by: John Doe</p>
                <p>Booking Date: 2023-06-15</p>
              </Stack>
              <h3>Payment Details</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Date
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Amount
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      2023-06-01
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      $100
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Paid
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      2023-06-10
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      $50
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Pending
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <style jsx>{`
        .date-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .day-card {
          margin-bottom: 16px;
        }
        .footer {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          padding: 16px;
          background-color: #f0f0f0;
        }
      `}</style>
    </>
  );
}
