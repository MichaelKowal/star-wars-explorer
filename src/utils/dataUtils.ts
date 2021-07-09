import i18n from "../i18n";

// TODO: get things working with wookiee translations
export const fetchData = async (url: string) => {
    try {
        const response = await fetch(url);
        // const wookieResponse = await fetch(
        //     `${url}${url.includes("?") ? "&" : "?"}format=wookiee`
        // );
        // Only save the info if the request succeeded.
        if (response) {
            // Get the info from the data streams.
            const reader = response.body?.getReader();
            // const wookieeReader = wookieResponse.body?.getReader();
            let readResult = await reader?.read();
            let decodedResult = new TextDecoder().decode(readResult?.value);
            while (!readResult?.done) {
                readResult = await reader?.read();
                decodedResult += new TextDecoder().decode(readResult?.value);
            }
            // let wookieeReadResult = await wookieeReader?.read();
            // let decodedWookieeResult = new TextDecoder().decode(
            //     wookieeReadResult?.value
            // );
            // while (!wookieeReadResult?.done) {
            //     wookieeReadResult = await reader?.read();
            //     decodedWookieeResult += new TextDecoder().decode(
            //         wookieeReadResult?.value
            //     );
            // }
            // If there is any info, parse it and store it.
            if (decodedResult) {
                const newInfo = JSON.parse(decodedResult);
                // const formattedWookieeResult = decodedWookieeResult
                //     .replaceAll("whhuanan", "null")
                //     .replaceAll(/\\rc/g, "\r")
                //     .replaceAll(/\\wh/g, "\n");
                // const newWookieeInfo = JSON.parse(formattedWookieeResult);
                // Don't set state on unmounted component.

                return {
                    resourceInfo: newInfo,
                    wookieeInfo: {}
                };
            }
        } else {
            throw new Error(i18n.t("common-no-response-error", { url: url }));
        }
    } catch (e: any) {
        throw new Error(
            i18n.t("common-request-error", {
                url: url
            })
        );
    }
};
