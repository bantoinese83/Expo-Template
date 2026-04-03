import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../utils/responsive/metrices";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";
import ErrorMessage from "../ErrorMessage";
import { useToaster } from "../../../hooks/useToaster";

interface Props {
  onSelectAttachement: (attachments: any[]) => void;
  error?: string;
}

export default function AttachementsPicker({ onSelectAttachement, error }: Props) {
  const [attachments, setAttachements] = useState<any[]>([]);
  const { toastAlert } = useToaster();

  // Handle pick image
  const pickAttachment = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result?.canceled && result?.assets) {
      if (result.assets[0].size > 2097152) {
        toastAlert("The file limit is exceeded!", false);
      } else {
        setAttachements((prev: any[]) => {
          const newAttachments = [...prev, ...result.assets];
          onSelectAttachement(newAttachments);
          return newAttachments;
        });
      }
    }
  };

  const removeItem = (att: any) => {
    setAttachements((prev: any[]) => {
      const filterAttachements = prev.filter((e) => e.uri !== att.uri);
      onSelectAttachement(filterAttachements);
      return filterAttachements;
    });
  };

  return (
    <>
      <TouchableOpacity
        className={`w-full h-[${moderateScale(100)}px] rounded-[${moderateScale(8)}px] bg-sky-50 dark:bg-sky-900/10 border-dashed border justify-center items-center flex-col ${
          error ? "border-rose-500" : "border-sky-400 dark:border-sky-800"
        }`}
        onPress={pickAttachment}
      >
        <Text className="text-[12px] font-normal text-indigo-600 dark:text-indigo-400">
          Add attachments
        </Text>
        <Text
          className={`text-[11px] font-normal text-slate-400 dark:text-slate-500 mt-[${verticalScale(6)}px]`}
        >
          Max file upload limit is 2 MB
        </Text>
      </TouchableOpacity>
      {error && <ErrorMessage message={error} />}
      <View className={`my-[${verticalScale(13)}px] flex-col`}>
        {attachments?.length > 0 &&
          attachments?.map((att, index) => (
            <View
              className={`flex-row justify-between items-center mb-[${verticalScale(7)}px] h-[${moderateScale(56)}px] rounded-[${moderateScale(12)}px] bg-indigo-50 dark:bg-indigo-900/20 px-[${horizontalScale(12)}px] overflow-hidden`}
              key={index}
            >
              <View className="flex-row items-center flex-1">
                <View
                  className={`justify-center items-center w-[${moderateScale(34)}px] h-[${moderateScale(34)}px] rounded-[${moderateScale(8)}px] bg-indigo-600 mr-[${horizontalScale(9)}px]`}
                >
                  <Text className="text-white text-[12px] font-normal uppercase">
                    {att?.name?.split(".").pop()}
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  className={`flex-1 text-[12px] font-normal text-slate-700 dark:text-slate-300 max-w-[${moderateScale(230)}px]`}
                >
                  {att?.name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(att)}>
                <Entypo name="cross" size={20} color="#f43f5e" />
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </>
  );
}
