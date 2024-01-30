import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdverts} from "state";
import AdvertWidget from "./AdvertWidget";

const AdvertsWidget = ({ channelId, isProfile = false }) => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts);
  const token = useSelector((state) => state.token);

  const getAdverts = async () => {
    const response = await fetch("http://localhost:3001/adverts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setAdverts({ adverts: data }));    
  };
  const getUserAdverts = async () => {
    const response = await fetch(
      `http://localhost:3001/adverts/${channelId}/adverts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setAdverts({ adverts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserAdverts();
    } else {
      getAdverts();
    }
  }, []); 

  return (
    <>
      {adverts.map(
        ({
          _id,
          userId,
          channelId,
          firstName,
          lastName,
          availability,
          price,
          description,
          picturePath,
          userPicturePath,
          
        }) => (
          <AdvertWidget
            key={_id}
            advertId={_id}
            advertUserId={userId}
            advertChannelId={channelId}
            name={`${firstName} ${lastName}`}
            description={description}
            availability={availability}
            price={price}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            
          />
        )
      )}
    </>
  );
};

export default AdvertsWidget;