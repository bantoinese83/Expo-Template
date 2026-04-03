import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { useToaster } from "../../hooks/useToaster";

interface Props {
  isFav: boolean;
  id: string | number;
  onRefresh: () => void;
}

export default function SavePropertyHeart({ isFav, id, onRefresh }: Props) {
  const { toastAlert } = useToaster();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addToFav = async () => {
    // Mock API call since API.post might not be available/configured the same way
    try {
      setLoading(true);
      // await (API as any).post("/customer_post_saved", payload);
      onRefresh();
    } catch (error: any) {
      console.log(error);
      toastAlert("Login is required to save this property", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity className="mr-2 mt-[3px] ml-auto" onPress={addToFav}>
      {loading ? (
        <ActivityIndicator size={18} color="#6366f1" />
      ) : (
        <AntDesign name="heart" size={18} color={isFav ? "#f43f5e" : "#94a3b8"} />
      )}
    </TouchableOpacity>
  );
}
