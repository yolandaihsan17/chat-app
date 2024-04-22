import { Box, Typography } from "@mui/material";

const Footer: React.FunctionComponent = () => {
  return (
    <Box
      sx={{ padding: 8, backgroundColor: "primary.main", textAlign: "center" }}
    >
      <Typography variant="caption" color={"primary.contrastText"}>
        &copy; Copyright Yolanda Ihsan - 2024
      </Typography>
    </Box>
  );
};

export default Footer;
