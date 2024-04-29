import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from "@mui/material";
import useComments from "../hooks/useComments";
import CustomAlert from "./CustomAlert";
import formatDate from "../helpers/formatDate";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window, open, setOpen, postId } = props;

  const {
    formData,
    handleInputChange,
    errors,
    onSave,
    isOpen,
    setIsOpen,
    type,
    message,
    comments,
  } = useComments(postId);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `88%`,
            width: "625px",
            overflow: "visible",
            left: "20%",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {comments.length + " Comments"}
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            mt: 8,
            height: "100%",
            overflow: "scroll",
            zIndex: -1000,
          }}
        >
          {comments.map((comment, index) => (
            <Card sx={{ mb: 1 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "red" }}
                    aria-label="recipe"
                    src={comment.user.profilePicture}
                  >
                    M
                  </Avatar>
                }
                title={comment.user.firstName + " " + comment.user.lastName}
                sx={{ pb: 0 }}
                subheader={formatDate(comment.createdAt)}
              />
              <CardContent sx={{ ml: 6 }}>{comment.comment_text}</CardContent>
            </Card>
          ))}

          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
        <StyledBox
          sx={{
            position: "absolute",
            visibility: "visible",
            right: 30,
            left: 15,
            bottom: 17,
            py: 2,
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <TextField
              id="title"
              variant="outlined"
              placeholder="Write your comment"
              value={formData.comment}
              required
              fullWidth
              size="small"
              onChange={(e) => handleInputChange("comment", e.target.value)}
              error={errors.comment}
              helperText={errors.comment}
            />
            <Button
              size="small"
              variant="contained"
              sx={{ p: 0, px: "20px", m: 0 }}
              onClick={(e) => onSave(e)}
            >
              Comment
            </Button>
          </Stack>
        </StyledBox>
        <CustomAlert
          open={isOpen}
          setOpen={setIsOpen}
          message={message}
          type={type}
        />
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
