import { Grid } from "@radix-ui/themes";
import { ReactNode } from "react";
import SideBar from "./components/SideBar";

const DashBoardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      columns={{ initial: "1", md: "4" }}
      gap={"5"}
    >
      <SideBar />
      <div className="col-span-3">{children}</div>
    </Grid>
  );
};

export default DashBoardlayout;
