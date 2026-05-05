import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { useState } from "react";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/responsive/metrices";
import { mImages } from "../../../../assets/images";
import ErrorMessage from "../ErrorMessage";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  placeholder?: string;
  error?: string;
  onSelectDate: (date: Date) => void;
  value?: Date;
}

export default function DatePickerField(props: Props) {
  const { placeholder, error, onSelectDate, value } = props;
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(value);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date || new Date();
    setShow(false);
    setDate(currentDate);
    onSelectDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formateDate = (dateToFormat: Date | undefined) => {
    if (dateToFormat) {
      const d = new Date(dateToFormat);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } else {
      return "";
    }
  };

  return (
    <>
      <View className={`mb-[${verticalScale(8)}px]`}>
        <TouchableOpacity
          onPress={() => showDatepicker()}
          className={`w-full h-[${moderateScale(50)}px] rounded-[${moderateScale(12)}px] bg-slate-50 dark:bg-slate-800 flex-row items-center px-[${horizontalScale(16)}px] border ${
            error ? "border-rose-500" : "border-transparent dark:border-slate-700"
          } mb-[${verticalScale(5)}px]`}
        >
          <Image
            source={date ? mImages.calendarBlack : mImages.calendarGray}
            className={`w-[${moderateScale(17)}px] h-[${moderateScale(17)}px]`}
            contentFit="contain"
          />
          <Text
            className={`flex-1 ml-[${horizontalScale(10)}px] text-[13px] font-normal ${
              date ? "text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {date ? formateDate(date) : placeholder}
          </Text>
        </TouchableOpacity>
        {error && <ErrorMessage message={error} />}
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : new Date()}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </>
  );
}
