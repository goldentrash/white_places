module Session exposing (Session, fromUser, user)

import User exposing (User)



-- MODEL


type Session
    = Login User
    | Logout


fromUser : Maybe User -> Session
fromUser maybeUser =
    case maybeUser of
        Just user -> Login user
        Nothing -> Logout



-- GETTER


user : Session -> Maybe User
user session =
    case session of
        Login user ->
            Just user

        Logout ->
            Nothing

