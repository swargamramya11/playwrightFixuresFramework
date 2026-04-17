import { test } from '../utils/hooks';

test('Dropdown selection', { tag: ['@accessibility'] }, async ({ page, reusableMethods }, testInfo) => {
  await reusableMethods.returnAllTypesOfAccessibilityResults()
  await reusableMethods.returnFewTypesOfAccessibilityResults(testInfo, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  await reusableMethods.disableFewValidations(testInfo, ['duplicate-id'])
});