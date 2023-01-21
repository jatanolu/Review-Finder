import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Searchbar from '../components/searchbar.jsx'
import Profile from '../components/profilepage.jsx'
import HomePage from '../components/homepage.jsx'
import BackgroundImg from '../components/background.jsx'
import SignUpPage from '../components/signuppage.jsx'
import SignInPage from '../components/signinpage.jsx'


function App() {

	const [location, setLocation] = useState('New York City')
	const [searching, setSearch] = useState('')
	const [searched, setSearched] = useState('')
	const [LoggedIn, setLoggedIn] = useState(false)
	const [user, setuser] = useState(null)

	function getCookie(name) {
  	let cookieValue = null;
  	if (document.cookie && document.cookie !== '') {
      	const cookies = document.cookie.split(';');
      	for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
         }
      }
  }
  return cookieValue;
}
	const csrftoken = getCookie('csrftoken');

	axios.defaults.headers.common['X-CSRFToken'] = csrftoken

	const curr_user=async()=>{
		let myResponse=await axios.get('current_user')
		let user=myResponse.data && myResponse.data[0] && myResponse.data[0].fields
		setuser(user)
		if(user != undefined){
			setLoggedIn(true)
		}
		
	}

	const AccountPage=async()=>{
		console.log('going to your account')
		window.location.replace('#/profile')
	}

	const log_out=async()=>{
		let myResponse=await axios.post('log_out/')
		if (myResponse.data["signout"]==true){
			setLoggedIn(false)
			console.log('signed out')
			window.location.replace('/')
		}
		else
			console.log('already signed out')
	}


	function printThat(){
		console.log('change in the air searching')
		console.log(searching)
	}

	const LocationGetter=async()=>{
		let userip = ''
		await fetch('https://api.ipify.org/?format=json')
		.then(results => results.json())
		.then(data => userip=data.ip);
		console.log(userip)
		let myResponse=await axios.post('location/', {'ip':userip})
		console.log(myResponse)
		console.log(myResponse.data.result.city)
		setLocation(myResponse.data.result.city)
	}

	const handleSubmit=(e)=>{
		e.preventDefault()
		setSearched({'location':location, 'searching':searching})
		console.log('Form submitted', e)
		console.log(e.target.searchq.value)
		console.log(location)
		console.log(searched)
		window.location.replace('#/search')	

	}

	useEffect(()=>{
		curr_user()
	},[])

	useEffect(()=>{
		printThat()
	},[searching])

	useEffect(()=>{
		LocationGetter()
	},[])


  return (
	  <>
	<header>
	<Navbar bg='light' expand='lg' fixed='top'>
	  <Container fluid>
	  <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} >
	  	<Nav.Link href='/' >Home</Nav.Link>
	<Form onSubmit={handleSubmit} className='d-flex position-absolute top-50 start-50 translate-middle'>
	<Form.Control type='search' name='searchq' placeholder='Search' className='me-2'
		aria-label='Search' onChange={(event)=>setSearch(event.target.value)}/>
	<Form.Control type='search' name='locationq' value={location} placeholder='Location' className='me-2'
		aria-label='Location' onChange={(event)=>setLocation(event.target.value)}/>
		<Button type='submit' variant='outline-success'>Search</Button>
		</Form>	
	<div className='d-flex position-absolute end-0'>
	  {LoggedIn
	  ? <Nav.Link onClick={()=>{AccountPage()}} className='me-3 position-relative'>{user.username}</Nav.Link> 
	  : <Nav.Link href='/#/signIn' className='me-3 position-relative'>Sign In</Nav.Link> 
	  }
	  {LoggedIn
	  ? <Nav.Link onClick={()=>{log_out()}} className='me-3 position-relative'>Logout</Nav.Link> 
	  : <Nav.Link href='/#/signUp' className='me-3 position-relative'>Sign Up</Nav.Link>
	  }
	  </div>
	
	  </Nav>
	</Container>
		</Navbar>
</header>
	  <Container fluid>
	<div className='fixed-bottom'>
	  <button onClick={()=>{setLoggedIn(!LoggedIn); console.log('logged =', LoggedIn)}}>Click to switch</button>
	  </div>
	  </Container>
	

	  	  <Router>
	  	<Routes>
	  		<Route path='/' element={<HomePage/>, <BackgroundImg/> }></Route>
	  		<Route path='/search' element={<Searchbar searched={searched} logged={LoggedIn}/>}></Route>
	  		<Route path='/profile' element={<Profile logged={LoggedIn}/>}></Route>
	  		<Route path='/signUp' element={<SignUpPage logged={LoggedIn}/>}></Route>
	  		<Route path='/signIn' element={<SignInPage logged={LoggedIn} />}></Route>
	  	</Routes>
	  </Router>
	  </>

  )
}

export default App
