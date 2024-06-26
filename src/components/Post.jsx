import { MoreVert, Comment, BookmarkBorderOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  styled,
  Badge,
  Skeleton,
  Menu,
  MenuItem,
} from "@mui/material";
import formatDate from "../helpers/formatDate";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import CustomDataGridApi from "../Api/CustomDataGridApi";

const Post = ({
  handleOpen,
  post,
  savePost,
  onLike,
  onDisLike,
  getAllPosts,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useUser();

  function deleteRow(deleteUrl, id) {
    CustomDataGridApi.Delete(deleteUrl, id)
      .then((resp) => {
        getAllPosts();
      })
      .catch((e) => {})
      .finally(() => {});
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 10,
      top: 13,
      padding: "0 4px",
      fontSize: "16px",
    },
  }));

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "red" }}
            aria-label="recipe"
            src={post.user.profilePicture || ""}
          >
            M
          </Avatar>
        }
        action={
          post.user?.id?.toString() === user?.id?.toString() && (
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVert />
            </IconButton>
          )
        }
        title={post.user.firstName + " " + post.user.lastName}
        subheader={formatDate(post.createdAt)}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            deleteRow("posts/delete", post.id);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {post?.image ? (
        <CardMedia
          component="img"
          height={"200px"}
          image={post.image}
          alt="Paella dish"
        />
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={200} />
      )}
      <CardContent>
        <Typography
          color="text.secondary"
          variant="h6"
          sx={{
            width: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 1,
          }}
        >
          {post.title}
        </Typography>
        <Typography fontSize={16} fontWeight={300} color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack
          sx={{
            pr: 6,
            borderRadius: 20,
            background: "#372c2c8a",
            width: "50px",
            alignItems: "center",
          }}
          spacing={1}
          direction={"row"}
        >
          <IconButton aria-label="likes" onClick={() => onLike(post.id)}>
            <NorthIcon />
          </IconButton>
          {(post?.ratings[0]?.likeCount || 0) -
            (post?.ratings[0]?.disLikeCount || 0)}
          <IconButton
            aria-label="likes"
            onClick={() => {
              if (
                (post?.ratings[0]?.likeCount || 0) -
                  (post?.ratings[0]?.disLikeCount || 0) >
                0
              )
                onDisLike(post.id);
            }}
          >
            <SouthIcon />
          </IconButton>
        </Stack>

        <IconButton
          aria-label="comment"
          onClick={() => handleOpen(post.id, true)}
        >
          <Stack
            sx={{
              px: 2,
              py: 1,
              borderRadius: 20,
              background: "#372c2c8a",
              width: "50px",
              fontSize: "18px",
              alignItems: "center",
              justifyContent: "center",
            }}
            direction={"row"}
          >
            <Comment sx={{ mr: "10px" }} />
            {post.comments.length || 0}
          </Stack>
        </IconButton>
        <IconButton aria-label="saved" onClick={() => savePost(post.id)}>
          <Stack
            sx={{
              px: 2,
              py: 1,
              borderRadius: 20,
              background: "#372c2c8a",
              width: "30px",
              alignItems: "center",
            }}
          >
            <BookmarkBorderOutlined />
          </Stack>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
