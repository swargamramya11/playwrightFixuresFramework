import { test, expect } from '../../utils/hooks';
import { DataProvider } from '../../utils/dataproviders'

test('Delete booking(end-to-end', { tag: ['@deleteBooking'] }, async ({ reusableMethods }) => {
    //1) create new booking
    const postrequestBody = DataProvider.getTestDataFromJson('resources/testdata/apidata/postRequestData.json');
    const [postresponse, postresponseBody] = await reusableMethods.postRequest("/booking", { data: postrequestBody })

    const bookingid = postresponseBody.bookingid;
    console.log("Booking is created.....");
    console.log("Booking id===>", bookingid);

    //2) Get booking
    const [getresponse, getresponseBody] = await reusableMethods.getRequest(`/booking/${bookingid}`)
    console.log("Booking details are......");

    //3) Creating token
    const tokenrequestBody = DataProvider.getTestDataFromJson('resources/testdata/apidata/tokenRequestBody.json');
    const [tokenresponse, tokenresponsebody] = await reusableMethods.postRequest("/auth", { data: tokenrequestBody })
    const token = tokenresponsebody.token;
    console.log("Token ======>", token);

    //4) Sending put request
    const updateRequestbody = DataProvider.getTestDataFromJson('resources/testdata/apidata/putRequestBody.json');

    const [updateresponse, updateresponsebody] = await reusableMethods.patchRequest(`/booking/${bookingid}`, {
        headers: { "Cookie": `token=${token}` },
        data: updateRequestbody
    })
    console.log("Booking details updated succesfully...")

    //4) Delete booking  
    const deleteresponse = await reusableMethods.deleteRequest(`/booking/${bookingid}`, {
        headers: { "Cookie": `token=${token}` },
    })

    expect(deleteresponse.statusText()).toBe("Created");
    expect(deleteresponse.status()).toBe(201)

    console.log("Booking are deleted successfully.....")
})