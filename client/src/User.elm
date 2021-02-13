module User exposing (User)

import Username exposing (Username)



-- TYPE


type User
    = FollowedUser Username
    | UnfollowedUser Username
