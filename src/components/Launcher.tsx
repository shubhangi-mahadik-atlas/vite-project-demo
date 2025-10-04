import { Link, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import ProtectedRoute from "../helper/ProtectedRoute";

const Home = React.lazy( () => import('./home'))
const About = React.lazy( () => import('./AddUser'))
const Dashboard = React.lazy( () => import('./Users'))
const Login = React.lazy( () => import('./Login'))
function Luncher() {
    return ( <>
    <hr />
    <Link to={"/"}>Home | </Link>
    <Link to={"user"}>Add User | </Link>
    <Link to={"users"}>Users | </Link>
    <Link to={"login"}>Login </Link>
    <hr />
    <Suspense fallback={<div><h1>loading....</h1></div>}>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/user" element={<About/>}>
            <Route path="/user/:id" element={<About/>}></Route>
        </Route>
        <Route path="/users" element={<ProtectedRoute><Dashboard/></ProtectedRoute> }></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="*" element={<><h1>Not found!</h1></>}></Route>
    </Routes>
    </Suspense>
    <hr />
    </> );
}

export default Luncher;