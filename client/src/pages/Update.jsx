import React from 'react';
import UpdateProfile from '../components/UpdateProfile';
import { useParams } from 'react-router-dom';

function Update() {
  const params = useParams();
  const {id} = params;
  return(<UpdateProfile id={id}/>);
}

export default Update;
