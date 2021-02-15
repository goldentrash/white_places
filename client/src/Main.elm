module Main exposing (main)

import Browser
import Browser.Navigation as BN
import Html
import Json.Encode as JE
import Route exposing (Route)
import Session exposing (Status)
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
{-
   고민 끝에 status는 JS LocalStorage를 Subscribe해서
   LocalStorage의 상태에 따라 Msg를 출력하도록 하기로 했다.
   Login과정은 LocalStorage에 유저정보를 저장하고,
   LocalSotrage의 상태가 변함에 따라 수신된 Msg를 바탕으로
   Elm 안에서의 status를 변경하도록 한다
-}


type alias Model =
    { bnKey : BN.Key
    , status : Status
    , route : Route
    }


init : Maybe User -> Url -> BN.Key -> ( Model, Cmd Msg )
init maybeUser url bnKey =
    ( { bnKey = bnKey
      , status = Session.fromUser maybeUser
      , route = Route.fromUrl url
      }
    , Cmd.none
    )



-- VIEW


view : Model -> Browser.Document Msg
view { status, route } =
    { title = "White Places"
    , body =
        [ Route.view status route
            |> Html.map RouteMsg
        ]
    }



-- UPDATE


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | RouteMsg Route.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked _ ->
            ( model, Cmd.none )

        UrlChanged _ ->
            ( model, Cmd.none )

        RouteMsg _ ->
            Route.update pageMsg RouteMsg model.page (Model model.bnKey)



-- SUBSCRIPTION


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
