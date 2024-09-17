import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
            <div style={{marginTop: '26px'}}>
                No results.
            </div>
        );
    }
    
    return (
        <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
            <Table>
                {
                    // Adjust column widths here
                }
                <colgroup>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'8%'}}/>
                    <col style={{width:'24%'}}/>
                    <col style={{width:'8%'}}/>
                    <col style={{width:'24%'}}/>
                    <col style={{width:'8%'}}/>
                    <col style={{width:'8%'}}/>
                </colgroup>
                {
                    // This is where columns are defined,
                    // For every column here, in the data section put a matching cell in each row
                }
                <TableHead>
                    <TableRow key="headerRow">
                        <TableCell  align='center'>
                            Date
                        </TableCell>
                        <TableCell  align='center'>
                            Character
                        </TableCell>
                        <TableCell  align='center'>
                            Player 1
                        </TableCell>
                        <TableCell  align='center'>
                            Character
                        </TableCell>
                        <TableCell  align='center'>
                            Player 2
                        </TableCell>
                        <TableCell  align='center'>
                            Winner
                        </TableCell>
                        <TableCell  align='center'>
                            Replay
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.Items.map(e => {
                        const replayUrl = `https://${data.bucket}.frameone.net/${e.gameID}.ggr`;
                        const p1Char = CharacterList[e.p1Character - 1];
                        const p2Char = CharacterList[e.p2Character - 1];
                        let date = new Date(e.date.slice(0, -1));
                        let formattedDate = e.date.split('.')[0].split('T').join(' ');
                        return (
                            <TableRow key={e.gameID}>
                                <TableCell  align='center'>
                                    {formattedDate.substring(0, formattedDate.length - 3)}
                                </TableCell>
                                <TableCell  align='center'>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div>
                                            <img src={p1Char.imgUrl} />
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            {p1Char.label}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell  align='center'>
                                    {e.p1Name}
                                </TableCell>
                                <TableCell  align='center'>
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <div>
                                            <img src={p2Char.imgUrl} />
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            {p2Char.label}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell  align='center'>
                                    {e.p2Name}
                                </TableCell>
                                <TableCell  align='center'>
                                    Player {e.winner}
                                </TableCell>
                                <TableCell  align='center'>
                                    <Link href={replayUrl}>
                                        <DownloadIcon  sx={{ width: 40, height: 40, paddingRight: '30px', paddingLeft: '30px', color: '#222' }} />
                                    </Link>
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export const ItemsList = React.memo(ItemsListComponent, areEqual);