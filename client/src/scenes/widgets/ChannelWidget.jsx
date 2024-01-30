import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChannelWidget = ({ channelId }) => {
  const [channel, setChannel] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
 // const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getChannel = async () => {
    const response = await fetch(`http://localhost:3001/channels/${channelId}`, {
      method: "GET",
      //headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setChannel(data);

  };

  useEffect(() => {
    getChannel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!channel) {
    return null;
  }

  const {
    userId,
    firstName,
    lastName,
    category,
    address,
    website,
    location,
    description,
    picturePath,
    userPicturePath
  } = channel;

  return (
    <WidgetWrapper>
<FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/channel/${channelId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {category}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
                
      <Divider />
      <Box m="1rem 0" />
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>Admin</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
      <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>{description}</Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
        <Typography color={medium}>Location:</Typography>
          <Typography color={medium}>{location}</Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
        <Typography color={medium}>Address:</Typography>
          <Typography color={medium}>{address}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
        <Typography color={medium}>Website:</Typography>
          <Typography color={medium}>{website}</Typography>
        </Box>
      </Box>      
    </WidgetWrapper>
  );
};

export default ChannelWidget;