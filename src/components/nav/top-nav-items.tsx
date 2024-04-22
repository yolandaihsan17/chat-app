import PropTypes from "prop-types";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Menu } from "@mui/icons-material";
import { AccountPopover } from "../layout/account-popover";
import { usePopover } from "@/hooks/use-popover";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from "@/app/constants/common";
import { useAuth } from "@/hooks/auth-context";
import { useEffect } from "react";

export const TopNav = (props: any) => {
  const { onNavOpen } = props;
  const accountPopover = usePopover();
  const { user } = useAuth();

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack
            alignItems="center"
            justifyContent={"flex-start"}
            direction="row"
            spacing={2}
          >
            <IconButton onClick={onNavOpen}>
              <Menu />
            </IconButton>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent={"flex-end"}
            direction="row"
            spacing={2}
          >
            <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <GroupIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <NotificationsIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            {user && (
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                }}
                src={user.photoURL || ""}
              />
            )}
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
