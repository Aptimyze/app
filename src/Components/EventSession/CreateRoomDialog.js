import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { createNewRoom } from "../../Modules/eventSessionOperations";
import { useSnackbar } from "material-ui-snackbar-provider";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getSessionId, getUserId, getUserLiveGroup } from "../../Redux/eventSession";
import Alert from "@material-ui/lab/Alert";
import { isCreateRoomOpen, closeCreateRoom } from "../../Redux/dialogs";
import { Typography, TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  content: {
    position: "relative",
    width: theme.breakpoints.values.sm,
    padding: theme.spacing(6),
    textAlign: "center",
  },
  closeContainer: {
    position: "absolute",
  },
  buttonContainer: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },
  hintText: {
    marginBottom: theme.spacing(4),
    display: "block",
    width: 400,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2),
  },
  emptySpaceBottom: {
    marginBottom: theme.spacing(4),
  },
  participantContainer: {
    marginBottom: theme.spacing(3),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  avatarsContainer: {
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(0.5),
  },
}));

export default function (props) {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  let [roomName, setRoomName] = React.useState("");

  const open = useSelector(isCreateRoomOpen);

  const userGroup = useSelector(getUserLiveGroup, shallowEqual);
  const sessionId = useSelector(getSessionId);
  const userId = useSelector(getUserId);

  const handleClose = () => {
    dispatch(closeCreateRoom());
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();

    createNewRoom(sessionId, roomName, userId, userGroup, snackbar);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <div className={classes.content}>
          {/* <div style={{ marginBottom: isMyGroup ? -16 : 8 }}> */}
          <Typography color="primary" variant="h4" align="center" style={{ marginBottom: 16 }}>
            Create new room
          </Typography>
          <TextField
            autoFocus
            label="Room Name"
            name="roomName"
            variant="outlined"
            value={roomName}
            style={{ width: "50%" }}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCreateRoom}
              disabled={roomName.trim() === ""}
            >
              Create &amp; join
            </Button>
          </div>
          <Alert severity="info" className={classes.alert}>
            A room will be created with this name and any attendee will be able to join it
          </Alert>
          {userGroup && (
            <Alert severity="warning" className={classes.alert}>
              You will leave your current call
            </Alert>
          )}
        </div>
        {/* </div> */}
      </Dialog>
    </div>
  );
}
