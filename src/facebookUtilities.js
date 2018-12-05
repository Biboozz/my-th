export const getAuthResponse = () => {
    return new Promise(function (resolve) {
        try {
            window.FB.getLoginStatus((response) => {
                console.log(response);
                if (response.status === 'connected') {
                    resolve(response.authResponse);
                } else {
                    console.error("Get Auth Response didn't managed this case : " + response.status)
                }
            });
        } catch (e) {
            console.error(e)
        }
    })
};

//Passing accessToken make us win a lot of time
export const getPermissions = (userId = 'me', accessToken = null) => {
    return new Promise(function (resolve) {
        const run = (accessToken) => {
            window.FB.api(`/${userId}/permissions`, {access_token: accessToken}, resolve)
        };
        if (accessToken !== null) {
            getAuthResponse().then(r => {
                run(r.accessToken);
            })
        } else run(accessToken)
    });
};

export const getUserPages = (userId = 'me', accessToken = null) => {
    return new Promise(function (resolve) {
        const run = (accessToken) => {
            window.FB.api(`/${userId}/accounts`, {access_token: accessToken}, resolve)
        };
        if (accessToken !== null) {
            getAuthResponse().then(r => {
                run(r.accessToken);
            })
        } else run(accessToken)
    })
};

export const getPagePicture = (pageId, width = 100, height = 100) => {
    return new Promise(function (resolve) {
        window.FB.api(`/${pageId}/picture?width=${width}&height=${height}&redirect=false`, resolve)
    })
}