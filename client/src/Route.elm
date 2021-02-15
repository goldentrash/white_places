module Route exposing (Msg, Page, fromUrl, update, view)

import Html exposing (Attribute, Html, div, text)
import Html.Attributes exposing (class, id)
import Session exposing (Session)
import Url exposing (Url)
import Url.Parser as UP
import Name



-- MODEL
{-
   Project, User(Profile), Opinion, Task, Announcement는 가장 중요한 분류이다
   이들은 각각 Card 안에 간소화된 형태로도 표현될 것이고, Info에서 자세한 정보도 확인이 가능해야 한다
   Board는 저 중 하나를 출력할 것이며, Info도 저 중 하나 혹은 Login과 같은 Option 또는
   Overview를 출력하게 된다

   URL을 파싱해서 Nav를 표시하는 일은 간단하다
   URL을 파싱해서 Board를 표시할수도 있다.
   Info는 Msg의 Payload를 활용할 수 있다.
-}



type Route
    = NotFound
    | Explore Page.Explore.Model
    | Profile Page.Profile.Model
    | Project Page.Project.Model



fromUrl : Url -> Route
fromUrl url =
    UP.parse parser url
        |> Maybe.withDefault NotFound


parser = 
    UP.oneOf [
        UP.map Explore exploreParser
        , UP.map Profile profileParser
        , UP.map Project projectParser
        , UP.map NotFound UP.top
    ]


-- VIEW

type alias Detail =
  { owner : Owner
  , project : Maybe Project
  , kind : Maybe Kind
  , boardOption : BoardOption
  , target : Target}

type Owner 
    = IsUser User
    | IsOther Person

type alias BoardOption
    { sort: Sort
    , kind: Kind}

type Sort 
 = Popular
 | Newer

type Kind
 = Announcement
 | Opinion
 | Task


 {-
 NotFound는
 Nav는 Login, go Profile, go Home
 Board는 Empty(Blacked)
 Info에 404, URL을 확인해 주세요!
 -}

view : Detail -> Html Msg
view detail =
           div [id "app"] 
           [ viewNav deatil.navitems
            , viewBoard detail.boardOption 
            , viewInfo detail.info
            ]


viewNav = div [ id "explore_nav" ][
    ul [] [
        li [] [ text "Login" ] -- or about me (view overview. and give btn to go my page or log out)
        li [] [ text "Help" ]
    ]
    hr [] []
    ul [] [
        li [ class (isActiv url) ] [ text "Projects" ]
    ]
]


viewNav = div [ id "userpage_nav" ][
    ul [] [
        li [] [ text "go back Explore" ]
        li [] [ text "Login" ] -- or about me. if user === person. this menu will be disappear
        li [] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [] [ b "about user" ]
        li [ class (isActiv url) ] [ text "followers" ]
        li [ class (isActiv url) ] [ text "followings" ]
        li [ class (isActiv url) ] [ text "Projects" ]
        li [ class (isActiv url) ] [ text "Opinions" ]
        li [ class (isActiv url) ] [ text "Tasks" ]
        li [ class (isActiv url) ] [ text "Comments" ] -- comments의 내용은 Card안에 다 들어가도록 강제 (글자수 제한). 
    ] --그래서 comments를 선택했을 땐, 옆 정보창에 어떤 "프로젝트"의 어떤 "오피니언"에 "누가" 남겼는지를 표시 ("like/dislike")
]

viewNav = div [ id "project_nav" ][
    ul [] [
        li [] [ text "go back explore" ]
        li [] [ text "Login" ] -- or about me.
        li [] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [] [ b "about project" ]
        li [ class (isActiv url) ] [ text "announcement" ]
        li [ class (isActiv url) ] [ text "opinion" ] -- opinion클릭 시 옆 정보창엔 간단하게 표시.
        li [ class (isActiv url) ] [ text "task" ] -- "내용", "누가", "좋아요 수", "댓글 수"
        li [ class (isActiv url) ] [ text "contiributors" ]
    ]
]

viewNav = div [ id "opinion_nav" ] [
    ul [] [
        li [] [ text "go back project" ]
        li [] [ text "Login" ] -- or about me.
        li [] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [] [ b "about opinion" ]
        li [ class (isActiv url) ] [ text "comments" ]
    ]
]

viewNav = div [ id "task_nav" ] [
    ul [] [
        li [] [ text "go back project" ]
        li [] [ text "Login" ] -- or about me.
        li [] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [] [ b "about tasks" ]
        li [ class (isActiv url) ] [ text "comments" ]
        li [ class (isActiv url) ] [ text "workers" ]
        li [ class (isActiv url) ] [ text "wating PRs" ]
    ]
]

-- UPDATE


type alias Msg =
    ()


update : Msg -> (Msg -> rootMsg) -> Page -> (Page -> rootModel) -> ( rootModel, Cmd rootMsg )
update msg toRootMsg page toRootModel =
    case msg of
        () ->
            ( toRootModel page, Cmd.map toRootMsg Cmd.none )



-- PARSER


urlParser : UP.Parser (Route -> a) a
urlParser =
    UP.oneOf
        [ UP.map Home UP.top
        ]
