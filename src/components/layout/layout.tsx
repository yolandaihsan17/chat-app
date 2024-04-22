"use client";
import { Box, CssBaseline, ThemeProvider, styled } from "@mui/material";
import { ReactNode, useState } from "react";
import { TopNav } from "../nav/top-nav-items";
import { SideNav } from "../nav/side-nav";
import { createTheme } from "../../app/theme";
import Footer from "./footer";
import { TOP_NAV_HEIGHT } from "@/app/constants/common";

const LayoutRoot = styled("div")(() => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
  padding: 0,
});

const Layout: React.FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [openNav, setOpenNav] = useState(false);
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          <Box
            sx={{
              minHeight: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
              fontFamily: (theme) => theme.typography.fontFamily,
            }}
          >
            {children}
          </Box>
          <Footer />
        </LayoutContainer>
      </LayoutRoot>
    </ThemeProvider>
  );
};

export default Layout;
