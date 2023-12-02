const {ping,validateURL}=require('../clientA')
const {serverURL,text,delay}=require('../clientB')

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

    it('should handle multiple pings and resolve with an array of RTTs', async () => {
        const serverURLs = ['https://example.com', 'https://example.com', 'https://example.com'];
        const rtts = await Promise.all(serverURLs.map(url => ping(url)));
        rtts.forEach(rtt => expect(rtt).toBeGreaterThanOrEqual(0));
    });

    it('should reject with an error for an empty URL', async () => {
        const emptyURL = '';
        await expectAsync(ping(emptyURL)).toBeRejectedWithError('Invalid URL');
    });
    
    it('should reject with an error for a URL without a protocol', async () => {
        const urlWithoutProtocol = 'example.com';
        await expectAsync(ping(urlWithoutProtocol)).toBeRejectedWithError('Invalid URL');
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

    it('should throw an error for an empty URL', () => {
        const emptyURL = '';
        expect(() => validateURL(emptyURL)).toThrowError('Invalid URL');
    });

    it('should throw an error for a URL without a protocol', () => {
        const urlWithoutProtocol = 'example.com';
        expect(() => validateURL(urlWithoutProtocol)).toThrowError('Invalid URL');
    });

    it('should handle validating an array of mixed URLs', () => {
        const mixedURLs = ['https://example.com', 'invalid-url', ''];
        mixedURLs.forEach(url => {
            if (url === 'https://example.com') {
                expect(() => validateURL(url)).not.toThrow();
            } else {
                expect(() => validateURL(url)).toThrowError('Invalid URL');
            }
        });
    });

    it('should handle validating an array of empty URLs', () => {
        const emptyURLs = ['', '', ''];
        emptyURLs.forEach(url => expect(() => validateURL(url)).toThrowError('Invalid URL'));
    });

    it('should handle validating an array of URLs without a protocol', () => {
        const noProtocolURLs = ['example.com', 'example.org', 'example.net'];
        noProtocolURLs.forEach(url => expect(() => validateURL(url)).toThrowError('Invalid URL'));
    });
    
});