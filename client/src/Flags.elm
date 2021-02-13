module Flags exposing (Flags, toValue)

import Json.Encode as JE



-- TYPE


type Flags
    = Flags JE.Value



-- GETTER


toValue : Flags -> JE.Value
toValue (Flags value) =
    value
