fixture('Getting Started')
.page('https://softion-pro-dist.vercel.app/')

test('Test de prueba de cookies', async t => {
    const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDM0NzQ2NWQ1OTdhNDhiNDQ4YWRhMCIsImlhdCI6MTczMDE5Mjg1NywiZXhwIjoxNzMwMjc5MjU3fQ.Pn9b9i5L6a468O5_4h07CYVoqjvTGyAYOHeMjF_AuhI';
    await t.setCookies({ name: 'x-access-user', value: fakeJWT });
    await t.navigateTo('https://softion-pro-dist.vercel.app/App/');
    await t.wait(3000);
    const url = await t.eval(() => window.location.href);
    if (url !== 'https://softion-pro-dist.vercel.app/App/')
        await t.expect(url).notEql('https://softion-pro-dist.vercel.app/App/', 'La url no cambio correctamente');
    else
        await t.expect(true).notOk('La prueba no se completo');
}).page('https://softion-pro-dist.vercel.app/App/');

test('Test de inicio de sesión', async t => {
    await t
        .typeText('#email', 'test@test.com')
        .typeText('#password', '123456ASDasd@');
    await t.click('button');
})

test ('Test de Api (Informacion del usuario)', async t => {
    try{
        const response = await fetch(`https://softion-api-v3.vercel.app/api/auth/espinosa.yuhann12@gmail.com`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        if(result.message !== 'ok'){
            throw new Error('El servidor no respondio con el mensaje esperado')
        }
    }catch(error){
        console.log(error)
        throw error
    }
})
