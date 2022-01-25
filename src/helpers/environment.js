let APIURL = '';

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:7770';
        break;
    case 'speakeasyclient.herokuapp.com':
        APIURL = 'https://speakeasyserver.herokuapp.com/';
        break;
    default:
        APIURL = 'https://speakeasyserver.herokuapp.com/'
}

export default APIURL