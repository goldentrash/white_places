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



{-
   nav와 board는 각 페이지에 고유하다
   물론, 유저와 프로젝트에서 오피니언과 테스크가 겹치긴 하나
   그 부분을 제외하면 모든 보드는 페이지에 고유하다
   또한 겹치는 이 부분도, 추후 얼마든지 변경될수 잇다


   그러하면, 겹치는 유일한 부분은 페이지가 된다
   이 페이지는 서버로부터 받아온 상세 페이지이며,
   데이터를 출력, 혹은 수정하는 부분이기 때문에,
   페이지와 보드에 자유롭다
   그 어떤 데이터라도 존재할수 있는 것이다
   그렇다면, 인포를 구성하는것은 이곳 혹은 다른 모듈이 되어야 할 것이다

-}


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
        , Html.div [ Attr.id "items" ] <| List.map boardItem boardItems
        ]


viewPage : Page -> Html msg
viewPage _ =
    Html.div [ Attr.id "page" ] []
