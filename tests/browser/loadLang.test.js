import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`loadLang`
  .page`http://localhost:3000/tests/browser/loadLang.test.html`;

test('Wait 10s for test to complete', async (t) => {
  await t
    .wait(10000)
    .expect(Selector('#mocha-stats').find('li').nth(1).child('em').textContent).eql('7');
});
