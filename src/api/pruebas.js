const [user, setUser] =useState({
    email: '',
    password: ''
})

const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.id]: e.target.value
    })
}

{
    input onchange={ setPasword ( e => e.targer.value ) }
    
    input onchange={ handleChange }
}

if( 'Gera llegaste' && 'No toy' ){
    console.log('JUI A MEAR')
}
else{
    console.log('HOLA :3')
}