module Person exposing (Person)

import Name exposing (Name)



-- TYPE


type Person
    = Followed Name
    | Unfollowed Name
