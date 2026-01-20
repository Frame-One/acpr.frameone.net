import { CharacterList } from './CharacterList.ts';

export const QueryConfig = {
    p1Name: {
        type: 'text',
        field: 'p1Name',
    },
    p1SteamID: {
        type: 'text',
        field: 'p1SteamID',
    },
    p2Name: {
        type: 'text',
        field: 'p2Name',
    },
    p2SteamID: {
        type: 'text',
        field: 'p2SteamID',
    },
    p1Character: {
        type: 'select',
        options: CharacterList,
        field: 'p1Character',
    },
    p2Character: {
        type: 'select',
        options: CharacterList,
        field: 'p2Character',
    },
}

export const QueryTypes = {
    PLAYER: {
        label: 'Player',
        route: 'Player',
        config: [
            {
                details: QueryConfig.p1Name,
                label: 'Player Name'
            }
        ]
    },
    PLAYER_CHARACTER: {
        label: 'Player Character',
        route: 'PlayerCharacter',
        config: [
            {
                details: QueryConfig.p1Name,
                label: 'Player Name'
            },
            {
                details: QueryConfig.p1Character,
                label: 'Player Character'
            }
        ]
    },
    MATCHUP: {
        label: 'Matchup',
        route: 'Matchup',
        config: [
            {
                details: QueryConfig.p1Character,
                label: 'Player 1 Character'
            },
            {
                details: QueryConfig.p2Character,
                label: 'Player 2 Character'
            }
        ]
    },
    PLAYER_SID_CHARACTER: {
        label: 'PlayerSteamID Character',
        route: 'PlayerSIDCharacter',
        config: [
            {
                details: QueryConfig.p1SteamID,
                label: 'Player Steam ID'
            },
            {
                details: QueryConfig.p1Character,
                label: 'Player Character'
            }
        ]
    },
    PLAYER_CHARACTER_VS_CHARACTER: {
        label: 'Player Character Vs Character',
        route: 'PlayerCharacterVsCharacter',
        config: [
            {
                details: QueryConfig.p1Name,
                label: 'Player 1 Name'
            },
            {
                details: QueryConfig.p1Character,
                label: 'Player 1 Character'
            },
            {
                details: QueryConfig.p2Character,
                label: 'Player 2 Character'
            }            
        ]
    },
    PLAYER_SID_CHARACTER_VS_CHARACTER: {
        label: 'PlayerSteamID Character Vs Character',
        route: 'PlayerSIDCharacterVsCharacter',
        config: [
            {
                details: QueryConfig.p1SteamID,
                label: 'Player 1 Steam ID'
            },
            {
                details: QueryConfig.p1Character,
                label: 'Player 1 Character'
            },
            {
                details: QueryConfig.p2Character,
                label: 'Player 2 Character'
            }   
        ]
    },
    PLAYER_VS_CHARACTER: {
        label: 'Player Vs Character',
        route: 'PlayerVsCharacter',
        config: [
            {
                details: QueryConfig.p1Name,
                label: 'Player 1 Name'
            },
            {
                details: QueryConfig.p2Character,
                label: 'Player 2 Character'
            }
        ]
    },
    PLAYER_SID_VS_CHARACTER: {
        label: 'PlayerSteamID Vs Character',
        route: 'PlayerSIDVsCharacter',
        config: [
            {
                details: QueryConfig.p1SteamID,
                label: 'Player 1 Steam ID'
            },
            {
                details: QueryConfig.p2Character,
                label: 'Player 2 Character'
            }
        ]
    },
    PLAYER_VS_PLAYER: {
        label: 'Player Vs Player',
        route: 'PlayerVsPlayer',
        config: [
            {
                details: QueryConfig.p1Name,
                label: 'Player 1 Name'
            },
            {
                details: QueryConfig.p2Name,
                label: 'Player 2 Name'
            }
        ]
    },
    PLAYER_CHARACTER_VS_PLAYER_CHARACTER: {
        label: 'Player Character Vs Player Character',
        route: 'PlayerCharacterVsPlayerCharacter',
        config: [
            {
                details: QueryConfig.p1Name,
                label: 'Player 1 Name'
            },
            {
                details: QueryConfig.p1Character,
                label: 'Player 1 Character'
            },
            {
                details: QueryConfig.p2Name,
                label: 'Player 2 Name'
            },
            {
                details: QueryConfig.p2Character,
                label: 'Player 2 Character'
            }  
        ]
    },
    PLAYER_SID_CHARACTER_VS_PLAYER_SID_CHARACTER: {
        label: 'PlayerSteamID Character Vs PlayerSteamID Character',
        route: 'PlayerSIDCharacterVsPlayerSIDCharacter',
        config: [
            {
                details: QueryConfig.p1SteamID,
                label: 'Player 1 Steam ID'
            },
            {
                details: QueryConfig.p1Character,
                label: 'Player 1 Character'
            },
            {
                details: QueryConfig.p2SteamID,
                label: 'Player 2 Steam ID'
            },
            {
                details: QueryConfig.p2Character,
                label: 'Player 2 Character'
            }  
        ]
    },
}