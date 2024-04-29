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
} from "@mui/material";
import formatDate from "../helpers/formatDate";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const Post = ({ handleOpen, post, savePost, onLike, onDisLike }) => {
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
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={post.image}>
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={post.user.firstName + " " + post.user.lastName}
        subheader={formatDate(post.createdAt)}
      />
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
        <IconButton aria-label="likes" onClick={() => onLike(post.id)}>
          <Stack
            sx={{
              px: 2,
              py: 1,
              borderRadius: 20,
              background: "#372c2c8a",
              width: "50px",
            }}
            spacing={1}
            direction={"row"}
          >
            <StyledBadge
              badgeContent={post?.ratings[0]?.likeCount || 0}
              max={99}
            >
              <ThumbUpOffAltIcon style={{ paddingRight: "25px" }} />
            </StyledBadge>
          </Stack>
        </IconButton>
        <IconButton aria-label="dislike" onClick={() => onDisLike(post.id)}>
          <Stack
            sx={{
              px: 2,
              py: 1,
              borderRadius: 20,
              background: "#372c2c8a",
              width: "50px",
            }}
            spacing={1}
            direction={"row"}
          >
            <StyledBadge
              badgeContent={post?.ratings[0]?.disLikeCount || 0}
              max={99}
            >
              <ThumbDownOffAltIcon style={{ paddingRight: "25px" }} />
            </StyledBadge>
          </Stack>
        </IconButton>
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
            }}
          >
            <StyledBadge badgeContent={post.comments.length || 0} max={100}>
              <Comment />
            </StyledBadge>
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
