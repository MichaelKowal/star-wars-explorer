import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import i18n from "../i18n";
import "../styles/ResourceList.css";

export interface ResourceListProps {
    resources: any;
    handleResourceClick: (resourceUrl: string) => void;
    handleNextClick: (resourceUrl: string, type?: string) => any;
    handlePreviousClick: (resourceUrl: string, type?: string) => any;
}

const ResourceList: React.FC<ResourceListProps> = ({
    resources,
    handleResourceClick,
    handleNextClick,
    handlePreviousClick
}) => {
    const getCurrentPageNumber = () => {
        if (resources.previous) {
            const lastPage = /.*page=([0-9]*)/.exec(resources.previous)?.[1];
            return lastPage ? +lastPage + 1 : 1;
        }
        return 1;
    };

    return (
        <Container className="resource-list">
            <Grid container spacing={2}>
                {resources.results.map((r: any, i: number) => (
                    <Grid item className="custom-grid" key={i}>
                        <Button onClick={() => handleResourceClick(r.url)}>
                            {r.name ?? r.title}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <div className="resource-list-controls">
                <Button
                    disabled={resources.previous === null}
                    onClick={() => handlePreviousClick(resources.previous)}
                >
                    {i18n.t("common-previous")}
                </Button>
                <Typography>{`${getCurrentPageNumber()} / ${Math.ceil(
                    resources.count / 10
                )}`}</Typography>
                <Button
                    disabled={resources.next === null}
                    onClick={() => handleNextClick(resources.next)}
                >
                    {i18n.t("common-next")}
                </Button>
            </div>
        </Container>
    );
};

export default ResourceList;
