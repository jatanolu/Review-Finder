import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function SignUpPage(logged) {
	const [usr, setusr] = useState('')
	const [email, setemail] = useState('')
	const [pass1, setpass1] = useState('')
	const [pass2, setpass2] = useState('')
	const signUp=async()=>{
		console.log('hi')
		let myResponse=await axios.post('signUp/', {'username': usr, 'email':email, 'password1': pass1, 'password2': pass2})
		console.log(myResponse)
		if('fail' in myResponse.data){alert(myResponse.data.fail)}
		else{
			let signResponse=await axios.post('signIn/', {'user':usr, 'password':pass1})
			console.log(signResponse)
			if(signResponse.data['success']){
				window.location.replace('/')
			}
		}
		
	}

	function signCheck(){
		if(logged.logged===true){
			window.location.replace('/')
		}
	}

	function printThat(){
		console.log('change in the air usr')
	}

	function printThat2(){
		console.log('change in the air email')
	}

	useEffect(()=>{
		signCheck()
	},[])

	useEffect(()=>{
		printThat()
	},[usr])

	useEffect(()=>{
		printThat2()
	},[email])

	return (
	<>
	<Form className='d-flex position-absolute top-50 start-50 translate-middle' style={{ maxHeight: '75px' }}>
	<Form.Control type='text' placeholder='User Name' className='me-2'
		aria-label='usr' onChange={(event)=>setusr(event.target.value)}/>
	<Form.Control type='text' placeholder='Email' className='me-2'
		aria-label='uemail' onChange={(event)=>setemail(event.target.value)}/>
	<Form.Control type='password' placeholder='Password' className='me-2'
		aria-label='pass1' onChange={(event)=>setpass1(event.target.value)}/>
	<Form.Control type='password' placeholder='Password' className='me-2'
		aria-label='pass2' onChange={(event)=>setpass2(event.target.value)}/>
		<Button onClick={signUp} className='mx-3 px-5' variant='outline-success'>Sign Up</Button>

		<p>Already have an account? Sign in <a href="/#/signin">here</a></p>
		</Form>
		</>
	


	)
}
export default SignUpPage
