import { Container, Snackbar, Typography } from "@material-ui/core";
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
import { Snippet } from "../models/Snippet";
import "../styles/Resource.css";
import { fetchData } from "../utils/dataUtils";
import Loader from "./Loader";
import ResourceInfo from "./ResourceInfo";
import ResourceList from "./ResourceList";

const Resource: React.FC = () => {
    const { currentPage, handleNewPage, updatePageInfo } =
        useContext(AppContext);
    const [info, setInfo] = useState<Data>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    let mounted = useRef(false);

    const getInfo = useCallback(async () => {
        try {
            const data = await fetchData(currentPage.url);
            if (mounted.current) {
                if (data?.resourceInfo.name ?? data?.resourceInfo.title) {
                    updatePageInfo(
                        data.resourceInfo.name ?? data.resourceInfo.title,
                        ""
                    );
                }
                setInfo(data);
                setIsLoading(false);
            }
        } catch (e: any) {
            setErrorMessage(e.errorMessage);
            setShowError(true);
        } // eslint-disable-next-line
    }, [currentPage.url]);

    useEffect(() => {
        mounted.current = true;
        setIsLoading(true);
        getInfo();

        return () => {
            mounted.current = false;
        };
    }, [currentPage.url, getInfo]);

    const handleClickItem = (url: string) => {
        const newPage: Snippet = {
            displayName: "",
            altName: "",
            type: /.*api\/([a-zA-Z]*)\/[0-9]*/.exec(
                url
            )?.[1] as typeof apiType[number],
            url
        };
        handleNewPage(newPage);
    };

    const handleNavigateList = async (url: string) => {
        const newInfo = await fetchData(url);
        if (mounted.current) {
            setInfo(newInfo);
        }
    };

    const handleCloseError = () => {
        setShowError(false);
        setErrorMessage("");
    };
    return (
        <>
            <Container className="resource-container">
                {isLoading && <Loader />}
                {!isLoading && info?.resourceInfo.results && (
                    <ResourceList
                        resources={info?.resourceInfo}
                        handleResourceClick={handleClickItem}
                        handleNextClick={handleNavigateList}
                        handlePreviousClick={handleNavigateList}
                    />
                )}
                {!isLoading &&
                    (info?.resourceInfo.name || info?.resourceInfo.title) && (
                        <ResourceInfo
                            info={info}
                            handleClickItem={handleClickItem}
                        />
                    )}
                {!isLoading && !info && (
                    <Typography>{i18n.t("common-no-resource")}</Typography>
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

export default Resource;
