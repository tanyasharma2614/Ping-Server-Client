const {ping,validateURL}=require('../clientA')

describe('Ping Function (Part A)',()=>{

    it('should resolve with RTT when a valid URL is provided',async()=>{
        const serverURL='https://example.com';
        const rtt=await ping(serverURL);
        expect(rtt).toBeGreaterThanOrEqual(0);
    });

    it('should resolve with false for a valid URL that does not exist',async()=>{
        const nonExistentURL='https://example-does-not-exist-abcd.com/';
        const rtt=await ping(nonExistentURL);
        expect(rtt).toBeFalse();
    });

});

describe('ValidateURL function (Part A)',()=>{
    
    it('should not throw an error for a valid URL',()=>{
        const validURL='https://example.com';
        expect(()=>validateURL(validURL)).not.toThrow();
    });

    it('should throw an error for an invalid URL',()=>{
        const invalidURL='invalid-url';
        expect(()=> validateURL(invalidURL)).toThrowError('Invalid URL');
    });
});