module Main exposing (..)

import Browser
import Html exposing (Html, p, text)
import Html.Attributes exposing (class)



-- MAIN


main : Program () () ()
main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


init : ()
init =
    ()



-- UPDATE


update : () -> () -> ()
update _ _ =
    ()



-- VIEW


view : () -> Html msg
view _ =
    p [ class "colored" ] [ text "hello some text" ]
