import { Avatar, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';
import { CharacterList } from '../Util/CharacterList.ts';

export const ItemsList = (props) => {
    const {data} = props;

    if (data.Items.length === 0) {
        return (
            <div style={{marginTop: '26px'}}>
                No results.
            </div>
        );
    }
    
    return (
        <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
            <Table>
                <colgroup>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'10%'}}/>
                </colgroup>
                {
                    // This is where columns are defined,
                    // For every column here, in the data section put a matching cell in each row
                }
                <TableHead>
                    <TableRow key="headerRow">
                        <TableCell>
                            Player 1
                        </TableCell>
                        <TableCell>
                            Character
                        </TableCell>
                        <TableCell>
                            Player 2
                        </TableCell>
                        <TableCell>
                            Character
                        </TableCell>
                        <TableCell>
                            Replay
                        </TableCell>
                        <TableCell>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.Items.map(e => {
                        const replayUrl = `https://${data.bucket}.s3.amazonaws.com/${e.gameID}.ggr`;
                        const p1Char = CharacterList[e.p1Character - 1];
                        const p2Char = CharacterList[e.p2Character - 1];
                        console.log(e);
                        return (
                            <TableRow key={e.gameID}>
                                <TableCell>
                                    {e.p1Name}
                                </TableCell>
                                <TableCell>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{width: '60px'}}>
                                            <Avatar src={p1Char.imgUrl} sx={{ width: 60, height: 60 }} />
                                        </div>
                                        <div style={{width: '60px', textAlign: 'center'}}>
                                            {p1Char.label}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {e.p2Name}
                                </TableCell>
                                <TableCell>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{width: '60px'}}>
                                            <Avatar src={p2Char.imgUrl} sx={{ width: 60, height: 60 }} />
                                        </div>
                                        <div style={{width: '60px', textAlign: 'center'}}>
                                            {p2Char.label}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Link href={replayUrl}>
                                        <DownloadIcon  sx={{ width: 40, height: 40, paddingRight: '30px', paddingLeft: '30px', color: '#222' }} />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {e.date.split('.')[0]}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}