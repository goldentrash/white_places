module Skeleton exposing (BoardItem, BoardTab, Details, NavItem, NavSection, Page, view)

import Browser
import Html exposing (Html)
import Html.Attributes as Attr
import Url.Builder as UB



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


type alias Details =
    { -- nav details
      current : String
    , navSections : List NavSection

    -- board details
    , boardTabs : List BoardTab
    , boardItems : List BoardItem

    -- page details
    -- 어쩌면 여기에 type var을 사용해야 할 수도 있다
    -- 버튼이 존재할 것이기에...
    , page : Page
    }


view : Details -> Browser.Document Never
view details =
    { title = details.current
    , body =
        [ Html.div
            [ Attr.id "app"
            , Attr.class "flex-column-container"
            ]
            [ viewNav details
            , viewBoard details
            , viewPage details
            ]
        ]
    }



-- SIDEBAR


type alias NavItem =
    { text : String, isSelected : Bool, url : String }


type alias NavSection =
    { name : String, items : List NavItem }


viewNav : Details -> Html Never
viewNav { current, navSections } =
    let
        navSection : NavSection -> Html msg
        navSection { name, items } =
            let
                navLink : NavItem -> Html msg
                navLink { text, url, isSelected } =
                    Html.li []
                        [ Html.a
                            [ Attr.href url
                            , Attr.class "nav-item"
                            , Attr.classList [ ( "selected", isSelected ) ]
                            ]
                            [ Html.text text ]
                        ]
            in
            Html.div [ Attr.class "nav-section" ]
                [ Html.span
                    [ Attr.class "nav-section-title"
                    ]
                    [ Html.b [] [ Html.text name ]
                    ]
                , Html.ul [] <| List.map navLink items
                ]

        navBrand : Html msg
        navBrand =
            Html.div [ Attr.id "nav-brand" ]
                [ Html.a
                    [ Attr.href <| UB.absolute [] []
                    ]
                    [ Html.text current
                    ]
                ]

        sections : List (Html msg)
        sections =
            navSections
                |> List.map navSection
    in
    Html.nav
        [ Attr.id "sidebar"
        , Attr.class "flex-column-fixed"
        ]
    <|
        navBrand
            :: sections



-- BOARD


type alias BoardTab =
    { text : String, isSelected : Bool, url : String }


type alias BoardItem =
    { name : String
    , summary : String
    }


viewBoard : Details -> Html Never
viewBoard { boardTabs, boardItems } =
    let
        boardTab : BoardTab -> Html msg
        boardTab { text, isSelected, url } =
            Html.a
                [ Attr.href url
                , Attr.class "board-tab"
                , Attr.classList [ ( "selected", isSelected ) ]
                ]
                [ Html.text text ]

        boardItem : BoardItem -> Html msg
        boardItem { name, summary } =
            Html.div [ Attr.class "board-item flex-board-item" ]
                [ Html.text name
                , Html.br [] []
                , Html.text summary
                ]
    in
    Html.div
        [ Attr.id "board"
        , Attr.class "flex-column-auto flex-board-container"
        ]
        [ Html.div [ Attr.id "tabs" ] <| List.map boardTab boardTabs
        , Html.div [ Attr.id "items" ] <| List.map boardItem boardItems
        ]



-- PAGE


type alias Page =
    ()


viewPage : Details -> Html Never
viewPage _ =
    Html.div
        [ Attr.id "page"
        , Attr.class "flex-column-fixed"
        ]
        []
