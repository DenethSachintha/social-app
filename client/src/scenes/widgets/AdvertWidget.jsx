import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";

const AdvertWidget = ({
  advertId,
  advertUserId,
  advertChannelId,
  name,
  description,
  availability,
  price,
  picturePath,
  userPicturePath,
}) => { 
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
           Sponsored
         </Typography>
       </FlexBetween>
       <Box m="1rem 0" />
      <Friend
        friendId={advertUserId}
        name={name}
        subtitle={price}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="advert"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      
    </WidgetWrapper>
  );
};

export default AdvertWidget;