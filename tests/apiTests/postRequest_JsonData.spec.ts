import { test, expect } from '../../utils/hooks';
import { DataProvider } from '../../utils/dataproviders'

test("Create Post body using json body", { tag: ['@createBookingFromJson'] }, async ({ reusableMethods }) => {

    const jsonPath = 'resources/testdata/apidata/postRequestData.json'
    const requestBody = DataProvider.getTestDataFromJson(jsonPath)

    const [response, responseBody] = await reusableMethods.postRequest("/booking", { data: requestBody })

    //Validate status
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    //Validate response body
    expect(responseBody).toHaveProperty("booking")
    expect(responseBody).toHaveProperty("bookingid")
    expect(responseBody).toHaveProperty("booking.additionalneeds")

    //validate booking details
    const booking = responseBody.booking
    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    })

    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout
    })
})