import React, { createContext, useState } from "react";
import i18n from "../i18n";
import { Snippet } from "../models/Snippet";
import { SupportedLanguages } from "../models/SupportedLanguages";

export interface AppContextState {
    /** The type of page that the user is currently on. */
    currentPage: Snippet;

    /** The list of all clicked through links that the user has done. */
    history: Snippet[];

    /** Sets the locale. */
    locale: string;

    /** Callback to set the info for a new page. */
    handleNewPage: (newPage: Snippet, newPath?: boolean) => void;

    /** Callback to return to a previous page. */
    handleGoBack: (steps?: number) => void;

    /** Changes the language being displayed. */
    handleChangeLanguage: (newLang: SupportedLanguages) => void;

    /** Add names to the page info. */
    updatePageInfo: (name: string, altName: string) => void;
}

const defaultPage: Snippet = {
    type: "home",
    displayName: "Home",
    url: "",
    altName: "Acooscwo"
};

const defaultState: AppContextState = {
    currentPage: defaultPage,
    history: [],
    locale: "en",
    handleNewPage: () => {},
    handleGoBack: () => {},
    handleChangeLanguage: () => {},
    updatePageInfo: () => {}
};

export const AppContext = createContext<AppContextState>(defaultState);

const AppProvider: React.FC = ({ children }) => {
    const [page, setPage] = useState<Snippet>(defaultPage);
    const [pageHistory, setPageHistory] = useState<Snippet[]>([]);
    const [language, setLanguage] = useState<SupportedLanguages>("en");

    /**
     * Changes the current page to display.
     * @param newPage The new page to display to the user.
     */
    const handleNewPage = (newPage: Snippet, newPath?: boolean) => {
        if (newPath) {
            setPage(newPage);
            setPageHistory([defaultPage]);
        } else {
            const newHistory = [...pageHistory];
            newHistory.push(page);
            setPage(newPage);
            setPageHistory(newHistory);
        }
    };

    const handleGoBack = (steps: number = 1) => {
        // Nothing to go back to if there is no history.
        if (!pageHistory.length) {
            return;
        }
        // If number of steps equals or exceeds the length of the history, return home.
        if (steps >= pageHistory.length) {
            setPageHistory([]);
            setPage(defaultPage);
            return;
        }
        const newHistory = [...pageHistory];
        // Remove every step after the requested point, returning the first element as the new page.
        const newPage: Snippet = newHistory.splice(
            pageHistory.length - steps,
            steps
        )?.[0];
        if (newPage) {
            setPage(newPage);
            setPageHistory(newHistory);
        }
    };

    const handleChangeLanguage = async (newLanguage: SupportedLanguages) => {
        await i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    const updatePageInfo = (displayName: string, altName: string) => {
        setPage({ ...page, displayName, altName });
    };

    return (
        <AppContext.Provider
            value={{
                currentPage: page,
                history: pageHistory,
                locale: language,
                handleGoBack,
                handleNewPage,
                handleChangeLanguage,
                updatePageInfo
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
