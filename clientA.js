const ping = function (serverURL){
    return new Promise((resolve,reject)=>{
        validateURL(serverURL);

        const myRequest=new Request(serverURL,{
            method:'GET',
            mode:'no-cors',
            cache:'no-cache',
            referrerPolicy:'no-referrer'
        });

        let sendTime=new Date();
        fetch(myRequest).then(()=>{
            let receiveTime=new Date();
            const rtt= receiveTime.getTime()-sendTime.getTime();
            resolve(rtt);
        }).catch(()=>resolve(false));
    });
};

const validateURL=function(url){
    const urlFormat = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
    if(!urlFormat.test(url)){
        throw new Error('Invalid URL');
    }
};

module.exports={ping,validateURL};

const serverURL='https://www.rutgers.edu/';
ping(serverURL).then((rtt)=>{
    if(rtt!==false){
        console.log(`Round-Trip Time (RTT): ${rtt} ms`);
    }else{
        console.log('Failed to ping');
    }
});