import { Link, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography, IconButton, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';
import { CharacterList } from '../Util/CharacterList.ts';

const areEqual = (prev, next) => {
    let areEqual = true;

    if (next.data.Items.length !== prev.data.Items.length) {
        return false;
    }

    next.data.Items.every((item, index) => {
        if (!prev.data.Items[index] || item.gameID !== prev.data.Items[index].gameID) {
            areEqual = false;
            return
        }
    })

    return areEqual;
}

const ItemsListComponent = (props) => {
    const {data} = props;

    if (data.Items.length === 0) {
        return (
            <Box sx={{
                mt: 6,
                p: 6,
                textAlign: 'center',
                background: '#f7fafc',
                borderRadius: '16px'
            }}>
                <Typography variant="h6" sx={{ color: '#718096' }}>
                    No results found. Try adjusting your search criteria.
                </Typography>
            </Box>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0'
            }}
        >
            <Table>
                {
                    // Adjust column widths here
                }
                <colgroup>
                    <col style={{width:'18%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'23%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'23%'}}/>
                    <col style={{width:'8%'}}/>
                    <col style={{width:'8%'}}/>
                </colgroup>
                {
                    // This is where columns are defined,
                    // For every column here, in the data section put a matching cell in each row
                }
                <TableHead>
                    <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <TableCell align='center' sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                            Date
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                            Character
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                            Player 1
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                            Character
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                            Player 2
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                            Winner
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                            Replay
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.Items.map((e, index) => {
                        const replayUrl = `https://${data.bucket}.frameone.net/${e.gameID}.ggr`;
                        const p1Char = CharacterList[e.p1Character - 1];
                        const p2Char = CharacterList[e.p2Character - 1];
                        let date = new Date(e.date.slice(0, -1));
                        let formattedDate = e.date.split('.')[0].split('T').join(' ');
                        return (
                            <TableRow
                                key={e.gameID}
                                sx={{
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: '#f7fafc',
                                    },
                                    '&:hover': {
                                        backgroundColor: '#edf2f7',
                                        transition: 'background-color 0.2s ease'
                                    }
                                }}
                            >
                                <TableCell align='center' sx={{ fontWeight: 500, color: '#4a5568', fontSize: '0.9rem' }}>
                                    {formattedDate.substring(0, formattedDate.length - 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                        <Box>
                                            <img src={p1Char.imgUrl} style={{ maxWidth: '50px', height: 'auto' }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#2d3748' }}>
                                            {p1Char.label}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align='center' sx={{ fontWeight: 600, color: '#2d3748' }}>
                                    {e.p1Name}
                                </TableCell>
                                <TableCell align='center'>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                        <Box>
                                            <img src={p2Char.imgUrl} style={{ maxWidth: '50px', height: 'auto' }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#2d3748' }}>
                                            {p2Char.label}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align='center' sx={{ fontWeight: 600, color: '#2d3748' }}>
                                    {e.p2Name}
                                </TableCell>
                                <TableCell align='center'>
                                    <Chip
                                        label={`P${e.winner}`}
                                        size="small"
                                        sx={{
                                            background: e.winner === 1
                                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                            color: '#fff',
                                            fontWeight: 700,
                                            fontSize: '0.8rem'
                                        }}
                                    />
                                </TableCell>
                                <TableCell align='center'>
                                    <IconButton
                                        component={Link}
                                        href={replayUrl}
                                        sx={{
                                            color: '#667eea',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                color: '#764ba2',
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    >
                                        <DownloadIcon sx={{ width: 28, height: 28 }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}

export const ItemsList = React.memo(ItemsListComponent, areEqual);