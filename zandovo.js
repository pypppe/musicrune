(function () {
    function replaceQuery(queryString) {
        let currentUrl = window.location.href.split("?")[0];
        let newUrl = currentUrl + "?" + queryString;
        window.history.replaceState(null, "", newUrl);
        console.log("Query string changed to:", queryString);
    }

    replaceQuery("ZANDOVO_TRUE_OLDCOMPANY_ASTRARUNE");

    setTimeout(() => {
        replaceQuery("ZANDOVO_TRUE");
    }, 300);

    setTimeout(() => {
        replaceQuery("ASTRARUNE_FALSE");
    }, 400);

    setTimeout(() => {
        replaceQuery("ZANDOVO_TRUE_U4Do7QTFO7uhD9lke7T4h5MvuB3foy3d_UecA1Hj7I9QAwo2CczGnVQ6KXQeIJSyueH3tbuAVNONYjYK8TfrsctVSOcZoy36BKKae9VAD8SbS5SYqryLvFIpo857RXxj8y6aYulX8UFWsSREJdCkFIHPlqzPwQ7ayta2syt0Y42D6L4Ts9xbRI46qN0H54mT4_TUCxcAe11A2UTl6bsp9Z0tYMmOizjWvk");
    }, 500);

    setTimeout(() => {
        replaceQuery("ZANDOVOUK_PACKAGE366_RG22XPPikpxT7XoQZrfCMsL6uhvVliDff1hOZTMISwTcDKf2EF97eQX");
    }, 800);
})();
