import React, { useState } from 'react';
import {AppBar , Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
    const dispath = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const[value, setValue] = useState();
  
    return (
    <AppBar
        position="sticky"
        sx = {{
            background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(29,49,253,1) 50%, rgba(252,176,69,1) 100%)"
        }}>
        <Toolbar>
            <Typography variant="h4">TravelDiaries</Typography>
            {isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
                <Tabs textColor="inherit" value={value} onChange={(e,val)=> setValue(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label ="All Blogs"/>
                    <Tab LinkComponent={Link} to="/myblogs" label ="My Blogs"/>
                    <Tab LinkComponent={Link} to="/blogs/add" label ="Add Blogs"/>
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
                { !isLoggedIn && <><Button LinkComponent={Link} to="/auth" variant = "contained"sx ={{margin: 1 , borderRadius : 10}} color = "warning">
                    Login
                </Button>
                <Button LinkComponent={Link} to="/auth" variant = "contained"sx ={{margin: 1 ,borderRadius: 10}} color = "warning">
                    Sign Up
                </Button></>}
                {isLoggedIn &&  (<Button onClick={() => dispath(authActions.logout())} LinkComponent={Link} to="/auth" variant = "contained"sx ={{margin: 1 ,borderRadius: 10}} color = "warning">
                    Log Out
                </Button>)}
            </Box>
        </Toolbar>
    </AppBar>
  );
}

export default Header