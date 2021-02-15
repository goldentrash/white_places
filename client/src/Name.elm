module Name exposing (Name, jsonDecoder, toString)

import Json.Decode as JD



-- TYPE


type Name
    = Name String



-- GETTER


toString : Name -> String
toString (Name name) =
    name



-- DECODER


jsonDecoder : JD.Decoder Name
jsonDecoder =
    JD.map Name JD.string
