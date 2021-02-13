module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html exposing (div)
import Html.Attributes exposing (id)
import Json.Encode as JE
import Page exposing (Page)
import Status
import Url exposing (Url)



-- MAIN


main : Program JE.Value Model Msg
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


init : JE.Value -> Url -> Nav.Key -> ( Model, Cmd Msg )
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
view model =
    { title = "White Places"
    , body =
        [ div [ id "app" ] (Page.children model.page PageMsg)
        ]
    }



-- UPDATE


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | PageMsg Page.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked _ ->
            ( model, Cmd.none )

        UrlChanged _ ->
            ( model, Cmd.none )

        PageMsg pageMsg ->
            Page.update pageMsg PageMsg model.page (Model model.navKey)



-- SUBSCRIPTION


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
