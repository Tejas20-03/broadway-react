import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { getBlogBySlug } from "@/services/Home/services";
import GetAppFooter from "../Common/GetAppFooter";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});
type IProps = {
  slug: string;
};

const Blogs: React.FunctionComponent<IProps> = async ({ slug }) => {
  const blogData = await getBlogBySlug(slug, {});
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {blogData && blogData?.Data?.length > 0 && (
        <List>
          {blogData.Data.map((item) => (
            <React.Fragment key={item.ID}>
              <Typography
                variant="h4"
                gutterBottom
                className={poppins.className}
              >
                {item.Title}
              </Typography>
              <ListItem disablePadding>
                <Typography variant="h6" className={poppins.className}>
                  {item?.Title}
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: item?.Blog || "" }}
                  className={poppins.className}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
      <GetAppFooter />
    </Container>
  );
};
export default Blogs;
