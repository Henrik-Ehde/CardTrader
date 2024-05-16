import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ReturnButton() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

  return (
      
      <Button variant="secondary" onClick={goBack}> Return</Button>
  );
}

export default ReturnButton;