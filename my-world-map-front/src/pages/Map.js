import { useEffect, useCallback, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Elements
import Layout from "../components/Layout";
import Search from "../components/map/Search";
import Locate from "../components/map/Locate";
// import PostFilterBox from "../components/map/PostFilterBox";
import PostWindow from "../components/map/PostWindow";
import LabelButtons from "../components/map/LabelButtons";

// API
import drawPosts from "../components/utils/drawPosts";
import fetchLabels from "../components/utils/fetchLabels";

// Styles
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";

// Constants
const libraries = ["places", "drawing"];
const mapContainerStyle = {
  height: "80vh",
  width: "100vw",
};
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

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [labels, setLabels] = useState(null);
  const [labelsSelected, setLabelsSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [posts, setPosts] = useState([]);
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

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  useEffect(() => {
    console.log("### EFFECT ###");
    fetchLabels(setLabels);
    drawPosts(setPosts, labelsSelected, null, null);
  }, [labelsSelected]);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  // <h4 className="overlay">
  //         Drop your thoughts
  //         <span role="img" aira-label="tent">
  //           ⛺️
  //         </span>
  //       </h4>
  //

  return (
    <Layout>
      <h1 className="overlay-bottom">Map with markers</h1>

      {/*<PostFilterBox
        labels={labels}
        setLabelsSelected={setLabelsSelected}
        setPosts={setPosts}
      />*/}

      <LabelButtons
        labels={labels}
        setLabelsSelected={setLabelsSelected}
        setPosts={setPosts}
        drawPosts={drawPosts}
      />
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker, i) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            title={`${i}`}
            // label={`${i}`}
            animation={window.google.maps.Animation.DROP}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            onMouseOver={(e) => {
              setSelected(marker);
              setPostSelected(null);
              // setTimeout( () => {setSelected(null); }, 1000);
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
              title={`${i}`}
              // label={`${i}`}
              animation={window.google.maps.Animation.DROP}
              position={{ lat: post.location.lat, lng: post.location.lng }}
              onClick={() => {
                setPostSelected(post);
              }}
              onMouseOver={(e) => {
                setPostSelected(post);
                setSelected(null);
                // setTimeout( () => {setPostSelected(null); }, 1000);
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
            setPostSelected={setPostSelected}
            panTo={panTo}
            labels={labels}
          />
        ) : null}
      </GoogleMap>
    </Layout>
  );
}
