import Blogs from "@/components/Blogs/Blogs";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <Blogs slug={params.slug} />
    </div>
  );
};

export default page;
