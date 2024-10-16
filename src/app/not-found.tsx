"use client";
import { Container, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import styles from "./error-pg.module.scss";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const NotFound: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("OutletID");
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if (pathname === "/feedback.aspx")
        window.location.href = `https://feedback.broadwaypizza.com.pk/feedback.html?OutletID=${search}`;
    }
  }, []);
  return (
    <Container>
      <Typography>
        <span> Page Not Found</span>
      </Typography>
    </Container>
  );
};

export default NotFound;
