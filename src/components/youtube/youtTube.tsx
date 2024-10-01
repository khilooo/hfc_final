import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {Button, css} from "@mui/material";
import './youtube.css'
import {useState} from "react";
import axios from 'axios';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import LinkIcon from '@mui/icons-material/Link';





function YouTubeComponent() {
    const [searchText, setSearchText] = useState('');
    const [videoTtiles, setVideoTitles] = useState([]);
    const [videoIds, setVideoIds] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
// [title, url
    const handleSearch = (e) => {
        axios.post('http://localhost:8081/videos',{search:searchText}).then(res => {
            console.log(res);
            const titles = res.data.map(video => video.snippet.title);
            const ids = res.data.map(video => video.id.videoId);
            setVideoTitles(titles);
            setVideoIds(ids);
        }).catch(err => {
            console.log("not found" + err)
        });

    }
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }
    const handleSelectoin = (index: number) => {
        setSelectedIndex(index)
        axios.get('http://localhost:8081/captions', {
            params: {
                videoId: videoIds[index]
            }
        }).then(res => {
            console.log(res);

        }).catch(err => {
            console.log("not found" + err)
        });
    }



    function renderRow() {
        return (
            videoTtiles.map((title, index) => (
                <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={() => handleSelectoin(index)}
                >
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                </ListItemButton>
            ))
        );
    }

    return (
        <>
            <div style={{display:"flex"}} className="mx-auto max-w-2xl px-4">
                <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
                    <h1 className="text-lg font-semibold">Welcome to Socialla AI Chatbot!</h1>
                    <p className="leading-normal text-muted-foreground">This is AI tool build for socialla POC chatbot app poc developed by
                        <a href="https://github.com/yoni-klain/socialla.search.assistant" target="_blank" className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline" >
                            <span>Socialla Team</span>
                        </a>
                        .
                    </p>
                    <p className="leading-normal text-muted-foreground">It uses
                        <a href="https://vercel.com/blog/ai-sdk-3-generative-ui" target="_blank" className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"><span>React Server Components</span><svg aria-hidden="true" height="7" viewBox="0 0 6 6" width="7" className="opacity-70">
                            <path d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z" fill="currentColor"></path></svg>
                         </a> to combine text with UI generated as output of the LLM. The UI state is synced through the SDK so the model is aware of your interactions as they happen.
                    </p>
                </div>
            </div>

                <h2 className="titleSearch"><em>Yoni POC</em></h2>
                <div className="searchBar">
                    <TextField id="outlined-search" label="Search text" type="search"  onChange={handleInputChange} className="textBoxSearch"/>
                    <Button variant="contained" onClick={handleSearch}  endIcon={<SearchIcon />}>
                     Search
                    </Button>
                </div>
            <Box sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders" className="listStyle textBoxSearch">
                    {renderRow()}
                </List>
                <Divider />

            </Box>
            </>
        );


}


export default YouTubeComponent;