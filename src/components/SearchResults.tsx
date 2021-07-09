import { Container, Divider, Snackbar, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import { AppContext } from "../context/AppContext";
import i18n from "../i18n";
import { Data } from "../models/Data";
import { apiType } from "../models/Page";
import { fetchData } from "../utils/dataUtils";
import Loader from "./Loader";
import ResourceList from "./ResourceList";
import "../styles/SearchResults.css";

interface Results {
    films?: Data;
    people?: Data;
    planets?: Data;
    species?: Data;
    starships?: Data;
    vehicles?: Data;
}

const SearchResult: React.FC = () => {
    const { currentPage } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<Results>();
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    let mounted = useRef(false);

    // Get the info for the url given
    const getInfo = useCallback(async () => {
        try {
            const searches = await Promise.all(
                apiType.map((val) =>
                    fetch(currentPage.url.replace("__PLACEHOLDER__", val))
                )
            );
            // Only save the info if the request succeeded.
            if (searches) {
                const allResults = await Promise.all(
                    searches.map(async (response) => ({
                        type:
                            /.*api\/([a-zA-Z]*)\//.exec(response?.url)?.[1] ??
                            "__unknown__",
                        data: await response.json()
                    }))
                );
                // Don't set state on unmounted component.
                if (mounted.current) {
                    const newResultObject = {} as Results;
                    for (let item of allResults) {
                        if (item.type !== "__unknown__" && item.data.count) {
                            newResultObject[
                                item.type as typeof apiType[number]
                            ] = {
                                resourceInfo: item.data,
                                wookieeInfo: {}
                            };
                        }
                    }
                    if (Object.keys(newResultObject).length) {
                        setResults(newResultObject);
                    }
                    setIsLoading(false);
                }
            } else {
                setErrorMessage(
                    i18n.t("common-no-response-error", { url: currentPage.url })
                );
                setIsLoading(false);
                setShowError(true);
            }
        } catch (e: any) {
            setErrorMessage(
                i18n.t("common-request-error", {
                    url: currentPage.url
                })
            );
            setIsLoading(false);
            setShowError(true);
        }
    }, [currentPage]);

    useEffect(() => {
        mounted.current = true;
        setIsLoading(true);
        getInfo();

        return () => {
            mounted.current = false;
        };
    }, [currentPage, getInfo]);

    const handleCloseError = () => {
        setShowError(false);
        setErrorMessage("");
    };

    const handleMoreClick = async (
        url: string,
        type: typeof apiType[number]
    ) => {
        const newData = await fetchData(url);
        if (mounted.current) {
            setResults({ ...results, [type]: newData });
        }
    };

    return (
        <>
            <Container className="search-container">
                {isLoading && <Loader />}
                {results
                    ? Object.keys(results).map((type) => {
                          return (
                              <div key={type}>
                                  <Typography variant="h6">
                                      {i18n.t(`common-${type}`)}
                                  </Typography>
                                  <Divider />
                                  <ResourceList
                                      resources={
                                          results[
                                              type as typeof apiType[number]
                                          ]!.resourceInfo
                                      }
                                      handleResourceClick={() => {}}
                                      handleNextClick={(url) =>
                                          handleMoreClick(
                                              url,
                                              type as typeof apiType[number]
                                          )
                                      }
                                      handlePreviousClick={(url) =>
                                          handleMoreClick(
                                              url,
                                              type as typeof apiType[number]
                                          )
                                      }
                                  />
                              </div>
                          );
                      })
                    : !isLoading && (
                          <Typography variant="body2">
                              {i18n.t("common-no-results")}
                          </Typography>
                      )}
            </Container>
            <Snackbar
                open={showError}
                onClose={handleCloseError}
                autoHideDuration={6000}
            >
                <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>
        </>
    );
};

export default SearchResult;
