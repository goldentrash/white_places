module Skeleton exposing (..)

import Browser
import Html exposing (Html)
import Html.Attributes as Attr


type alias Details =
    { current : String
    , ancestors : List NavItem
    , children : List NavItem
    , boardTabs : List BoardTab
    , boardItems : List BoardItem
    , page : Page
    }


type alias NavItem =
    { text : String, isCurrent : Bool, url : String }


type alias BoardTab =
    { text : String, isCurrent : Bool, url : String }


type alias BoardItem =
    ()


type alias Page =
    ()


view : Details -> Browser.Document msg
view details =
    { title = details.current
    , body =
        [ Html.div [ Attr.id "app" ]
            [ viewSidebar details
            , viewBoard details
            , viewPage details.page
            ]
        ]
    }


viewSidebar : Details -> Html msg
viewSidebar { current, ancestors, children } =
    let
        navLink : NavItem -> Html msg
        navLink { text, url, isCurrent } =
            Html.a [ Attr.href url, Attr.classList [ ( "selected", isCurrent ) ] ] [ Html.text text ]
    in
    Html.div [ Attr.id "sidebar" ]
        [ Html.header []
            [ Html.img [ Attr.src "favicon.png" ] []
            , Html.h2 [] [ Html.text current ]
            ]
        , Html.ul [] <|
            {- userpageLink user :: -} List.map navLink ancestors
        , Html.hr
            []
            []
        , Html.ul [] <|
            List.map navLink children
        ]


viewBoard : Details -> Html msg
viewBoard { boardTabs, boardItems } =
    let
        boardTab : BoardTab -> Html msg
        boardTab tab =
            Html.a [ Attr.href tab.url ] [ Html.text tab.text ]

        boardItem : BoardItem -> Html msg
        boardItem _ =
            Html.div [] []
    in
    Html.div [ Attr.id "board" ]
        [ Html.header [] <| List.map boardTab boardTabs
        , Html.div [] <| List.map boardItem boardItems
        ]


viewPage : Page -> Html msg
viewPage _ =
    Html.article [] []
