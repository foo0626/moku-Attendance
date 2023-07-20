import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../Actions';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase_api';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const homeUrl = process.env.PUBLIC_URL;

const Navigation = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const user = useSelector((state) => state.user)
  const admin = user?.user?.user_metadata?.admin;
  // const username = user?.user?.user_metadata?.username;
  // const gender = user?.user?.user_metadata?.gender;
  
  
  const handleLogout = async (event) => {
    const { data,error } = await supabase.auth.signOut(
      dispatch(updateSession(null)),
      navigate(`${homeUrl}/login`),
    );
    if (error) {
      console.log(error.message);
    }
  };


  return (
  <>
    {admin && (
        <Menu>
          <MenuButton as={Button} rightIcon={<HamburgerIcon />} variant="outline">
            メニュー
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate(`${homeUrl}/usersetting`)}>
              ユーザー管理
            </MenuItem>
            <MenuItem onClick={() => navigate(`${homeUrl}/practicecalender`)}>
              練習日登録
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    <div>{user && <Button onClick={handleLogout}>ログアウト</Button>}</div>
    {/* {username && <div>{username}</div>}
    {gender && <div>{gender}</div>} */}
  </>
  )
}

export default Navigation