const Axios = require('axios');

class AxiosClient {
    constructor(url, auth){
        this._baseURL = url;
        this._auth = auth;
        let _this = this;
        if (!auth) throw "No Authorization Provided";
        this._client = Axios.create({
            baseURL : _this._baseURL,
            timeout: 10000,
            headers: {
                'Authorization': "Bearer "+auth
            }
        })
    }

    async checkAuth() {
        return !this._auth.scope
    }

    async authenticate() {
        let _this = this;
        return this._client.get('/IdSev/core/connect/authorize', {params: _this._auth});
    }

    async getTemplates() {
        try {
            let rsp = await this._client.get('/api/templates');
            if (!rsp.data) throw {error: 500, message: "No Data Recieved"};
            return rsp.data
        } catch (e) {
            if (!!e.toJSON) throw e.toJSON();
            throw e;
        }
    }

}

module.exports = AxiosClient;