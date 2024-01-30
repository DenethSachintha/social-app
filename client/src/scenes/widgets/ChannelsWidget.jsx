import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChannels } from "state";
import Channel from "components/channel";

const ChannelsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const channels = useSelector((state) => state.channels);
  const token = useSelector((state) => state.token);

  const getUserChannels = async () => {
    const response = await fetch(
      `http://localhost:3001/channels/${userId}/channels`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setChannels({ channels: data }));
  };

  useEffect(() => {
    getUserChannels();
  }, []); 

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Channel List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {channels.map((channel) => (
          <Channel
            key={channel._id}
            channelId={channel._id}
            name={channel.category}
            subtitle={channel.description}
            userPicturePath={channel.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default ChannelsWidget;