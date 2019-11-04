import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.05;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initialRegion = {
  latitude: 51.5074,
  longitude: 0.1278,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

export default initialRegion;
