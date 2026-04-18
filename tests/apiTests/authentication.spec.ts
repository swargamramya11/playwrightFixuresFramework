import { test, expect } from '../../utils/hooks';

test('Basic Authentication', { tag: ['@basicAuthentication'] }, async ({ reusableMethods }) => {
    const [response, responseBody] = await reusableMethods.getRequestWithQueryParameters('https://httpbin.org/basic-auth/user/pass', {
        headers: {
            Authorization: 'Basic ' + Buffer.from('user:pass').toString('base64'),
        }
    })

    expect(response.status()).toBe(200);
})

test('Bearer Token Authentication 1', { tag: ['@bearerAuthentication1'] }, async ({ reusableMethods }) => {
    const bearerToken = "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";

    const [response, responseBody] = await reusableMethods.getRequestWithQueryParameters('https://api.github.com/user/repos', {
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    })

    expect(response.status()).toBe(200);
});

test('Bearer Token Authentication 2', { tag: ['@bearerAuthentication2'] }, async ({ reusableMethods }) => {
    const token = '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'; // Replace with a real token

    const [response, responseBody] = await reusableMethods.getRequestWithQueryParameters('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    expect(response.status()).toBe(200);
});

test('API Key Authentication', { tag: ['@apiAuthentication1'] }, async ({ reusableMethods }) => {
    const [response, responseBody] = await reusableMethods.getRequestWithQueryParameters('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: 'Hyderabad',
            appid: '803a3bf41c9b71cff1216821bcb0b1f2', // <-- hardcoded API key
        },
    })

    expect(response.status()).toBe(200);
});

// 4.1 API Key Auth
// Ref Link: https://www.weatherapi.com/docs/
// Returns current weather of city
//You need to signup and then you can find your API key under your account.
//https://www.weatherapi.com/signup.aspx

//API Key (14 days trial)  

test('API Key Auth - Header', { tag: ['@apiAuthentication'] }, async ({ reusableMethods }) => {
    const [response, responseBody] = await reusableMethods.getRequestWithQueryParameters('https://api.weatherapi.com/v1/current.json', {
        params: {
            q: 'India',
            appid: '803a3bf41c9b71cff1216821bcb0b1f2', // <-- hardcoded API key
        },
    })
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});