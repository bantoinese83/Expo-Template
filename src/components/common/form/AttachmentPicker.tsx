import { Text, TouchableOpacity, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as Haptics from "expo-haptics";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";

import { horizontalScale, moderateScale, verticalScale } from "@/utils/responsive/metrices";
import ErrorMessage from "../ErrorMessage";
import { useToaster } from "../../../hooks/useToaster";

interface Props {
  onSelectAttachement: (attachments: DocumentPicker.DocumentPickerAsset[]) => void;
  error?: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export default function AttachementsPicker({ onSelectAttachement, error }: Props) {
  const [attachments, setAttachements] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const { toastAlert } = useToaster();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const pickAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        type: "*/*",
      });

      if (!result?.canceled && result?.assets) {
        if (!isMounted.current) return;

        const validAssets: DocumentPicker.DocumentPickerAsset[] = [];
        let hasLargeFile = false;

        result.assets.forEach((asset) => {
          // Check for duplicates by URI
          const isDuplicate = attachments.some((existing) => existing.uri === asset.uri);

          if (!isDuplicate) {
            if (asset.size && asset.size > MAX_FILE_SIZE) {
              hasLargeFile = true;
            } else {
              validAssets.push(asset);
            }
          }
        });

        if (hasLargeFile) {
          toastAlert("Some files exceeded the 2 MB limit and were skipped.", false);
        }

        if (validAssets.length > 0) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setAttachements((prev) => {
            const updated = [...prev, ...validAssets];
            onSelectAttachement(updated);
            return updated;
          });
        }
      }
    } catch (err) {
      console.error("Error picking document:", err);
      toastAlert("Failed to pick document", false);
    }
  };

  const removeItem = (uri: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAttachements((prev) => {
      const filtered = prev.filter((e) => e.uri !== uri);
      onSelectAttachement(filtered);
      return filtered;
    });
  };

  return (
    <>
      <TouchableOpacity
        className={`w-full h-[${moderateScale(100)}px] rounded-[${moderateScale(8)}px] bg-sky-50 dark:bg-sky-900/10 border-dashed border justify-center items-center flex-col ${
          error ? "border-rose-500" : "border-sky-400 dark:border-sky-800"
        }`}
        onPress={pickAttachment}
        accessibilityLabel="Add attachments"
        accessibilityRole="button"
      >
        <Text className="text-[12px] font-normal text-indigo-600 dark:text-indigo-400">
          Add attachments
        </Text>
        <Text
          className={`text-[11px] font-normal text-slate-400 dark:text-slate-500 mt-[${verticalScale(6)}px]`}
        >
          Max file upload limit is 2 MB per file
        </Text>
      </TouchableOpacity>

      {error && <ErrorMessage message={error} />}

      <View className={`my-[${verticalScale(13)}px] flex-col`}>
        {attachments.map((att, index) => (
          <View
            className={`flex-row justify-between items-center mb-[${verticalScale(7)}px] h-[${moderateScale(56)}px] rounded-[${moderateScale(12)}px] bg-indigo-50 dark:bg-indigo-900/20 px-[${horizontalScale(12)}px] overflow-hidden`}
            key={att.uri + index}
          >
            <View className="flex-row items-center flex-1">
              <View
                className={`justify-center items-center w-[${moderateScale(34)}px] h-[${moderateScale(34)}px] rounded-[${moderateScale(8)}px] bg-indigo-600 mr-[${horizontalScale(9)}px]`}
              >
                <Text className="text-white text-[12px] font-normal uppercase">
                  {att.name?.split(".").pop() || "FILE"}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                className={`flex-1 text-[12px] font-normal text-slate-700 dark:text-slate-300 max-w-[${moderateScale(230)}px]`}
              >
                {att.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => removeItem(att.uri)}
              accessibilityLabel={`Remove ${att.name}`}
              accessibilityRole="button"
            >
              <Entypo name="cross" size={20} color="#f43f5e" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
}
