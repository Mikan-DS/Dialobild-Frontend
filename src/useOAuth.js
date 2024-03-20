import variables from "./variables.json"

export default function useOAuth(){

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const accessToken = getCookie('access_token'); //TODO На случай если невозможно сохранять куки - пихать в сессию
    const refreshToken = getCookie('refresh_token');

    if (accessToken) {
        console.log("Куки с access_token найдены: ", accessToken);
    } else {
        console.log("Куки с access_token отсутствуют.");
    }

    // let oAuthState = sessionStorage.getItem("DiabildAuthState")

    function getOAuthState() {
        return sessionStorage.getItem("DiabildAuthState")
    }

    //TODO нужно время дебага авторизации
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('startagain') !== null){
        sessionStorage.removeItem("DiabildAuthState")
        window.location.href = `${window.location.protocol}//${window.location.host}`;
    }


    async function fetchAPI(url, body=null) {
        const apiHeaders = new Headers();

        if (accessToken){
            apiHeaders.append("Authorization", "Bearer "+accessToken);
        }

        let formdata = null;
        if (body){
            formdata = JSON.stringify(body);
        }
        else{
            formdata = new FormData();
        }

        const requestOptions = {
            method: "POST",
            headers: apiHeaders,
            body: formdata,
            // redirect: 'manual'
        };

        const response = await fetch(url, requestOptions);
        
        if (response.redirected){
            return false;
        }
        else if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} message: "${response.statusMessage}"`);
        }

        const data = response.json();


        return data;
    }

    function beginAuth(){
        sessionStorage.setItem('DiabildAuthState', 'noauth');
        console.log(getOAuthState())
    }

    async function generateCodeChallenge() {
        const randomLength = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
        let codeVerifier = Array.from({length: randomLength}, () => Math.floor(Math.random() * 36).toString(36)).join('');

        let encoder = new TextEncoder();

        let data = encoder.encode(codeVerifier);
        let hash= await window.crypto.subtle.digest('SHA-256', data)
        let base64Hash = btoa(String.fromCharCode.apply(null, new Uint8Array(hash)));

        let codeChallenge = base64Hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

        window.sessionStorage.setItem('DiabildAuthCodeVerifier', codeVerifier);
        window.sessionStorage.setItem('DiabildAuthCodeChallenge', codeChallenge);
    }


    async function authorize() {

        const oAuthState = getOAuthState()
        console.log("STATE", oAuthState)

        // Нет токена
        // Начальная стадия (редирект на сервер авторизации)
        if (oAuthState === "noauth"){
            console.log("noauth")
            await generateCodeChallenge();
            let params = new URLSearchParams();
            params.append('code_challenge', sessionStorage.getItem('DiabildAuthCodeChallenge'));
            params.append('code_challenge_method', 'S256');
            params.append('redirect_uri', `${window.location.protocol}//${window.location.host}`);
            params.append('client_id', variables.client_id);
            params.append('response_type', 'code');
            sessionStorage.setItem('DiabildAuthState', 'wait_code');
            window.location.href = `${variables.backend_url}/oauth/authorize/?` + params.toString();

        }
        // Вторая стадия (получение кода авторизации и отправка запроса на обмен токена)
        else if (oAuthState === "wait_code"){
            console.log("wait_code")

            const code = urlParams.get('code')

            if (code){
                const requestBody = new URLSearchParams({
                    code_challenge: sessionStorage.getItem('DiabildAuthCodeChallenge'),
                    code_verifier: sessionStorage.getItem('DiabildAuthCodeVerifier'),
                    code_challenge_method: "S256",
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}`
                });

                const response = await fetch(`${variables.backend_url}/oauth/token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': variables.basic_header
                    },
                    body: requestBody,
                });


                if (!response.ok) {
                    sessionStorage.removeItem("DiabildAuthState")
                    alert("Авторизация не удалась! Попробуйте обновить страницу.")
                    // throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                const {access_token, expires_in, refresh_token} = data;

                sessionStorage.removeItem('DiabildAuthState')
                document.cookie = `access_token=${access_token}; expires=${expires_in}; path=/`;
                document.cookie = `refresh_token=${refresh_token}; expires=${expires_in}; path=/`;



            }
            else {
                alert("Авторизация не удалась! Попробуйте обновить страницу.")
                sessionStorage.removeItem("DiabildAuthState")
            }
        }

        //TODO проработать ситуацию когда есть refresh_token
    }

    function logout() {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.location = "/";
    }
    
    
    return {
        getCookie,
        fetchAPI,
        getOAuthState,
        beginAuth,
        authorize,
        logout
    }

}