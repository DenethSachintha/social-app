import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdverts, setPosts } from "state";
import AdvertWidget from "./AdvertWidget";

const AdvertsWidget = ({ userId, isProfile = false }) => {
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
      `http://localhost:3001/adverts/${userId}/adverts`,
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {adverts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          
        }) => (
          <AdvertWidget
            key={_id}
            advertId={_id}
            advertUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            
          />
        )
      )}
    </>
  );
};

export default AdvertsWidget;