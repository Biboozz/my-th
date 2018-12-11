import axios from "axios";

export default {
    s3: {
        REGION: "us-east-2",
        BUCKET: "my-treasurehunt"
    }
    , cognito: {
        REGION: "eu-west-1",
        IDENTITY_POOL_ID: "eu-west-1:4c3cd1bd-ab32-4733-9896-b63fc17fdbd5"
    }
}

export const facebookAppID = 2205143559520263;

export const facebookFields = "public_profile, email, manage_pages, publish_pages";

export const urls = {
    FacebookSDK: `https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.1&appId=${facebookAppID}&autoLogAppEvents=1`,
    getFbAvatar: (id) => {
        return `https://graph.facebook.com/v3.1/${id}/picture`
    },
    loginUrl: '/login'
};

export const botNameMaxLength = 50;

export const myThApiBase = "https://fzz8vv474j.execute-api.eu-west-3.amazonaws.com";

export function myThApi(path, data, type = "GET", config = null, prefix = "/prod") {
    if (type === "GET" && data.constructor === Array) {
        let dataTmp = data.join("/");
        return axios.get(myThApiBase + prefix + path + "/" + dataTmp, config)
    }
    else if (type === "POST" && data.constructor === Object) {
        return axios.post(myThApiBase + prefix + path, data, config)
    }
    return null;
}