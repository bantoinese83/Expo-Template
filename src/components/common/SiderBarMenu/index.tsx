import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../utils/responsive/metrices";
import textStyles, { flexRow, flexCenter } from "../../../../theme/styles";
import { colors } from "../../../../theme/colors";
import { Octicons } from "@expo/vector-icons";
import { mImages } from "../../../../assets/images";
import ModalWrapper from "../Modal/ModalWrapper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/auth.slice";
import API from "../../../../utils/api";
import ContactUsInformation from "./ContactUsInformation";
import AccountRelatedLinks from "./AccountRelatedLinks";
import MenuHeader from "./MenuHeader";
import MenuUserInfo from "./MenuUserInfo";
import { useMenuLinks } from "./useMenuLinks";

const { width, height } = Dimensions.get("screen");

export default function SideBarMenu() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [contactInformations, setContactInformations] = useState<any[]>([]);

  const otherLinks = useMenuLinks(user);

  useEffect(() => {
    const loadThemeData = async () => {
      try {
        const { data } = await API.get("/get-theme");
        setContactInformations([
          { label: data?.theme_contact, icon: mImages.callSmall, path: null },
          { label: data?.theme_email, icon: mImages.emailSmall, path: null },
          { label: data?.theme_address, icon: mImages.locSmall, path: null },
        ]);
      } catch (error) {
        console.error("Failed to load theme data", error);
      }
    };
    loadThemeData();
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    setisModalOpen(false);
  };

  const mainLinks = [
    { label: "Home", screen: "Home", tab: "Tabs" },
    { label: "Buy", screen: "Buy", tab: "Tabs" },
    { label: "Rent", screen: "Rent", tab: "Tabs" },
    { label: "Projects", screen: "OurProjects", tab: "NormalStack" },
    { label: "Interior designers", screen: "InteriorDesigners", tab: "Tabs" },
    { label: "Architects", screen: "OurArchitects", tab: "Tabs" },
    { label: "News", screen: "OurBlogs", tab: "NormalStack" },
  ];

  const handleNavigate = (tab: string, screen: string) => {
    navigation.navigate(tab, { screen });
    setisModalOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => setisModalOpen(true)}>
        <Octicons name="three-bars" size={16} color={colors.primary} />
      </TouchableOpacity>

      <ModalWrapper
        animationType="fade"
        visibility={isModalOpen}
        callBack={() => setisModalOpen(false)}
      >
        <ScrollView
          style={[styles.modalParrent, { backgroundColor: colors.white }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalContainer}>
            <MenuHeader onClose={() => setisModalOpen(false)} />
            <MenuUserInfo
              onLoginClick={() => handleNavigate("Auth", "Login")}
              onClose={() => setisModalOpen(false)}
            />

            <View style={styles.listWrapper}>
              {mainLinks.map((link, index) => (
                <TouchableOpacity
                  style={styles.linkItem}
                  key={index}
                  onPress={() => handleNavigate(link.tab, link.screen)}
                >
                  <Text style={[textStyles.textRegular13, { color: colors.darkGray }]}>
                    {link.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.divider} />

            <AccountRelatedLinks
              data={otherLinks}
              onPress={(link) => {
                if (link?.checkAuth && !user) {
                  handleNavigate("Auth", "Login");
                } else {
                  handleNavigate(link.tab || "NormalStack", link.screen || "");
                }
              }}
              onLogout={logoutHandler}
            />

            <ContactUsInformation data={contactInformations} />
          </View>
        </ScrollView>
      </ModalWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(5),
    backgroundColor: colors.lightBg,
    ...flexCenter,
  },
  modalParrent: {
    height: height,
    width: width - horizontalScale(30),
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(20),
  },
  listWrapper: {
    paddingBottom: verticalScale(8),
    alignSelf: "flex-start",
  },
  linkItem: {
    height: moderateScale(38),
    justifyContent: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: verticalScale(10),
  },
});
