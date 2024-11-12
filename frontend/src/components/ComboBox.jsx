import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';


const options = [
    { label: 'Past 6 Months', id: 1 },
    { label: 'Past 3 Months', id: 2 },
    { label: 'Past 2 Months', id: 3 },
    { label: 'Past 1 Month', id: 4 },
    { label: 'Past 20 Days', id: 5 },
    { label: 'Past Half a Month', id: 6 },
    { label: 'Past 10 Days', id: 7 },
    { label: 'Past 5 Days', id: 8 }
];


function ComboBox({ getLabelId }) {
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    return (
        <Box sx={{ pb: { xs: 3, sm: 5, md: 8, lg: 8 } }}>
            <h2>Choose timeline for history records</h2>

            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        getLabelId(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="From" />}
                />
            </Stack>
        </Box>

    );
}

export default ComboBox;