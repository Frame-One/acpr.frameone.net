import '../../App.css';
import { Button, Checkbox, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField, Link } from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios';
import { QueryTypes } from './Util/QueryConfig.ts';
import { QueryDetailsInput } from './QueryDetailsInput/QueryDetailsInput.tsx';
import { ItemsList } from './ItemsList/ItemsList.tsx';

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
        <div>
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
                <Checkbox 
                    checked={isTwitchReplay} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setIsTwitchReplay(event.target.checked);
                    }} 
                /> Seen on <Link href={'https://twitch.tv/ggxxacpr'}>twitch.tv/ggxxacpr</Link>
            </div>
            <div className='section-label'>
                Set date for search (Optional):
            </div>
            <div className='container'>
                <TextField
                    key="date"
                    type="date"
                    className="input-field"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDate(event.target.value);
                    }}
                />
            </div>
            <div className='search-button-container'>
                <Button onClick={onSubmit}>
                    Search
                </Button>
                <Button onClick={onClear}>
                    Clear
                </Button>
            </div>
            <div className='container spinner-container'>
                {isLoading && <CircularProgress />}
            </div>
            <div>
                {renderData()}
            </div>
        </div>
    )
}