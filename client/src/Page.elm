module Page exposing (Msg, Page, children, init, update)

import Html exposing (Html)
import Section.Nav as Nav
import Status exposing (Status)
import Url exposing (Url)
import Url.Parser as UP



-- MODEL


type alias Page =
    { status : Status
    , route : Route
    }


type Route
    = NotFound
    | Home


init : Status -> Url -> Page
init status url =
    { status = status
    , route =
        UP.parse parser url
            |> Maybe.withDefault NotFound
    }



-- VIEW


children : List (Html msg)
children =
    [ Nav.view, Board.view, Page.view ]



-- UPDATE


type alias Msg =
    ()


update : Msg -> Page -> ( Page, Cmd Msg )
update _ page =
    ( page, Cmd.none )



-- PARSER


parser : UP.Parser (Route -> a) a
parser =
    UP.oneOf
        [ UP.map Home UP.top
        ]
