import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import ChannelWidget from "scenes/widgets/ChannelWidget";
import AdvertsWidget from "scenes/widgets/AdvertsWidget";
import MyAdvertWidget from "scenes/widgets/MyAdvertWidget";

const ChannelPage = () => {
  const [channel, setChannel] = useState(null);
  const { channelId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getChannel= async () => {
    const response = await fetch(`http://localhost:3001/channels/${channelId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setChannel(data);
  };

  useEffect(() => {
    getChannel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!channel) return null;
  console.log(channel);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <ChannelWidget  channelId={channelId}  />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyAdvertWidget picturePath={channel.picturePath} channelId={channelId} availability={true}/>
          <Box m="2rem 0" />
          <AdvertsWidget channelId={channelId} isProfile />      
          </Box>
      </Box>
      
    </Box>
  );
};

export default ChannelPage;