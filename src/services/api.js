import axios from "axios";

function getUser(name) {
    var data = axios.get(`https://api.github.com/users/${name}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })

    return data;
}


function getRepositories(repos_url) {
    var data = axios.get(repos_url)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })

    return data;
}

function getCommits(url) {
    var data = axios.get(url)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })

    return data;
}

export { getUser, getRepositories, getCommits }