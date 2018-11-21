import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`readImage`
  .page`http://localhost:3000/tests/browser/readImage.test.html`;

test('Wait 15s for test to complete', async (t) => {
  await t
    .wait(15000)
    .expect(Selector('#mocha-stats').find('li').nth(1).child('em').textContent).eql('8');
});
