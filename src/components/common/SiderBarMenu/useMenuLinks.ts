import { useState, useEffect } from "react";
import { mImages } from "../../../../assets/images";

export interface LinkItem {
  label: string;
  icon: any;
  tab?: string;
  screen?: string;
  checkAuth?: boolean;
}

export const useMenuLinks = (user: any) => {
  const [otherLinks, setOtherLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const sellerLinks: LinkItem[] = [
      {
        label: "Saved ads",
        icon: mImages.heartSmall,
        tab: "NormalStack",
        screen: "SavedAds",
        checkAuth: true,
      },
      {
        label: "Add property",
        icon: mImages.plusSmall,
        tab: "NormalStack",
        screen: "AddPost",
        checkAuth: true,
      },
      {
        label: "My Properties",
        icon: mImages.messageSmall,
        tab: "NormalStack",
        screen: "MyProperties",
      },
    ];

    const serviceProviderLinks: LinkItem[] = [
      {
        label: "Saved ads",
        icon: mImages.heartSmall,
        tab: "NormalStack",
        screen: "SavedAds",
        checkAuth: true,
      },
      {
        label: "Service provider profile",
        icon: mImages.avatarSmall,
        tab: "NormalStack",
        screen: "ServiceProviderProfile",
      },
      {
        label: "Reviews",
        icon: mImages.messageSmall,
        tab: "NormalStack",
        screen: "ServiceProviderReviews",
      },
    ];

    const authenticatedLinks: LinkItem[] = [
      {
        label: "Personal information",
        icon: mImages.avatarSmall,
        tab: "NormalStack",
        screen: "PersonalInformation",
      },
      {
        label: "Public profile",
        icon: mImages.avatarSmall,
        tab: "NormalStack",
        screen: "PublicProfile",
      },
      {
        label: "Delete my account",
        icon: mImages.trash,
        tab: "NormalStack",
        screen: "DeleteAccount",
      },
      {
        label: "Change password",
        icon: mImages.avatarSmall,
        tab: "NormalStack",
        screen: "ChangePassword",
      },
    ];

    const unAuthLinks: LinkItem[] = [
      {
        label: "Saved ads",
        icon: mImages.heartSmall,
        tab: "NormalStack",
        screen: "SavedAds",
        checkAuth: true,
      },
      {
        label: "Add property",
        icon: mImages.plusSmall,
        tab: "NormalStack",
        screen: "AddPost",
        checkAuth: true,
      },
      {
        label: "Sign in",
        icon: mImages.avatarSmall,
        tab: "Auth",
        screen: "Login",
        checkAuth: true,
      },
    ];

    if (user && user?.type === "seller") {
      setOtherLinks([...sellerLinks, ...authenticatedLinks]);
    } else if (user && user?.type === "service-provider") {
      setOtherLinks([...serviceProviderLinks, ...authenticatedLinks]);
    } else {
      setOtherLinks([...unAuthLinks]);
    }
  }, [user]);

  return otherLinks;
};
