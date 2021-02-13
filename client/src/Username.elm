module Username exposing (Username, decoder, toString)

import Json.Decode as JD



-- TYPE


type Username
    = Username String



-- GETTER


toString : Username -> String
toString (Username username) =
    username



-- DECODER


decoder : JD.Decoder Username
decoder =
    JD.map Username JD.string
