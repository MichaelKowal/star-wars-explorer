import { Button, Container, Grid } from "@material-ui/core";
import i18next from "../i18n";
import React, { useContext } from "react";
import "../styles/Home.css";
import { AppContext } from "../context/AppContext";
import { apiType } from "../models/Page";

const Home: React.FC = () => {
    const { handleNewPage } = useContext(AppContext);
    const handleClickButton = (
        value: typeof apiType[number],
        altName: string
    ) => {
        handleNewPage({
            type: value,
            url: `https://swapi.dev/api/${value}`,
            displayName: i18next.t(`common-${value}`),
            altName
        });
    };

    return (
        <Container className="home-container">
            <Grid direction="row" justify="space-evenly" container>
                <Grid item key="films">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClickButton("films", "Wwahanscc")}
                    >
                        {i18next.t("common-films")}
                    </Button>
                </Grid>
                <Grid item key="people">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                            handleClickButton("people", "Akwoooakanwo")
                        }
                    >
                        {i18next.t("common-people")}
                    </Button>
                </Grid>
                <Grid item key="planets">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                            handleClickButton("planets", "Akanrawhwoaoc")
                        }
                    >
                        {i18next.t("common-planets")}
                    </Button>
                </Grid>
                <Grid item key="species">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                            handleClickButton("species", "Cakwooaahwoc")
                        }
                    >
                        {i18next.t("common-species")}
                    </Button>
                </Grid>
                <Grid item key="starships">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                            handleClickButton("starships", "Caorarccacahakc")
                        }
                    >
                        {i18next.t("common-starships")}
                    </Button>
                </Grid>
                <Grid item key="vehicles">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                            handleClickButton("vehicles", "Howoacahoaanwoc")
                        }
                    >
                        {i18next.t("common-vehicles")}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
