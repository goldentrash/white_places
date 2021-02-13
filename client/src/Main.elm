module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Flags exposing (Flags)
import Page exposing (Page)
import Status
import Url exposing (Url)



-- MAIN


main : Program Flags Model Msg
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


init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url navKey =
    let
        status =
            Status.init flags
    in
    ( { navKey = navKey
      , page = Page.init status url
      }
    , Cmd.none
    )



-- VIEW


view : Model -> Browser.Document Msg
view _ =
    { title = "White Places"
    , body = Page.children
    }



-- UPDATE


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | PageMsg Page.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlRequest _ ->
            ( model, Cmd.none )

        UrlChange _ ->
            ( model, Cmd.none )

        PageMsg msg ->
            Page.update PageMsg msg model



-- SUBSCRIPTION


subscriptions : () -> Sub Msg
subscriptions _ =
    Sub.none
