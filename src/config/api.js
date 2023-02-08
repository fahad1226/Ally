import axios from "axios";

export default () =>
    axios.create({
        baseURL: "http://127.0.0.1:3333/", // local server
        // baseURL: 'https://api.damngoodtools.com/api',
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    });
