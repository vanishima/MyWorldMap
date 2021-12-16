import { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from "../../mapStyles";
import PostWindow from "./PostWindow";


//Daniel - I really loved your use of google maps - specifically the styling of the application and I like that your able to detect my location automatically.
// If you ever have time, I would love for you to show me how you did this!!! :)
// Constants
// const libraries = ["places"];

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  // mapTypeControl: true,
};
const center = {
  lat: 37.338207,
  lng: -121.88633,
};

function Deleter() {
  // Ugly hack to make google maps pass the axe audit
  const delRef = useRef();
  useEffect(() => {
    console.group("DELETE ARIA");
    try {
      console.log("PARENT", delRef.current.parentElement);

      setTimeout(() => {
        console.log("waiting for map to render");
        const bug = delRef.current.parentElement.querySelector(
          "div[aria-roledescription]"
        );

        console.log("deleting from ", bug);

        if (bug) {
          bug.removeAttribute("aria-roledescription");
        }
      }, 1000);

      console.groupEnd("removing aria-roledescription", delRef.current);
    } catch (err) {
      console.groupEnd("deleter failed, maybe the map wasn't ready?", err);
    }
  }, []);
  return <div ref={delRef}></div>;
}

const Map = (props) => {
  const { height, width, posts, labels, mapRef, panTo } = props;

  const mapContainerStyle = {
    height: (height ? height : "100") + "vh",
    width: (width ? width : "100") + "vw",
  };

  // const [currentLocation, setCurrentLocation] = useState(null);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setCurrentLocation({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //     },
  //     () => null
  //   );
  // }, [])

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [postSelected, setPostSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    console.log(e);
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const onMapReloadPosts = () => {
    console.log("onMapReloadPosts");
  };

  // const mapRef = useRef();
  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
    },
    [mapRef]
  );

  // if (loadError) return "Error";
  // if (!isLoaded) return "loadingMap...";

  return (
    <div>
      <GoogleMap
        id="map"
        role="application"
        aria-label="Map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        onDragEnd={onMapReloadPosts}
        onZoomChanged={onMapReloadPosts}
      >
        {markers.map((marker, i) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            title={`temporary marker`}
            animation={window.google.maps.Animation.DROP}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: "/icons/panda.png",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(35, 35),
            }}
          />
        ))}

        {posts &&
          posts.map((post, i) => (
            <Marker
              key={`${post.location.lat}-${post.location.lng}-${post.location.time}-${i}`}
              title={`${post.title}`}
              animation={window.google.maps.Animation.DROP}
              position={{
                lat: post.location.lat,
                lng: post.location.lng,
              }}
              onClick={() => {
                setPostSelected(post);
              }}
              onMoustOut={{}}
              icon={{
                url: "/icons/dinosaur-1.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}

        {postSelected ? (
          <PostWindow
            post={postSelected}
            setPostSelected={setPostSelected}
            panTo={panTo}
            labels={labels}
            className="postWindow"
          />
        ) : null}

        {selected ? (
          <PostWindow
            selected={selected}
            setSelected={setSelected}
            panTo={panTo}
            labels={labels}
          />
        ) : null}

        <Deleter></Deleter>
      </GoogleMap>
    </div>
  );
};

Map.propTypes = {
  props: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    posts: PropTypes.array,
    labels: PropTypes.array,
    mapRef: PropTypes.object,
    panTo: PropTypes.func,
  }),
};

export default Map;
