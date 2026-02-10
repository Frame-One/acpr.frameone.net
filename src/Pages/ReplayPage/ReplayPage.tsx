import '../../App.css';
import { Button, Checkbox, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField, Link, Box, Paper, Typography, FormControlLabel } from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios';
import { QueryTypes } from './Util/QueryConfig.ts';
import { QueryDetailsInput } from './QueryDetailsInput/QueryDetailsInput.tsx';
import { ItemsList } from './ItemsList/ItemsList.tsx';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const ReplayPage = (props) => {
    // Pre-request state
    const [queryType, setQueryType] = useState('PLAYER');
    const [isTwitchReplay, setIsTwitchReplay] = useState(false);
    const [date, setDate] = useState<string>();
    const [queryParams, setQueryParams] = useState({});

    // Request-related state
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();

    const onClear = () => {
        setData(undefined);
    }

    const onSubmit = async () => {
        if (Object.keys(queryParams).length === 0) {
            return;
        }

        const url = 'https://api.frameone.net/query-acpr';
        const routeKey = QueryTypes[queryType].route;
        const params: any = {...queryParams, routeKey};
        params.Table = isTwitchReplay ? 'spectator-replays' : 'prod-replays';
        if (date && date.length > 0) {
            params.Date = date;
        }

        setIsLoading(true);

        const result = await axios(
            url, {
                params
            }
        );

        setIsLoading(false);

        result.data.bucket = isTwitchReplay ? 'ggxxacpr-replays-twitch' : 'ggxxacpr-replays';
        setData(result.data);
    }

    const renderData = () => {
        if (data) {
            return (
                <ItemsList data={data} />
            )
        }
    }

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#2d3748', textAlign: 'center' }}>
                Search Replays
            </Typography>

            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: '16px', background: '#f7fafc' }}>
                <div className='section-label'>
                    Select a query type:
                </div>
                <div className='container'>
                    <Select
                        label="Query Type"
                        onChange={(event: SelectChangeEvent) => {
                            setQueryParams({});
                            setQueryType(event.target.value as string);
                        }}
                        value={queryType}
                        fullWidth
                        sx={{
                            borderRadius: '12px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e2e8f0'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea'
                            }
                        }}
                    >
                        {Object.keys(QueryTypes).map(queryType => (
                            <MenuItem key={queryType} value={queryType}>
                                {QueryTypes[queryType].label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div>
                    <QueryDetailsInput config={QueryTypes[queryType].config} queryType={queryType} queryParams={{...queryParams}} setQueryParams={setQueryParams} />
                </div>

                <div className='container'>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isTwitchReplay}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setIsTwitchReplay(event.target.checked);
                                }}
                                sx={{
                                    color: '#667eea',
                                    '&.Mui-checked': {
                                        color: '#667eea'
                                    }
                                }}
                            />
                        }
                        label={
                            <span>
                                Seen on <Link href={'https://twitch.tv/ggxxacpr'} sx={{ color: '#667eea', fontWeight: 600 }}>twitch.tv/ggxxacpr</Link>
                            </span>
                        }
                    />
                </div>

                <div className='section-label'>
                    Set date for search (Optional):
                </div>
                <div className='container'>
                    <TextField
                        key="date"
                        type="date"
                        className="input-field"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDate(event.target.value);
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                '& fieldset': {
                                    borderColor: '#e2e8f0'
                                },
                                '&:hover fieldset': {
                                    borderColor: '#667eea'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#667eea'
                                }
                            }
                        }}
                    />
                </div>

                <div className='search-button-container'>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        startIcon={<SearchIcon />}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            px: 4,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6b4295 100%)',
                                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)'
                            }
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={onClear}
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        sx={{
                            borderRadius: '12px',
                            px: 4,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            borderColor: '#e2e8f0',
                            color: '#718096',
                            '&:hover': {
                                borderColor: '#cbd5e0',
                                background: '#f7fafc'
                            }
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </Paper>

            <div className='container spinner-container'>
                {isLoading && <CircularProgress sx={{ color: '#667eea' }} size={48} />}
            </div>

            <div>
                {renderData()}
            </div>
        </Box>
    )
}