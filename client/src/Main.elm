module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Dict exposing (update)
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
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        _ ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


type alias Model =
    { navKey : Nav.Key
    , page : Page
    }


type Msg
    = Login
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url navKey =
    let
        ( page, cmd ) =
            Page.init url
    in
    ( { navKey = navKey
      , page = page
      }
    , Cmd.none
    )


view : Model -> Browser.Document Msg
view { page } =
    Skeleton.view <| Page.details page
