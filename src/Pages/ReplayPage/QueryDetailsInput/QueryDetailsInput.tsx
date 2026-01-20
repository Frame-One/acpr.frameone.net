import '../../../App.css';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, {useEffect} from 'react';

export const QueryDetailsInput = (props) => {
    const { config, queryType, queryParams, setQueryParams } = props;

    useEffect(() => {
        const newQueryParams = {...queryParams};
        config.forEach(e => {
            if (e.details.type === 'select' && newQueryParams) {
                newQueryParams[e.details.field] = 'SO';
            }
        });

        setQueryParams(newQueryParams);
    }, [config])

    const renderInputs = () => {
        return config.map(e => {
            if (e.details.type === 'text') {
                const textOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newQueryParams = {...queryParams};
                    newQueryParams[e.details.field] = event.target.value
                    setQueryParams(newQueryParams);
                };

                return (
                    <>
                        <div className='section-label'>
                            {e.label}:
                        </div>
                        <div key={e.details.field} className='container'>
                            <TextField
                                key={queryType + e.details.field}
                                value={queryParams[e.details.field] || ''}
                                onChange={textOnChange}
                                className='input-field'
                            />
                        </div>
                    </>
                );
            }

            if (e.details.type === 'select') {
                const getIndexForMatchupQuery = (options, option) => {
                    return options.findIndex(op => op.value === option.value);
                }

                const selectOptions = e.details.options.map(option => (
                    <MenuItem key={option.value} value={queryType === 'Matchup' ?  getIndexForMatchupQuery(e.details.options, option) : option.value}>{option.label}</MenuItem>
                ));
    
                const selectOnChange = (event: SelectChangeEvent) => {
                    const newQueryParams = {...queryParams};
                    newQueryParams[e.details.field] = event.target.value
                    setQueryParams(newQueryParams);
                };

                return (
                    <>
                        <div className='section-label'>
                            {e.label}:
                        </div>
                        <div key={e.details.field} className='container'>
                            <Select
                                key={e.details.field}
                                label={e.label}
                                value={queryParams[e.details.field] || e.details.options[0].value}
                                onChange={selectOnChange}
                                className='input-field'
                            >
                                {selectOptions}
                            </Select>
                        </div>
                    </>
                );
            }

            return null;
        });
    }
    return (
        <div>
            {renderInputs()}
        </div>
    )
}