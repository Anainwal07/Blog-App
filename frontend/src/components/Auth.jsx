import { Button, TextField, Typography , Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { green } from "@mui/material/colors";


const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  
  const [inputs , setInputs] = useState({
    name: "",
    email :"",
    password:"",
  });

  const [isSignup , setisSignup] = useState(false);
 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:  e.target.value
    }));
  }
  const requestBody = {
    name : inputs.name,
    email : inputs.email,
    password:inputs.password,
  }
  const sendRequest = async (type="login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`,requestBody)
    .catch((err) => console.log(err));
  
    const data = await res.data;
    console.log(data);
    return data;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(isSignup){
      sendRequest("signup").then((data) => localStorage.setItem("userId",data.user._id))
      .then(() => dispath(authActions.login())).then(() => navigate("/blogs"))
      .then(data=> console.log(data));
    }else{
      sendRequest().then((data) => localStorage.setItem("userId",data.user._id))
      .then(() => dispath(authActions.login())).then(() => navigate("/blogs"))
      .then(data=>console.log(data));
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Box 
          backgroundImage = "url('https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600')"
          maxWidth={400}
          display="flex" 
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin={"auto"}
          marginTop={5}
          borderRadius={5}
          >
          <Typography variant="h3" padding={3} textAlign={"center"}>{isSignup ? "SignUp" : "Login"}</Typography>
         {isSignup && <TextField name="name" onChange={handleChange} value={inputs.name}  placeholder="Name" margin="normal"/>}
          <TextField name="email" onChange={handleChange} value={inputs.email}  type="email" placeholder="Email" margin="normal"/>
          <TextField name="password" onChange={handleChange} value={inputs.password}  type="password" placeholder="Password" margin="normal"/>
          <Button type="submit" sx={{borderRadius : 3 , marginTop : 3}} variant="contained" color="primary">Submit</Button>
          <Button onClick={()=> setisSignup(!isSignup)} sx={{borderRadius : 3 , marginTop : 2}} color="primary">{isSignup ? "Login" : "Singup"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth;