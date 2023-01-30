import React, {useState} from 'react';
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import {AppBar, Box, Divider, List, ListItem, ListItemButton, ListItemText, Toolbar} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import LoginButton from './../login/LoginButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';

import logo from '../../logo.svg'

const drawerWidth = 240;

const ajaxRequests = {
    async fetchArticles() {
        const baseURL = "http://127.0.0.1:8090"
        const apiPath = "/api/news/articles";
        const requestUrl = baseURL + apiPath;

        const token = sessionStorage.getItem('accessToken');

        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
        const result = await axios.get(requestUrl, {headers: headers});
        return result.data;
    },

    async deleteArticle(articleId) {
        const baseURL = "http://127.0.0.1:8090"
        const apiPath = "/api/news/articles";
        const id = `/${articleId}`;

        const token = sessionStorage.getItem('accessToken');

        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
        return axios.delete(baseURL + apiPath + id, {headers: headers})
    },

    async updateArticle(article) {
        const baseURL = "http://127.0.0.1:8090"
        const apiPath = "/api/news/articles";
        const id = `/${article.articleId}`;

        const token = sessionStorage.getItem('accessToken');

        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
        return axios.put(baseURL + apiPath + id, article, {headers: headers})
    }

}


const user = sessionStorage.getItem('user');
let articles = [];

const Desk = () => {

    const queryClient = useQueryClient();

    const {} = useQuery({
        queryKey: ['savedArticles'],
        queryFn: () => ajaxRequests.fetchArticles(),
        onSuccess: (data) => {
            articles = data;
        }
    });

    const {mutate: deleteArticle} = useMutation({
        mutationFn: (articleId) => {
            return ajaxRequests.deleteArticle(articleId)
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries('fetchArticles')
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const {mutate: updateArticle} = useMutation({
        mutationFn: (article) => {
            return ajaxRequests.updateArticle(article)
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries('fetchArticles')
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const handleClick = () => {
        setOpen(!open);
    };

    const [open, setOpen] = useState(true);

    const listItems = articles.map((article, index) =>
        <>
            <ListItem key={index}>
                <ListItemText primary={article.title}/>
                <IconButton edge="end" onClick={() => {
                    updateArticle(article.id)
                }}>
                    <EditIcon/>
                </IconButton>
                <IconButton edge="end" onClick={() => {
                    deleteArticle(article.id)
                }}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
            <Divider light/>
        </>
    );

    return <>
        <div>
            <AppBar elevation={0} color="inherit" position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar disableGutters={true} sx={{justifyContent: "space-between"}}>
                    <div className="logo">
                        <object className="logo" data={logo}/>
                    </div>
                    {user ? <Box sx={{whiteSpace: 'nowrap'}}>Hallo {sessionStorage.getItem(user)}</Box> :
                        <LoginButton/>}
                </Toolbar>
            </AppBar>
        </div>
        <div className="main" style={{display: 'flex'}}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}>
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        <ListItemButton selected>
                            <ListItemText primary="Saved Articles"/>
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemText primary="Categories"/>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{pl: 4}}>
                                    <ListItemText primary="Category1"/>
                                </ListItemButton>
                                <ListItemButton sx={{pl: 4}}>
                                    <ListItemText primary="Category2"/>
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {(articles.length > 0) &&
                    <List>
                        {listItems}
                    </List>
                }
            </Box>
        </div>
    </>
}

export default Desk;