import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import axios from 'axios';


function PlayerRegisterList ({ isClicked })  {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRegisteredPlayers = async () => {
            try {
                const data = await getRegisteredPlayers();
                const rowsData = data.map((player, index) => ({
                    id: index + 1,
                    playerName: player.name,
                    date: formatTime(player.date),
                    score: player.score,
                }));
                setRows(rowsData);
            } catch (err) {
                console.log("Error in getting registered players: " + err);
            } finally {
                setLoading(false); // Set loading to false after data fetching is complete
            }
        };

        fetchRegisteredPlayers();
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'dataGridRows') {
                const rowsData = localStorage.getItem('dataGridRows');
                if (rowsData) {
                    setRows(JSON.parse(rowsData));
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);

    }, [isClicked]);

    const getRegisteredPlayers = async () =>{
        try {
            const registeredPlayers = await axios.get('http://localhost:8081/getAllRegistered', {params: {
                date: new Date().toISOString()
            }});
            return registeredPlayers?.data;
        } catch(err) {
                console.log("Error in getting reigistered players"  + err)
            }

    }

    // console.log("PlayerRegisterList component rendered")
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Rate', width: 70 },
        { field: 'playerName', headerName: 'Player name', width: 130 },
        { field: 'date', headerName: 'Register Time', width: 130 },
        {
            field: 'score',
            headerName: 'Score',
            type: 'number',
            width: 90,
        }

    ];
    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[20, 30]}
        />
    )
}

function formatTime(dateString: string): string {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Extract hours, minutes, and milliseconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();

    // Format the time as "HH:MM:SS.mmm"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}:${milliseconds.toString().padStart(3, '0')}`;

    return formattedTime;
}
export default PlayerRegisterList;