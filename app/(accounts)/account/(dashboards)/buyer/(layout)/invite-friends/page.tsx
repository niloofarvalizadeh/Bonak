import SellerDashboardInviteFriendsContainer from "@/containers/dashboards/seller/invite-friends-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دعوت دوستان"
};

export default async function SellerDashboardInviteFriendsPage() {
  return <SellerDashboardInviteFriendsContainer />;
}
