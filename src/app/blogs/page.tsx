import dynamic from "next/dynamic";
import React from "react";
import { CircularProgress } from "@mui/material";

const Blogs = dynamic(() => import("@/components/Home/Blogs"), {
  loading: () => <CircularProgress />,
});

const page = () => {
  return (
    <div>
      <Blogs />
    </div>
  );
};

export default page;
