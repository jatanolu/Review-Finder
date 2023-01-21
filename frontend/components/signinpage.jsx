import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function SignInPage(logged) {
	const [usr, setusr] = useState('')
	const [psswrd, setpsswrd] = useState('')
	
	const signIn=async()=>{
		console.log('hi')
		let myResponse=await axios.post('signIn/', {'user':usr, 'password': psswrd})
		console.log(myResponse)
		if(myResponse.data['success']){
			window.location.replace('/')
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
	},[psswrd])

	return (
	<>
	<Form style={{ maxHeight: '75px' }} className='d-flex position-absolute top-50 start-50 translate-middle'>
	<Form.Control type='text' placeholder='User Name or Email' className='me-2'
		aria-label='usr' onChange={(event)=>setusr(event.target.value)}/>
	<Form.Control type='password' placeholder='Password' className='me-2'
		aria-label='psswrd' onChange={(event)=>setpsswrd(event.target.value)}/>
		<Button onClick={signIn} className='mx-3 px-5' variant='outline-primary'>Sign In</Button>
		<p>Need an account? Register <a href="/#/signup">here</a></p>
		</Form>
		</>
	


	)
}
export default SignInPage
