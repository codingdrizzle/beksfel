import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const DecodeToken = (token) => {
    try {
        const data = jwtDecode(token);
        return data;
    } catch (error) {
        return error;
    }

}

export default DecodeToken