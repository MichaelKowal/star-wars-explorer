import i18next from "i18next";

i18next.init({
    lng: "en", // if you're using a language detector, do not define the lng option
    ns: ["en", "wk"],
    debug: true,
    resources: {
        en: {
            translation: {
                "common-home": "Home",
                "common-language": "Language",
                "common-films": "Movies",
                "common-next": "Next",
                "common-no-response-error": "No data received from {{url}}",
                "common-no-results": "Your search had no results.",
                "common-people": "People",
                "common-planets": "Planets",
                "common-previous": "Previous",
                "common-product-name": "Star Wars Explorer",
                "common-request-error": "Error fetching data from {{url}}",
                "common-search": "Search",
                "common-species": "Species",
                "common-starships": "Starships",
                "common-vehicles": "Vehicles"
            }
        },
        wk: {
            translation: {
                "common-home": "Acooscwo",
                "common-language": "Anrawhrrhurarrwo",
                "common-films": "Wwahanscc",
                "common-next": "Whwokao",
                "common-no-response-error":
                    "Whoo waraaora rcwooawoahhowowa wwrcoosc {{url}}",
                "common-no-results":
                    "Rooohurc cworarcoaac acrawa whoo rcwochuanaoc.",
                "common-people": "Akwoooakanwo",
                "common-planets": "Akanrawhwoaoc",
                "common-previous": "Akrcwohoahoohuc",
                "common-request-error":
                    "Worcrcoorc wwwoaooaacahwhrr waraaora wwrcoosc {{url}}",
                "common-species": "Cakwooaahwoc",
                "common-search": "Cworarcoaac",
                "common-starships": "Caorarccacahakc",
                "common-vehicles": "Howoacahoaanwoc"
            }
        }
    },
    react: {
        useSuspense: true
    }
});

export default i18next;
