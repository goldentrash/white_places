module Status exposing (Status, init)

import Flags exposing (Flags)
import Json.Decode as JD
import Json.Decode.Pipeline as JDP
import User



-- MODEL


type Status
    = Login User.Name JWT
    | Logout


type JWT
    = JWT String


init : Flags -> Status
init flags =
    JD.decodeValue decoder (Flags.value flags)
        |> Result.withDefault Logout



-- DECODER


decoder : JD.Decoder Status
decoder =
    JD.oneOf [ loginDecoder, logoutDecoder ]


loginDecoder : JD.Decoder Status
loginDecoder =
    JD.succeed Login
        |> JDP.required "username" User.nameDecoder
        |> JDP.required "jwt" jwtDecoder


jwtDecoder : JD.Decoder JWT
jwtDecoder =
    JD.map JWT JD.string


logoutDecoder : JD.Decoder Status
logoutDecoder =
    JD.succeed Logout
