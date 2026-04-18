import { test, expect } from '../../utils/hooks';

test("Create Post body using static body", { tag: ['@createBookingByStatic'] }, async ({ reusableMethods }) => {

    const requestBody = {
        firstname: "Jim",
        lastname: "sd",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
            checkin: "2025-07-01",
            checkout: "2025-07-05"
        },
        additionalneeds: "super bowls"
    }

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
        firstname: "Jim",
        lastname: "sd",
        totalprice: 1000,
        depositpaid: true,
        additionalneeds: "super bowls"
    })

    expect(booking.bookingdates).toMatchObject({
        checkin: "2025-07-01",
        checkout: "2025-07-05"
    })
})