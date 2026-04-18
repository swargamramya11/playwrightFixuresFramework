import { test } from '../../utils/hooks';

test("Add Cookies", { tag: ['@cookies'] }, async ({ page, reusableMethods }) => {
  await reusableMethods.addCookies([
    {
      name: 'mycookie',
      value: '123456',
      url: 'https://testautomationpractice.blogspot.com/',
    }])

  await reusableMethods.getCookies()
})