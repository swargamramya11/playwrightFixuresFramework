import { test, expect } from '../utils/hooks';
import { ReusableMethods } from '../utils/reusableMethods';
import AxeBuilder from '@axe-core/playwright';

test('Dropdown selection', { tag: ['@accessibility'] }, async ({ page }, testInfo) => {
  let reusableMethods = new ReusableMethods(page)

  await reusableMethods.returnAllTypesOfAccessibilityResults()
  await reusableMethods.returnFewTypesOfAccessibilityResults(testInfo, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  await reusableMethods.disableFewValidations(testInfo, ['duplicate-id'])
});