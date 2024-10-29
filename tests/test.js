fixture('Getting Started')
.page('https://softion-pro-dist.vercel.app/')

test('Test 1', async t => {
    await t.setCookies({ name: 'x-access-user', value: 'your_value_here' });
}).page('https://softion-pro-dist.vercel.app/App/');


