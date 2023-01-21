import { useEffect, useState, useRef } from 'react'
import LocationGetter from '../src/App.jsx'
import '../src/index.css'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


function Searchbar(request) {
	const [searchresult, setsearchresult] = useState([])

  	const mapContainer = useRef(null);
  	const map = useRef(null);
  	const [lng, setLng] = useState(-71.058);
  	const [lat, setLat] = useState(42.36);
  	const [zoom, setZoom] = useState(9);
	const [selected, setSelected] = useState(null)
	const [review,	setReview] = useState(null)

	mapboxgl.accessToken= 'pk.eyJ1IjoiamF0YW5vIiwiYSI6ImNsYndxOWY1NjA2cWszdnA4YzA5N20xYmcifQ.1cY-iw6TUx16Oh0yjWFbMg'
		
	const searchThat=async()=>{
		console.log(request)
		if(request['searched']===''){
			return;
		}
		let myResponse=await axios.post('search/', {'loc':request['searched']['location'], 'searching':request['searched']['searching']})
		console.log(myResponse)
		if(myResponse.data.success ===true){
		if( myResponse.data.result.businesses.length === 0){
		console.log(myResponse)
		setLng(myResponse.data.result.region.center.longitude)
		setLat(myResponse.data.result.region.center.latitude)
		setSelected(null)
		setsearchresult([])
		return
		}
		console.log(myResponse.data.result.businesses)
		setsearchresult(myResponse.data.result.businesses)
		setLng(myResponse.data.result.region.center.longitude)
		setLat(myResponse.data.result.region.center.latitude)
		setSelected({'business': myResponse.data.result.businesses['0']})
		console.log(myResponse.data.result.businesses['0']['name'])
		}
		else 
			return
	}

	const getReviews=async()=>{
		console.log('hereh')
		let myResponse=await axios.post('search-review/', {'id':selected['business']['id']})
		console.log(myResponse, 'review')
		setReview(myResponse.data.result.reviews)

	}	

	const handleList=(e)=>{
		e.preventDefault()
		console.log(e)
		console.log(document.getElementById('chosenList').value)
	}


	  useEffect(() => {
		if(request['searched']===''){
		window.location.replace('/')
		}
    		map.current = new mapboxgl.Map({
      		container: mapContainer.current,
      		style: 'mapbox://styles/mapbox/streets-v12',
      		center: [lng, lat],
      		zoom: 11.5,
   		 })
		console.log('long', lng, 'lat', lat)
		const nav = new mapboxgl.NavigationControl();
		map.current.addControl(nav, 'top-left');
		
		searchresult.map((business, index)=> {return (
		(index < 11) ?
		new mapboxgl.Marker({color: '#FF0000'})
		.setLngLat([business.coordinates.longitude, business.coordinates.latitude])
		.addTo(map.current)
		: null
		)})
		},[lat])

	useEffect(()=>{
		if(selected != null){
		console.log('going into review call')
		getReviews()
		let marker1 = new mapboxgl.Marker()
		.setLngLat([selected.business.coordinates.longitude, selected.business.coordinates.latitude])
		.addTo(map.current);
		  console.log(map)
		console.log(marker1, 'marker')
		return ()=>{
			let bob = new mapboxgl.Marker({color: '#FF0000'})
			.setLngLat([marker1._lngLat.lng, marker1._lngLat.lat])
			.addTo(map.current);
			marker1.remove()
		}
		}
	},[selected])


	useEffect(()=>{
		searchThat()
	},[request['searched']])

	return (
	<>
	{searchresult.map((business, index)=> {return (
		<Row >
	<Col md={1}>		
      <Card.Img variant="top" src={business.image_url} style={{height: 175, width: 185}}/>
	</Col>
	<Col md='auto'>
    <Card bg='light' className='mx-4 text-center'style={{ width: '24rem' }}>

      <Card.Body >
        <Card.Title onClick={()=>{setSelected({business})}}>{index+1}. {business.name}</Card.Title>
        <Card.Text> Rating: {business.rating} </Card.Text>
	<Card.Text> Review count: {business.review_count} </Card.Text>
        <Button onClick={()=>{window.location.replace(`${business.url}`)}} variant="primary">Go to Yelp site</Button>
      </Card.Body>
    </Card>
		</Col>
	</Row>
	)})}
	{selected != null ?
	<div style={{top: 56, right:900, position: 'fixed', height: '100vh', width:400}}>	
    <Card bg='light' className='mx-4 text-center'style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{selected.business.name}</Card.Title>
        <Card.Text> Phone#: {selected.business.phone} </Card.Text>
        <Card.Text> Address: {selected.business.location.display_address['0']} </Card.Text>
        <Card.Text> Rating: {selected.business.rating} </Card.Text>
        <Card.Text> reviews: {selected.business.review_count} </Card.Text>
	{review ? review.map((op)=>{return  <Card.Text>Review: {op.text}</Card.Text>}) : null}
	{request.logged ? 
	<Form onSubmit={handleList}>
	 <Form.Select id='chosenList' aria-label="Default select example">
      <option>Add to List...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
      <option >Pops</option>
    	</Form.Select>
	<Button type='submit'>Add to list</Button>
	</Form>
	: null}
      </Card.Body>
    </Card>
	</div>
	: null }
	<div ref={mapContainer} style={{top: 56, right:0, position: 'fixed', height: '100vh', width:700}}/>
	</>

	)
}
export default Searchbar
