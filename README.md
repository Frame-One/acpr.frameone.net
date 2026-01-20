# FAQs
#### What is this site?
This is a website that can access a large repository of Guilty Gear XX Accent Core +R replay files.

#### What replays?
Anyone is free to upload their own replays. To do this, use the Upload tab and submit a zip file of your .ggr replay files. In addition to this, any matches viewed on [twitch.tv/ggxxacpr](https://twitch.tv/ggxxacpr) are added to this database as well.

#### Why can't I find [this] replay?
The match is either viewed as invalid by the process that extracts the metadata from the file and discarded, or the search did not match. Replays from before December 2021 will need to be rewatched in full to generate valid metadata.

Matches that are incomplete, team matches, or spectated matches will not be processed.

In addtion, some names that use characters that are not able to be properly encoded/decoded in UTF-8 are replaced with "�". You can still search via steamID or by inserting that character where a non UTF-8 character is present. If you believe there is a mistake in the name encoding let me know [on Twitter](https://twitter.com/prspekt).

#### Why does it only return a fixed amount of matches?
To keep things fast and orderly, queries return 100-200 matches depending on query type. If you feel you're having a hard time finding a particular match because of this, let me know [on Twitter](https://twitter.com/prspekt).

#### That was very nice of you to make this.
Thank you, I thought it would be cool.

#### Why is it broken?
Something went wrong, I will fix it when I can, sorry. Feel free to let me know [on Twitter](https://twitter.com/prspekt).

#### Can I support you for doing this?
This actually is a very cost efficient website. If you're still inclinded to offer support a follow is fine.

#### Who are you?
[twitch.tv/prospekt](https://twitch.tv/prospekt)

[@prspekt on Twitter](https://twitter.com/prspekt)

[prospekt on YouTube](https://www.youtube.com/channel/UCCO_DP32pnyS5ZTJZISJGgA)

# Query Types
### All query types can use the date and "seen on ggxxacpr" parameters.

#### Player
returns all matches by a particular player using their steam name at the time of the match.

#### Player Character
returns all matches by a particular player playing a particular character using their steam name at the time of the match.

#### Matchup
returns all matches played by one character vs another character.

#### PlayerSteamID Character
returns all matches player by a particular player playing a particular character using their [steamID64 in decimal format](https://www.steamidfinder.com/) at the time of the match. This is useful for players that change their name frequently.

#### Player Character vs Character
returns all matches by a particular player playing a particular character against a particular character using their steam name at the time of the match.

#### PlayerSteamID Character vs Character
returns all matches by a particular player playing a particular character against a particular character using their [steamID64 in decimal format](https://www.steamidfinder.com/) at the time of the match. This is useful for players that change their name frequently.

#### Player vs Character
returns all matches by a particular player playing against a particular character using their steam name at the time of the match.

#### PlayerSteamID vs Character
returns all matches by a particular player playing against a particular character using their [steamID64 in decimal format](https://www.steamidfinder.com/) at the time of the match. This is useful for players that change their name frequently.

#### Player vs Player
returns all matches by a particular player playing against a particular player using their steam names at the time of the match.

#### Player Character vs Player Character
returns all matches by a particular player playing against a particular player using particular characters using their steam names at the time of the match.

#### PlayerSteamID Character vs PlayerSteamID Character
returns all matches by a particular player playing against a particular player using particular characters using their [steamID64 in decimal format](https://www.steamidfinder.com/) at the time of the match. This is useful for players that change their name frequently.

# Working with api.frameone.net directly
There are three endpoints available to interact with this service.

### api.frameone.net/upload-zip
A GET request generates an [S3 Presigned POST](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html) that can be used to upload .zip files for bulk replay processing.

### api.frameone.net/upload-ggr
A GET request generates an [S3 Presigned POST](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html) that can be used to upload an individual .ggr file for processing. Please do not use this unless you have a workflow that requires it.

## api.frameone.net/query-acpr
A GET request to this endpoint will return an object containing items returned from the requested query type and parameters. All parameters are passed as strings.

### Parameters

Table: the database table to read from, accepted values are "replays" and "spectator-replays". User submitted replays are on the "replays" table and matches played on [twitch.tv/ggxxacpr](https://twitch.tv/ggxxacpr) are on the "spectator-replays" table.

Date: if specified will return items from the declared date and previous. ISO8601 format, UTC.

gameID: a hash used to prevent duplicate match uploads

p1Name: the steam name of player 1

p1SteamID: the [steamID64 in decimal format](https://www.steamidfinder.com/) of player 1

p1Character: the character abbrviation of player 1 (SO,KY,SL,PO)

p2Name: the steam name of player 2

p2SteamID: the [steamID64 in decimal format](https://www.steamidfinder.com/) of player 2

p2Character: the character abbriviation of player 2 (SO,KY,SL,PO)

routeKey: Query type



### routeKeys and their accepted parameters

Game: Table, gameID

Matchup: p1Character, p2Character

Player: p1Name

PlayerCharacter: p1Name, p1Character

PlayerSIDCharacter: p1SteamID, p1Character

PlayerCharacterVsCharacter: p1Name, p1Character, p2Character

PlayerSIDCharacterVsCharacter: p1SteamID, p1Character, p2Character

PlayerVsCharacter: p1Name, p2Character

PlayerSteamIDVsCharacter: p1SteamID, p2Character

PlayerVsPlayer: p1Name, p2Name

PlayerCharacterVsPlayerCharacter: p1Name, p1Character, p2Name, p2Character

PlayerSIDCharacterVsPlayerSIDCharacter: p1SteamID, p1Character, p2SteamID, p2Character

### Example
A GET to https://api.frameone.net/query-acpr?routeKey=Matchup&Table=replays&p1Character=SO&p2Character=KY&Date=2022-05-10 will return matches played between Sol and Ky from May 5th 2022 and back from the user submitted table. While it appears that this would only returns matches where Sol was player 1 and Ky was player 2, this, and every query using some form of p1/p2, also returns their inverse.
