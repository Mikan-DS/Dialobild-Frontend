import {useEffect} from "react";
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

    let oAuthState = sessionStorage.getItem("DiabildAuthState")

    //TODO нужно время дебага авторизации
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('startagain') !== null){
        sessionStorage.removeItem("DiabildAuthState")
        window.location.href = `${window.location.protocol}//${window.location.host}`;
    }


    async function fetchAPI(url) {
        const apiHeaders = new Headers();

        if (accessToken){
            apiHeaders.append("Authorization", "Bearer "+accessToken);
        }

        const formdata = new FormData();

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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.json();


        return data;
    }

    function beginAuth(){
        sessionStorage.setItem('DiabildAuthState', 'noauth')
    }


    function generateCodeChallenge(){ //TODO стоит ли после получения токена подчищать?
        sessionStorage.setItem(
            'DiabildAuthCodeVerifier',
            'VGMB4QY13C24L83RFK0G9U7G49VKIVLM3ELIVRTAGDAGTV6A52C191S93I105W2AE1EITCET4IJ7ZBYVQHDMW38CG9V0MLCTNPUIJFFSDKE4DGFGVNOVW1TVWO76PX');
        sessionStorage.setItem('DiabildAuthCodeChallenge', '4SsOYQmOG5m2BXt-oiqAWVa_lAWFpQsWsvBOiD09C10');

    }

    async function authorize() {

        console.log("STATE", oAuthState)
        // Нет токена
        // Начальная стадия (редирект на сервер авторизации)
        if (oAuthState === "noauth"){
            console.log("noauth")
            generateCodeChallenge()
            let params = new URLSearchParams();
            params.append('code_challenge', sessionStorage.getItem('DiabildAuthCodeChallenge'));
            params.append('code_challenge_method', 'S256');
            params.append('redirect_uri', `${window.location.protocol}//${window.location.host}`);
            params.append('client_id', variables.client_id);
            params.append('response_type', 'code');
            sessionStorage.setItem('DiabildAuthState', 'wait_code')
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
                    // client_id: "react",
                    // client_secret: "coolsecret"
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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                const {access_token, expires_in, refresh_token} = data;

                sessionStorage.removeItem('DiabildAuthState')
                oAuthState = null;
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
    
    
    return {
        getCookie,
        fetchAPI,
        oAuthState,
        beginAuth,
        authorize
    }

}



function useOAuthOld(){

    useEffect(() => {
        const postData = async () => {


            const urlParams = new URLSearchParams(window.location.search);
            //setApiError(urlParams.get('error'))


            const response = await fetch('http://localhost:8000/api/projects/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // здесь ваши данные
                }),
            });

            if (urlParams.get('startagain') !== null){
                sessionStorage.removeItem("DiabildAuthState")
            }


            if (!sessionStorage.getItem("DiabildAuthState") && !urlParams.get('code')){



                if (response.redirected){
                    sessionStorage.setItem('DiabildAuthState', 'auth');
                    sessionStorage.setItem('DiabildAuthCodeVerifier', 'VGMB4QY13C24L83RFK0G9U7G49VKIVLM3ELIVRTAGDAGTV6A52C191S93I105W2AE1EITCET4IJ7ZBYVQHDMW38CG9V0MLCTNPUIJFFSDKE4DGFGVNOVW1TVWO76PX');
                    sessionStorage.setItem('DiabildAuthCodeChallenge', '4SsOYQmOG5m2BXt-oiqAWVa_lAWFpQsWsvBOiD09C10');

                    let params = new URLSearchParams();
                    params.append('code_challenge', sessionStorage.getItem('DiabildAuthCodeChallenge'));
                    params.append('code_challenge_method', 'S256');
                    params.append('redirect_uri', 'http://localhost:3000');
                    params.append('client_id', 'react');
                    params.append('response_type', 'code');
                    let url = 'http://localhost:8000/oauth/authorize/?' + params.toString();

                    window.location.href = url;
                }

            }
            else {

                const code = urlParams.get('code')

                if (code){
                    console.log("YESY")
                    sessionStorage.removeItem("DiabildAuthState")

                    let codeVerifier = sessionStorage.getItem('DiabildAuthCodeVerifier');
                    let codeChallenge = sessionStorage.getItem('DiabildAuthCodeChallenge');

                    if (!codeVerifier || !codeChallenge) {
                        // setApiError('Не удалось получить необходимые значения из sessionStorage.');
                    }

                    const postData = async () => {
                        const response = await fetch('http://localhost:8000/oauth/token/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                code_verifier: codeVerifier,
                                code_challenge: codeChallenge,
                                code_challenge_method: "S256",
                                grant_type: "authorization_code",
                                code: code,
                                client_id: "react",
                                client_secret: "coolsecret"
                            }),
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();
                        console.log(data);
                    };

                    postData().catch(error => console.log(error));


                    // const oAuthHeaders = new Headers();
                    // oAuthHeaders.append("Authorization", "Bearer 2HgAbfvi8H0LW72HVeaTOUQoE0vANR");
                    // oAuthHeaders.append("Cookie", "csrftoken=2xTBAIVMxAzKzV7asrz8JRwAimTcJ9dy");
                    //
                    // const formdata = new FormData();
                    //
                    // const requestOptions = {
                    //     method: "POST",
                    //     headers: oAuthHeaders,
                    //     body: formdata,
                    //     redirect: "follow"
                    // };
                    //
                    // fetch("http://localhost:8000/api/projects/", requestOptions)
                    //     .then((response) => response.text())
                    //     .then((result) => console.log(result))
                    //     .catch((error) => console.error(error));

                }
                else {
                    // setApiError("Произошла ошибка при авторизации. Код доступа не получен. Свяжитесь с разработчиком.")
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        };

        postData().catch(error => console.log(error));
    }, []); // пустой массив зависимостей означает, что эффект запустится только один раз после первого рендера



}