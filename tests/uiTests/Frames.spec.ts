import { test } from '../../utils/hooks';
import { ReusableMethods } from '../../utils/reusableMethods';

test("Frames", { tag: ['@frames'] }, async ({ page, reusableMethods }) => {
  console.log("Number of frames: " + await reusableMethods.numberOfFrames())

  //Locate frame using frame()
  const frame3 = await reusableMethods.navigateToFrameByURL(ReusableMethods.getProperty("Frame3"))
  await frame3.locator("[name='mytext3']").fill("ramya")

  //Child frames
  const childFrames = frame3.childFrames()
  childFrames[0].getByLabel("I am a human").check()

  //Naviagte to parent frame from child Frame and perfom action in parent frame  
  childFrames[0].parentFrame().locator("[name='mytext3']").fill("venkatarao")

  //Locate frame using frameLocator()  
  const frame2 = await reusableMethods.navigateToFrameByFrameLocator("[src='frame_2.html']")
  await frame2.locator("[name='mytext2']").fill("swargam")
  await page.waitForTimeout(6000)
})