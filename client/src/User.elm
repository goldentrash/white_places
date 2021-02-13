module User exposing (Name, User, nameDecoder)

import Json.Decode as JD



-- TYPE


type User
    = FollowedUser Name
    | UnfollowedUser Name


type Name
    = Name String



-- DECODER


nameDecoder : JD.Decoder Name
nameDecoder =
    JD.map Name JD.string
