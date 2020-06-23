import React from 'react';
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
    headers: {}
});