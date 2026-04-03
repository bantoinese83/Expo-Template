import React from "react";
import { Modal, View } from "react-native";

interface Props {
  callBack: () => void;
  children: React.ReactNode;
  visibility: boolean;
  animationType?: "none" | "slide" | "fade";
  close?: () => void;
}

const ModalWrapper = ({ callBack, children, visibility, animationType }: Props) => {
  return (
    <>
      {visibility && <View className="absolute inset-0 w-full h-full z-[99] bg-black/40" />}

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
