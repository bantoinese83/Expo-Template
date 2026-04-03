import React from "react";
import { Modal, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
  callBack: () => void;
  children: React.ReactNode;
  visibility: boolean;
  animationType?: "none" | "slide" | "fade";
  close?: () => void;
}

const ModalWrapper = ({ callBack, children, visibility, animationType, close }: Props) => {
  return (
    <>
      {visibility && (
        <View
          style={{
            ...(StyleSheet.absoluteFill as any),
            width: width,
            height: "100%",
            zIndex: 99,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        ></View>
      )}

      <Modal
        animationType={animationType ? animationType : "slide"}
        transparent={true}
        visible={visibility}
        onRequestClose={() => callBack()}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalWrapper;
