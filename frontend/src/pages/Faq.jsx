import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";

const Faq = () => {
    const apiCall = () => {
        axios.get('http://localhost:8800/').then((res) => {
          //this console.log will be in our frontend console
          console.log(res);
        })
    }
    useEffect(() => {
        // Update the document title using the browser API
        apiCall();
    });
    
    return (
        <div>
            <NavBar></NavBar>
        </div>
    );
};

export default Faq;