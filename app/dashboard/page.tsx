import { Metadata } from "next";
import Dashboard from "./components/Dashboard";

const Page = () => <Dashboard />;
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
export default Page;
