import { useEffect, useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'


function BackgroundImg() {

	return (
	<>
	 <Carousel>
      <Carousel.Item>
        <img
          className="d-block vw-100 vh-100"
          src="https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Just a random picture.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block vw-100 vh-100"
          src="https://plus.unsplash.com/premium_photo-1661266884360-028764df3128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Just another picture.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block vw-100 vh-100"
          src="https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
	Last Picture.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
	</>

	)
}
export default BackgroundImg
