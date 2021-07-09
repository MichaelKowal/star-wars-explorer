import {
    AppBar,
    Drawer,
    FormControl,
    FormLabel,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import i18n from "../i18n";
import { Snippet } from "../models/Snippet";
import { SupportedLanguages } from "../models/SupportedLanguages";
import "../styles/Navigation.css";

const Navigation: React.FC = () => {
    const { currentPage, locale, handleChangeLanguage, handleNewPage } =
        useContext(AppContext);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    const handleClickMenu = () => {
        setShowDrawer(!showDrawer);
    };

    const handleCloseDrawer = () => {
        setShowDrawer(false);
    };

    const submitSearch = () => {
        if (searchText.length) {
            const searchUrl = `https://swapi.dev/api/__PLACEHOLDER__/?search=${encodeURIComponent(
                searchText
            )}`;
            const newPage: Snippet = {
                displayName: `Search (${searchText})`,
                altName: `Cworarcoaac (${searchText})`,
                url: searchUrl,
                type: "search"
            };
            handleNewPage(newPage, true);
        }
    };

    const tryHandleSubmitSearch = (event: any) => {
        // Only fire if the enter key is pressed.
        if (event.keyCode === 13) {
            submitSearch();
        }
    };

    const handleLanguageChange = (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>
    ) => {
        handleChangeLanguage(event.target.value as SupportedLanguages);
    };

    const renderDrawer = () => (
        <Drawer
            anchor="left"
            open={showDrawer}
            onClose={handleCloseDrawer}
            className="drawer"
            classes={{
                paper: "drawer-paper"
            }}
        >
            <FormControl className="language-selector">
                <FormLabel>{i18n.t("common-language")}</FormLabel>
                <Select value={locale} onChange={handleLanguageChange}>
                    <MenuItem value="en" key="en">
                        English
                    </MenuItem>
                    <MenuItem value="wk" key="wk">
                        Shyriiwook
                    </MenuItem>
                </Select>
            </FormControl>
        </Drawer>
    );

    return (
        <>
            <AppBar position="static" className="navigation">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={"menu-button"}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleClickMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3" className="title">
                        {i18n.t(`common-${currentPage.type}`)}
                    </Typography>
                    <div className={"search"}>
                        <div className={"search-icon"}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder={`${i18n.t("common-search")}...`}
                            classes={{
                                root: "input-root",
                                input: "input-input"
                            }}
                            inputProps={{
                                "aria-label": "search"
                            }}
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            onKeyDown={tryHandleSubmitSearch}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {renderDrawer()}
        </>
    );
};

export default Navigation;
