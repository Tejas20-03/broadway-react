"use client";
import { colors } from "@/constant/Colors";
import { getBlogList } from "@/services/Home/services";
import { PizzaArticle } from "@/services/Home/types";
import { ArrowLeftRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GetAppFooter from "../Common/GetAppFooter";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const Blogs = () => {
  const [blogs, setBlogs] = useState<PizzaArticle[]>([]);
  useEffect(() => {
    getBlogList({}).then((data) => {
      if (data?.ResponseType?.toString() === "1") {
        setBlogs(data.Data);
      }
    });
  }, []);

  return (
    <Box sx={{ marginLeft: { md: 20 } }}>
      <Typography
        sx={{ fontSize: 30, fontWeight: "600", marginLeft: { xs: 2 } }}
        className={poppins.className}
      >
        Blogs
      </Typography>
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ArrowLeftRounded
                sx={{ fontSize: "40px", color: colors.primary }}
              ></ArrowLeftRounded>
              <Link
                href={`/blogs/${blog.Slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography className={poppins.className}>
                  {blog.Title}
                </Typography>
              </Link>
            </Box>
          );
        })}
      <GetAppFooter />
    </Box>
  );
};

export default Blogs;
