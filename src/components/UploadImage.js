import { Button, CardMedia, Stack, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import downsizeImage from "../helpers/downloadSize";

function UploadImage({ image, setImage, isPrpfile }) {
  const [imageDataURL, setImageDataURL] = useState(null);

  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await fileToDataURL(file).then((res) => {
          downsizeImage(res, 200).then((downsized) => {
            setImage(downsized);
            setImageDataURL(downsized);
          });
        });
      } catch (error) {
        console.error("Error converting file to data URL:", error);
      }
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    setImageDataURL(image);
  }, [image]);

  const profileImage = (
    <Stack>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
      >
        <VisuallyHiddenInput type="file" onChange={handleChange} />
        {imageDataURL ? (
          <CardMedia
            component="img"
            src={imageDataURL}
            alt="Uploaded Image"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        ) : (
          <AccountCircleIcon style={{ fontSize: "100px" }} />
        )}
      </Button>
    </Stack>
  );
  return (
    <Stack>
      {isPrpfile ? (
        profileImage
      ) : (
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
        >
          <VisuallyHiddenInput type="file" onChange={handleChange} />
          {imageDataURL ? (
            <CardMedia
              component="img"
              src={imageDataURL}
              alt="Uploaded Image"
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <ImageIcon style={{ fontSize: "100px" }} />
          )}
        </Button>
      )}
    </Stack>
  );
}

export default UploadImage;
