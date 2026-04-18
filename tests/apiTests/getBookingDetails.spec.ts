import { test, expect } from '../../utils/hooks';

test("Get Booking details by path parameters", { tag: ['@getBookingByPathParameters'] }, async ({ reusableMethods }) => {
    const bookingId = 1
    const [response, responseBody] = await reusableMethods.getRequest(`/booking/${bookingId}`)

    //Validate status
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
})

test("Get Booking details by query parameters", { tag: ['@getBookingByQueryParameters'] }, async ({ request, reusableMethods }) => {
    const firstname = "Jim"
    const lastname = "Brown"

    const [response, responseBody] = await reusableMethods.getRequestWithQueryParameters("/booking", {
        params: {
            firstname,
            lastname
        }
    })

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    expect(responseBody.length).toBeGreaterThan(0)
})