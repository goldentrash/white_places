module Section.Nav exposing (view)

import Html exposing (Html, div, text)
import Status exposing (Status)
import Username exposing (Username)



-- VIEW


view : Status -> Html msg
view status =
    case Status.maybeUsername status of
        Just username ->
            div []
                [ Username.toString username
                    |> text
                ]

        Nothing ->
            div [] [ text "logout nav" ]
