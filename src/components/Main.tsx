import { Breadcrumbs, Container, Link, Typography } from "@material-ui/core";
import React, { lazy, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navigation from "./Navigation";
import "../styles/Main.css";
import Home from "./Home";
import i18n from "../i18n";

const LazySearchResult = lazy(
    () => import(/* webpackChunkName: "Search" */ "./SearchResults")
);

const LazyResource = lazy(
    () => import(/* webpackChunkName: "Resource" */ "./Resource")
);

const Main: React.FC = () => {
    const { currentPage, history, locale, handleGoBack } =
        useContext(AppContext);

    const getCurrentBreadcrumbName = () => {
        if (currentPage.displayName) {
            if (locale === "en") {
                return currentPage.displayName;
            } else {
                return currentPage.altName;
            }
        } else {
            return i18n.t(`common-${currentPage.type}`);
        }
    };

    const getCurrentPage = () => {
        switch (currentPage.type) {
            case "home":
                return renderHome();
            case "search":
                return renderSearchResults();
            default:
                return renderResource();
        }
    };

    const renderHome = () => <Home />;

    const renderSearchResults = () => <LazySearchResult />;

    const renderResource = () => <LazyResource />;

    return (
        <Container disableGutters maxWidth={false}>
            <Navigation />
            <Container className="breadcrumbs" maxWidth={false}>
                <Breadcrumbs>
                    {history.map((item, index) => (
                        <Link
                            className="link"
                            onClick={() => handleGoBack(history.length - index)}
                            key={index}
                        >
                            {locale === "en" ? item.displayName : item.altName}
                        </Link>
                    ))}
                    <Typography>{getCurrentBreadcrumbName()}</Typography>
                </Breadcrumbs>
            </Container>
            <Container className="canvas">{getCurrentPage()}</Container>
        </Container>
    );
};

export default Main;
