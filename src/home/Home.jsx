import { Stack, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Post from "../components/Post";
import SwipeableEdgeDrawer from "../components/SwipeableEdgeDrawer";
import PostApi from "../post/PostApi";
import CustomAlert from "../components/CustomAlert";
import Add from "../components/Add";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";
import GroupTabs from "./GroupTabs";

const Home = ({ profileValue }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const { user } = useUser();
  const { sectionId, saved } = useParams();

  const handleOpenComment = (id, isOpen) => {
    setPostId(id);
    setOpen(isOpen);
  };

  const getAllPosts = useCallback(
    (categoryId) => {
      setLoading(true);
      if (profileValue !== undefined) {
        PostApi.GetCurrentUserPosts(profileValue)
          .then((d) => {
            setPosts(d.data.data);
          })
          .catch((e) => {})
          .finally(() => setLoading(false));
      } else {
        PostApi.GetAlltPosts(sectionId, categoryId, saved)
          .then((d) => {
            setPosts(d.data.data);
          })
          .catch((e) => {})
          .finally(() => setLoading(false));
      }
    },
    [profileValue, saved, sectionId]
  );

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const onSavePost = (id) => {
    PostApi.SavePost(id)
      .then((d) => {
        getAllPosts();
        setType("success");
        setMessage("Post saved Succefully");
      })
      .catch((e) => {
        setType("error");
        setMessage(e.response.data.message);
      })
      .finally(() => {
        setOpenSnack(true);
        setTimeout(() => setOpenSnack(false), 2000);
      });
  };

  const onLike = (id) => {
    PostApi.LikePost(id)
      .then((d) => {
        getAllPosts();
        setType("success");
        setMessage("Post Liked Succefully");
      })
      .catch((e) => {
        setType("error");
        setMessage(e.response.data.message);
      })
      .finally(() => {
        setOpenSnack(true);
        setTimeout(() => setOpenSnack(false), 2000);
      });
  };

  const onDisLike = (id) => {
    PostApi.DisLikePost(id)
      .then((d) => {
        getAllPosts();
        setType("success");
        setMessage("Post disliked Succefully");
      })
      .catch((e) => {
        setType("error");
        setMessage(e.response.data.message);
      })
      .finally(() => {
        setOpenSnack(true);
        setTimeout(() => setOpenSnack(false), 2000);
      });
  };

  return (
    <Stack>
      <GroupTabs getAllPosts={getAllPosts} />
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        posts.map((post, index) => (
          <Post
            handleOpen={handleOpenComment}
            key={index}
            post={post}
            savePost={onSavePost}
            onLike={onLike}
            onDisLike={onDisLike}
          />
        ))
      )}
      {user?.token && user?.role !== "1" && <Add getAllPosts={getAllPosts} />}
      {open && (
        <SwipeableEdgeDrawer open={open} setOpen={setOpen} postId={postId} />
      )}
      <CustomAlert
        open={openSnack}
        setOpen={setOpenSnack}
        message={message}
        type={type}
      />
    </Stack>
  );
};

export default Home;
