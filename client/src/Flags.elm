module Flags exposing (Flags, value)

import Json.Encode as JE



-- TYPE


type Flags
    = Flags JE.Value



-- GETTER


value : Flags -> JE.Value
value flags =
    case flags of
        Flags v ->
            v
