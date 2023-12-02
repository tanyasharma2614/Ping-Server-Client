const serverURL = 'http://localhost:3000/echo';

let text = 'text_1';
let delay =  100; 

setTimeout(() => {
    text = 'text_22';
}, delay);

let myRequest = new Request(serverURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
    },
    body: text,
});
let sendTime = new Date().getTime(); 
let receiveTime;
let rtt;
fetch(myRequest)
    .then((response) => {
        receiveTime = new Date().getTime(); 
        rtt = receiveTime - sendTime; 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then((responseText) => {
        console.log(responseText === text);
        console.log(`Response text:${responseText}`);
        console.log(`Response time:${rtt}`);
    })
    .catch((error) => {
        console.error(error);
    });