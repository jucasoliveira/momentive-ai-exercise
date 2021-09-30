import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState } from "react";
// material
import { CssBaseline } from "@material-ui/core";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  useTheme,
} from "@mui/material/styles";
//
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ColorBox() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default function ThemeConfig({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const themeOptions = useMemo(
    () => ({
      palette: {
        mode,
      },
      shape: {
        mode,
      },
      typography: {
        mode,
      },
      shadows: {
        mode,
      },
      customShadows: {
        mode,
      },
    }),
    [mode]
  );

  const ligthTheme = createTheme(themeOptions);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={ligthTheme}>
        <CssBaseline />
        <ColorBox />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
