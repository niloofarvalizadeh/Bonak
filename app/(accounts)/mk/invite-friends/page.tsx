import MarketerDashboardInviteFriendsContainer from "@/containers/dashboards/marketer/invite-friends-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دعوت دوستان"
};

export default async function MarketerDashboardInviteFriendsPage() {
  return <MarketerDashboardInviteFriendsContainer />;
}
