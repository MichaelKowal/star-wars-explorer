import { Container, List, Link, Typography, ListItem } from "@material-ui/core";
import React from "react";
import "../styles/ResourceInfo.css";

export interface ResourceInfoProps {
    info: any;
    handleClickItem: (item: any) => any;
}

const ResourceInfo: React.FC<ResourceInfoProps> = ({
    info,
    handleClickItem
}) => {
    const keyFilter = (key: string) => {
        if (["url", "edited", "created"].includes(key)) {
            return true;
        }
        return false;
    };

    const checkNull = (value: string) => {
        if (
            value === null ||
            value === "n/a" ||
            value === "" ||
            value === undefined ||
            value === "null" ||
            value === "unknown"
        ) {
            return true;
        }
        return false;
    };

    return (
        <Container>
            <List className="item-detail-list">
                {Object.keys(info.resourceInfo).map((key) => {
                    let element = null;
                    if (keyFilter(key) || checkNull(info.resourceInfo[key])) {
                        return null;
                    }
                    if (info.resourceInfo[key] instanceof Array) {
                        if (info.resourceInfo[key].length) {
                            element = (
                                <div className="body-list" key="body">
                                    {info.resourceInfo[key].map(
                                        (item: string) => {
                                            if (
                                                /https:\/\/swapi.dev.*/.test(
                                                    item
                                                )
                                            ) {
                                                return (
                                                    <Link
                                                        className="body-list-item"
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
                                                    <Typography className="body-list-item">
                                                        {item}
                                                    </Typography>
                                                );
                                        }
                                    )}
                                </div>
                            );
                        } else {
                            return null;
                        }
                    } else if (
                        /https:\/\/swapi.dev.*/.test(info.resourceInfo[key])
                    ) {
                        element = (
                            <Link
                                onClick={() =>
                                    handleClickItem(info.resourceInfo[key])
                                }
                                key={"body"}
                            >
                                {info.resourceInfo[key]}
                            </Link>
                        );
                    } else {
                        element = (
                            <Typography key="body">
                                {info.resourceInfo[key]}
                            </Typography>
                        );
                    }
                    return (
                        <ListItem key={key} className="item-detail">
                            <Typography variant="overline" key="title">
                                {key}
                            </Typography>
                            {element}
                        </ListItem>
                    );
                })}
            </List>
        </Container>
    );
};

export default ResourceInfo;
