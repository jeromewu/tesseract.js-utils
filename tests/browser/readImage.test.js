import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`loadLang`
  .page`http://localhost:3000/tests/browser/readImage.test.html`;

test('Wait 30s for test to complete', async (t) => {
  await t
    .wait(30000)
    .expect(Selector('#mocha-stats').find('li').nth(1).child('em').textContent).eql('6');
});
