import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { teal, yellow } from "@material-ui/core/colors";
import React, { lazy } from "react";
import AppProvider from "../context/AppContext";
import Loader from "./Loader";
import "../styles/App.css";

const LazyMain = lazy(() => import(/* webpackChunkName: "content" */ "./Main"));

const theme = createMuiTheme({
    palette: {
        primary: yellow,
        secondary: teal,
        type: "dark"
    }
});

const App: React.FC = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <div className="app">
                <ThemeProvider theme={theme}>
                    <AppProvider>
                        <LazyMain />
                    </AppProvider>
                </ThemeProvider>
            </div>
        </React.Suspense>
    );
};

export default App;
