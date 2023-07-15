import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../Actions';
import { supabase } from '../services/supabase_api';
import { Button, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const homeUrl = process.env.PUBLIC_URL;

const Navigation = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const user = useSelector((state) => state.user)
  const username = user?.user?.user_metadata?.username;
  const gender = user?.user?.user_metadata?.gender;
  
  
  const handleLogout = async (event) => {
    const { data,error } = await supabase.auth.signOut(
      dispatch(updateSession(null)),
      navigate(`${homeUrl}/login`),
    );
    if (error) {
      console.log(error.message);
    }
  };

  console.log(username)


  return (
  <>
    <div>{user && <Button onClick={handleLogout}>ログアウト</Button>}</div>
    {username && <div>{username}</div>}
    {gender && <div>{gender}</div>}
  </>
  )
}

export default Navigation