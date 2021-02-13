module Page exposing (Msg, Page, children, init, update)

import Html exposing (Html, div, text)
import Status exposing (Status)
import Url exposing (Url)
import Url.Parser as UP
import Username



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


children : Page -> (Msg -> rootMsg) -> List (Html rootMsg)
children page toRootMsg =
    [ viewNav page, viewBoard page, viewInfo ]
        |> List.map (Html.map toRootMsg)


viewNav : Page -> Html Msg
viewNav { status, route } =
    case route of
        NotFound ->
            div [] [ text "Not Found Nav" ]

        Home ->
            case Status.maybeUsername status of
                Nothing ->
                    div [] [ text "Login?" ]

                Just username ->
                    div [] [ text (Username.toString username ++ "'s Profile") ]


viewBoard : Page -> Html Msg
viewBoard { route } =
    case route of
        NotFound ->
            div [] [ text "NOT FOUND!" ]

        Home ->
            div [] [ text "On Develop" ]


viewInfo : Html Msg
viewInfo =
    div [] [ text "I think I need new Type like \"Target\"" ]



-- UPDATE


type alias Msg =
    ()


update : Msg -> (Msg -> rootMsg) -> Page -> (Page -> rootModel) -> ( rootModel, Cmd rootMsg )
update msg toRootMsg page toRootModel =
    case msg of
        () ->
            ( toRootModel page, Cmd.map toRootMsg Cmd.none )



-- PARSER


parser : UP.Parser (Route -> a) a
parser =
    UP.oneOf
        [ UP.map Home UP.top
        ]
