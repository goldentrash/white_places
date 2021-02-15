module User exposing (User, name, jwt)

import JWT exposing (JWT)
import Name exposing (Name)



-- TYPE


type User = User Name JWT

-- GETTER

name : User -> Name
name (User name _) = name

jwt : User -> JWT
jwt (User _ jwt) = jwt
