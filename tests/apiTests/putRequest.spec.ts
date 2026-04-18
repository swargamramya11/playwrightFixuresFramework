
import { test, expect } from '../../utils/hooks';
import { DataProvider } from '../../utils/dataproviders'
import { ReusableMethods } from '../../utils/reusableMethods'

test('Update Booking (Put)', { tag: ['@updateBooking'] }, async ({ reusableMethods }) => {
    //1) Create a booking (Post) ---> bookingId
    const requestBody = DataProvider.getTestDataFromJson('resources/testdata/apidata/postRequestData.json');
    const [response, responsebody] = await reusableMethods.postRequest("/booking", { data: requestBody })

    const bookingid = responsebody.bookingid;   // extracting bookingid from the response body
    console.log("Booking id======>", bookingid);

    //2) Token creation
    const tokenrequestBody = DataProvider.getTestDataFromJson('resources/testdata/apidata/tokenRequestBody.json');
    const [tokenresponse, tokenresponsebody] = await reusableMethods.postRequest("/auth", { data: tokenrequestBody })
    const token = tokenresponsebody.token;
    console.log("Token ======>", token);

    //3) Update Booking (Put)
    const updateRequestbody = DataProvider.getTestDataFromJson('resources/testdata/apidata/putRequestBody.json');
    const [updateresponse, updateresponsebody] = await reusableMethods.putRequest(`/booking/${bookingid}`, {
        headers: { "Cookie": `token=${token}` },
        data: updateRequestbody
    })

    expect(updateresponse.ok()).toBeTruthy();
    expect(updateresponse.status()).toBe(200);
    console.log("Booking details updated succesfully...")
})