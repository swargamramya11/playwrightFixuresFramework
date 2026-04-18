import { test, expect } from '../../utils/hooks';
import { RandomDataUtil } from '../../utils/randomDataGenerator'

test("Create Post body using faker", { tag: ['@createBookingByFaker'] }, async ({ reusableMethods }) => {

    const requestBody = {
        firstname: RandomDataUtil.getFirstName(),
        lastname: RandomDataUtil.getLastName(),
        totalprice: RandomDataUtil.getPrice(),
        depositpaid: RandomDataUtil.getDepositPaid(),
        bookingdates: {
            checkin: RandomDataUtil.getCheckinDate("yyyy-MM-dd"),
            checkout: RandomDataUtil.getCheckoutDate("yyyy-MM-dd", 5)
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