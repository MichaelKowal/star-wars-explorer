import {
    Container,
    Link,
    List,
    ListItem,
    Snackbar,
    Typography
} from "@material-ui/core";
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
                        <Container>
                            <List className="item-detail-list">
                                {Object.keys(info.resourceInfo).map((key) => {
                                    let element = null;
                                    if (
                                        info.resourceInfo[key] instanceof Array
                                    ) {
                                        element = (
                                            <>
                                                {info.resourceInfo[key].map(
                                                    (item: string) => {
                                                        if (
                                                            /https:\/\/swapi.dev.*/.test(
                                                                item
                                                            )
                                                        ) {
                                                            return (
                                                                <Link
                                                                    onClick={() =>
                                                                        handleClickItem(
                                                                            item
                                                                        )
                                                                    }
                                                                    key={item}
                                                                >
                                                                    {item}
                                                                </Link>
                                                            );
                                                        } else
                                                            return (
                                                                <Typography>
                                                                    {item}
                                                                </Typography>
                                                            );
                                                    }
                                                )}
                                            </>
                                        );
                                    } else
                                        element = (
                                            <Typography key="body">
                                                {info.resourceInfo[key]}
                                            </Typography>
                                        );
                                    return (
                                        <ListItem
                                            key={key}
                                            className="item-detail"
                                        >
                                            <Typography
                                                variant="overline"
                                                key="title"
                                            >
                                                {key}
                                            </Typography>
                                            {element}
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Container>
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
