import React, { useEffect } from 'react';

const NodeRedRedirect = () => {
    useEffect(() => {
        window.location.href = "http://localhost:3002/red/";
    }, []);

    return null; // O un loading spinner, si prefieres
};

export default NodeRedRedirect;

