import { Metadata } from "next";
import Groups from "../components/Groups";

const Page = () => <Groups />;
export const metadata: Metadata = {
  title: "Issue Tracker | Groups",
  description: "Manage your groups",
};
export default Page;
