import React, { lazy } from "react";
import AppProvider from "../context/AppContext";
import Loader from "./Loader";

const LazyMain = lazy(() => import(/* webpackChunkName: "content" */ "./Main"));

const App: React.FC = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <div>
                <AppProvider>
                    <LazyMain />
                </AppProvider>
            </div>
        </React.Suspense>
    );
};

export default App;
