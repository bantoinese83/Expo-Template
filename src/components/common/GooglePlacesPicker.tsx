import React, { useRef } from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { moderateScale, verticalScale, horizontalScale } from "../../../utils/responsive/metrices";

interface Props {
  callback: (address?: string, location?: any) => void;
  label?: string;
  error?: string;
}

// Fallback for API Key if not provided in constants
const GOOGLE_MAPS_APIKEY = "";

const GooglePlacesPicker = ({ callback, label, error }: Props) => {
  const ref = useRef<any>(null);

  return (
    <View className={`mb-[${verticalScale(20)}px]`}>
      {label && (
        <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-2">
          {label}
        </Text>
      )}
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={"Search Location"}
        debounce={0}
        fetchDetails={true}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_1",
          "administrative_area_level_3",
        ]}
        currentLocation={false}
        currentLocationLabel=" "
        returnKeyType={"default"}
        textInputProps={{
          multiline: true,
          placeholderTextColor: "#94a3b8",
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        onPress={(data: any, details: any) => {
          callback(details?.formatted_address, details?.geometry?.location);
        }}
        onFail={(error: any) => console.error(error)}
        listEmptyComponent={() => (
          <View className="flex-1 p-2">
            <Text className="text-slate-500">No results were found</Text>
          </View>
        )}
        styles={{
          textInputContainer: {
            backgroundColor: "#f8fafc", // slate-50
            minHeight: moderateScale(50),
            borderRadius: 8,
            paddingHorizontal: horizontalScale(6),
            marginTop: verticalScale(8),
            borderWidth: 1,
            borderColor: error ? "#f43f5e" : "#f1f5f9",
          },
          textInput: {
            fontSize: 14,
            height: "100%",
            backgroundColor: "transparent",
            color: "#1e293b", // slate-800
          },
          description: {
            color: "#475569", // slate-600
          },
          predefinedPlacesDescription: {
            color: "#6366f1", // indigo-500
          },
        }}
      />
    </View>
  );
};

export default GooglePlacesPicker;
