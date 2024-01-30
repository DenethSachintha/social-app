import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setChannels } from "state";
  
  const MyChannelWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [channel, setChannel] = useState("");
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [location, setLocation] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handleChannel = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("category", category);
       formData.append("address", address);
       formData.append("website", website);
       formData.append("location", location);
      formData.append("description", channel);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:3001/channels`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const channels = await response.json();
      dispatch(setChannels({ channels }));
      setImage(null);
      setChannel("");
      setCategory("");
    setAddress("");
    setWebsite("");
    setLocation("");
   
    };
  
    return (
      <WidgetWrapper>
        <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Create New Channel
      </Typography>
        <FlexBetween gap="1rem">
          <InputBase
            placeholder=" Name"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />
           </FlexBetween>
           <Box m="0.5rem 0" />
           <FlexBetween gap="1rem">
          <InputBase
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />
          </FlexBetween>
          <Box m="0.5rem 0" />
          <FlexBetween gap="1rem">
          <InputBase
            placeholder="Website"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />
         </FlexBetween>
         <Box m="0.5rem 0" />
         <FlexBetween gap="1rem">
          <InputBase
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />    
               </FlexBetween>
               <Box m="0.5rem 0" />
               <FlexBetween gap="1rem">
          <InputBase
            placeholder="Description"
            onChange={(e) => setChannel(e.target.value)}
            value={channel}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Add Profile
            </Typography>
          </FlexBetween>
          
          <Button
            disabled={!channel}
            onClick={handleChannel}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            Create Channel
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyChannelWidget;