import React, { useContext, useRef, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Siginup.css";
import axios from "axios";



const SignupForm = () => {
  
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    id:"",
    name: "",
    email: "",
    decs:"",
    password: "",
    confirmPassword: "",
  });


  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const validateForm = () => {
    const { name, email, decs, password, confirmPassword } = formData;
  
    if (!name || !email || !decs || !password || !confirmPassword) {
      alert("All fields are required.");
      return false;
    }
  
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return false;
    }
  
    // Password and Confirm Password matching
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return false;
    }
  
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      // Send signup data to the server using Axios
      const response =   axios.post(
        "http://localhost:3001/Grouprouter/signup",
        formData
      );
  
      console.log(response.data);
      // Redirect or perform any other actions upon successful signup
      nav('./login');
    } catch (error) {
      console.log("Error during signup:", error.message);
      // Handle error cases, if needed
    }
  };
  
  return (
   
    <Container className='area relative z-0 bg-black w-screen h-screen'>
    <ul class="circles">
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
    <li id="rtgle"></li>
  </ul>
      <Row className="justify-content-center mt-5">
        <Col md={6} style={{ marginTop: "30px" }}>
          <Form
            style={{
              color: "white",
              background: "#0b0b0be8",
              padding: "10%",
              borderRadius: "20px",
              backgroundColor: "#212529",
              paddingBottom: "10%",
            }}
            onSubmit={handleSubmit}
          >
            <h1 className="sigin">SIGN UP </h1>

            <label className="form-label">Group picture</label>



            <Form.Group className="control" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleChange} />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="control" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="control" controlId="formEmail">
              <Form.Label>Job title</Form.Label>
              <Form.Control type="text" name="decs" onChange={handleChange} />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="control" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="control" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
            <div>
              <p>
                if U have account : <Link to="/Login">Login</Link>{" "}
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  
  );
};

export default SignupForm;
