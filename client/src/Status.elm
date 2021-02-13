module Status exposing (Status, init, maybeUsername)

import Flags exposing (Flags)
import Json.Decode as JD
import Json.Decode.Pipeline as JDP
import Username exposing (Username)



-- MODEL


type Status
    = Login Username JWT
    | Logout


type JWT
    = JWT String


init : Flags -> Status
init flags =
    JD.decodeValue decoder (Flags.toValue flags)
        |> Result.withDefault Logout



-- GETTER


maybeUsername : Status -> Maybe Username
maybeUsername status =
    case status of
        Login username _ ->
            Just username

        Logout ->
            Nothing



-- DECODER


decoder : JD.Decoder Status
decoder =
    JD.oneOf [ loginDecoder, logoutDecoder ]


loginDecoder : JD.Decoder Status
loginDecoder =
    JD.succeed Login
        |> JDP.required "username" Username.decoder
        |> JDP.required "jwt" jwtDecoder


jwtDecoder : JD.Decoder JWT
jwtDecoder =
    JD.map JWT JD.string


logoutDecoder : JD.Decoder Status
logoutDecoder =
    JD.succeed Logout
