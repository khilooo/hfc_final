import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import hfcLogo from '../../assets/hfc_logo.png';
import wednesdayLogo from '../../assets/hfc_wednesday.png';
import fridayLogo from '../../assets/hfc_friday.png';
import './PlayerList.css'
import React, {useEffect, useState} from "react";
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FaRegThumbsUp } from "react-icons/fa";
import PaymentIcon from '@mui/icons-material/Payment';
import Register from "../register/Register";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

enum Days {
    Monday ='Monday',
    Wednesday = 'Wednesday',
    Friday = 'Friday'
}


function PlayerList(props) {
    const groupList = props?.playerData.groupList || [];
    const playerData = props?.playerData || {};
    const [mondayVisability,setMondayVisibility] = useState('visible');
    const [wednesdayVisability,setWednesdayVisability] = useState('visible');
    const [fridayVisability,setFridayVisability] = useState('visible');
    const [selectedDay, setSelectedDay] = useState("monday");
    const [selectedAction, setSelectedAction] = useState("register");

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(
        name: string,
        time: Date,
        score: number,
        position:  'player' | 'goalkeeper'
    ) {
        return { name, time, score, position };
    }

    const rows = [
        createData('Frozen yoghurt', new Date(), 60, 'player' ),
        createData('Frozen yoghurt', new Date(), 60, 'player' ),
        createData('Frozen yoghurt', new Date(), 60, 'player' ),
    ];




    useEffect(() => {
        // Update visibility based on the result of isMondayUser
        setMondayVisibility(setDayVisability(groupList, Days.Monday));
        setWednesdayVisability(setDayVisability(groupList, Days.Wednesday));
        setFridayVisability(setDayVisability(groupList, Days.Friday));
    }, [groupList]);



    return (
        <div>
        <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedDay}
                onChange={(event, selectedDay) => {
                    setSelectedDay(   selectedDay);
                }}
            >
                    <div className="dayStyle" style={{display:  mondayVisability}}>
                        <img src={hfcLogo}  alt="Responsive Image"/>
                        <FormControlLabel value="monday" control={<Radio />} label="Monday" />
                    </div>

                <div className="dayStyle" style={{display:  wednesdayVisability}}>
                    <img src={wednesdayLogo}  alt="Responsive Image" />
                    <FormControlLabel value="wednesday" control={<Radio />} label="Wednesday" />
                </div>
                <div className="dayStyle" style={{display:  fridayVisability}}>
                    <img src={fridayLogo}  alt="Responsive Image"  />
                <FormControlLabel value="friday" control={<Radio />} label="Friday" />
                </div>


            </RadioGroup>
        </FormControl>
            <div style={{display:'flex'}}>
            <Box >
                <BottomNavigation
                    showLabels
                    value={selectedAction}
                    onChange={(event, newSelectedAction) => {
                        setSelectedAction(newSelectedAction);
                    }}
                >
                    <BottomNavigationAction value="register" label="Register" icon={<FaRegThumbsUp />}   style={{ fontSize: '35px' }}/>
                    <BottomNavigationAction value="players" label="Players" icon={<GroupIcon />} />
                    <BottomNavigationAction value="pay" label="Pay" icon={<PaymentIcon />} />


                </BottomNavigation>
            </Box>

                {selectedAction =='register' && <div style={{ flexGrow: 1}}><Register selectedDay ={selectedDay} playerData={playerData}/></div>}
                {selectedAction == 'players' && <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Time</StyledTableCell>
                                <StyledTableCell align="right">score</StyledTableCell>
                                <StyledTableCell align="right">position</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.time.toString()}</StyledTableCell>
                                    <StyledTableCell align="right">{row.score}</StyledTableCell>
                                    <StyledTableCell align="right">{row.position}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}

            </div>

        </div>

    );
}

function setDayVisability(groupList:string[], day:Days) {
    return groupList.some(group => group.toLowerCase().includes(day.toString().toLowerCase())) ? 'flex' : 'none';
}



export default PlayerList;