module Page exposing (Msg, Page, children, init, update)

import Html exposing (Html)
import Status exposing (Status)
import Url exposing (Url)
import Url.Parser as UP



-- MODEL


type Page
    = NotFound
    | Home Status


init : Status -> Url -> Page
init status url =
    let
        parser =
            makeParser status
    in
    UP.parse parser url
        |> Maybe.withDefault NotFound



-- VIEW


children : List (Html msg)
children =
    Nav.view :: Board.view :: Page.view



-- UPDATE


type alias Msg =
    ()


update : Msg -> Page -> ( Page, Cmd Msg )
update _ page =
    ( page, Cmd.none )



-- PARSER


makeParser : Status -> UP.Parser (Page -> a) a
makeParser status =
    UP.oneOf
        [ UP.map (Home status) UP.top
        ]
