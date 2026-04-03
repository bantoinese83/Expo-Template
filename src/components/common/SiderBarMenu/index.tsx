import { Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../utils/responsive/metrices";
import { Octicons } from "@expo/vector-icons";
import ModalWrapper from "../Modal/ModalWrapper";
import { useRouter } from "expo-router";
import ContactUsInformation from "./ContactUsInformation";
import AccountRelatedLinks from "./AccountRelatedLinks";
import MenuHeader from "./MenuHeader";
import MenuUserInfo from "./MenuUserInfo";
import { useMenuLinks } from "./useMenuLinks";
import { useAuth } from "../../../hooks/useAuth";

const { width, height } = Dimensions.get("screen");

export default function SideBarMenu() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isModalOpen, setisModalOpen] = useState(false);

  const dynamicLinks = useMenuLinks(user);

  const logoutHandler = async () => {
    await signOut();
    setisModalOpen(false);
  };

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Orders", href: "/orders" },
    { label: "Customers", href: "/customers" },
    { label: "Profile", href: "/profile" },
    { label: "Notifications", href: "/notifications" },
  ];

  const handleNavigate = (href: string) => {
    router.push(href as any);
    setisModalOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        className={`w-[${moderateScale(30)}px] h-[${moderateScale(30)}px] rounded-[${moderateScale(5)}px] bg-slate-100 dark:bg-slate-800 items-center justify-center`}
        onPress={() => setisModalOpen(true)}
      >
        <Octicons name="three-bars" size={16} color="#6366f1" />
      </TouchableOpacity>

      <ModalWrapper
        animationType="fade"
        visibility={isModalOpen}
        callBack={() => setisModalOpen(false)}
      >
        <ScrollView
          className={`h-full w-[${width - horizontalScale(30)}px] bg-white dark:bg-slate-900`}
          showsVerticalScrollIndicator={false}
        >
          <View className={`flex-1 px-[${horizontalScale(18)}px] py-[${verticalScale(20)}px]`}>
            <MenuHeader onClose={() => setisModalOpen(false)} />
            <MenuUserInfo
              onLoginClick={() => handleNavigate("/login")}
              onClose={() => setisModalOpen(false)}
            />

            <View className={`pb-[${verticalScale(8)}px] self-start`}>
              {mainLinks.map((link, index) => (
                <TouchableOpacity
                  className={`h-[${moderateScale(38)}px] justify-center`}
                  key={index}
                  onPress={() => handleNavigate(link.href)}
                >
                  <Text className="text-[13px] font-normal text-slate-600 dark:text-slate-400">
                    {link.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="border-b border-slate-100 dark:border-slate-800 my-[${verticalScale(10)}px]" />

            <AccountRelatedLinks
              links={dynamicLinks}
              onPress={(link) => {
                if (link?.checkAuth && !user) {
                  handleNavigate("/login");
                } else {
                  handleNavigate(link.href || "/");
                }
              }}
              onLogout={logoutHandler}
            />

            <ContactUsInformation contactList={[]} />
          </View>
        </ScrollView>
      </ModalWrapper>
    </>
  );
}
