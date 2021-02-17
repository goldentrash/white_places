module Main exposing (Msg, main)

import Browser
import Browser.Navigation as Nav
import Page exposing (Page)
import Skeleton
import Url exposing (Url)


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = LinkClicked
        , onUrlChange = UrlChanged
        }



-- MODEL


type alias Model =
    { navKey : Nav.Key
    , page : Page
    }


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url navKey =
    let
        ( page, cmd ) =
            Page.init url
    in
    ( { navKey = navKey
      , page = page
      }
    , cmd
    )



-- UPDATE


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        _ ->
            ( model, Cmd.none )



-- VIEW


view : Model -> Browser.Document Msg
view { page } =
    Skeleton.view <| Page.details page



-- SUBSCRIPTION


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
