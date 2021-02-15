module Route exposing (Msg, Page, fromUrl, update, view)

import Html exposing (Attribute, Html, div, text)
import Html.Attributes exposing (class, id)
import Session exposing (Session)
import Url exposing (Url)
import Url.Parser as UP
import Name
import Html exposing (a)



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
        li [ onclick Login ] [ text "Login" ] -- or about me (view overview. and give btn to go my page or log out)
        li [ onclick Help ] [ text "Help" ]
    ]
    hr [] []
    ul [] [
        li [ class (isActiv url) ] [ a "Projects" ]
    ]
]


viewNav = div [ id "userpage_nav" ][
    ul [] [
        li [] [ a "go back Explore" ]
        li [ onclick Login ] [ text "Login" ] -- or about me. if user === person. this menu will be disappear
        li [ onclick Help ] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [ onclick AboutUser ] [ b "about user" ]
        li [ class (isActiv url) ] [ a "followers" ]
        li [ class (isActiv url) ] [ a "followings" ]
        li [ class (isActiv url) ] [ a "Projects" ]
        li [ class (isActiv url) ] [ a "Opinions" ]
        li [ class (isActiv url) ] [ a "Tasks" ]
        li [ class (isActiv url) ] [ a "Comments" ] -- comments의 내용은 Card안에 다 들어가도록 강제 (글자수 제한). 
    ] --그래서 comments를 선택했을 땐, 옆 정보창에 어떤 "프로젝트"의 어떤 "오피니언"에 "누가" 남겼는지를 표시 ("like/dislike")
]

viewNav = div [ id "project_nav" ][
    ul [] [
        li [] [ a "go back explore" ]
        li [ onclick Login ] [ text "Login" ] -- or about me.
        li [ onclick Help ] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [ onclick AboutProject ] [ b "about project" ]
        li [ class (isActiv url) ] [ a "announcement" ]
        li [ class (isActiv url) ] [ a "opinion" ] -- opinion클릭 시 옆 정보창엔 간단하게 표시.
        li [ class (isActiv url) ] [ a "task" ] -- "내용", "누가", "좋아요 수", "댓글 수"
        li [ class (isActiv url) ] [ a "contiributors" ]
    ]
]

viewNav = div [ id "opinion_nav" ] [
    ul [] [
        li [] [ a "go back project" ]
        li [ onclick Login ] [ text "Login" ] -- or about me.
        li [ onclick Help ] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [ onclick AboutOpinion ] [ b "about opinion" ]
        li [ class (isActiv url) ] [ a "comments" ]
    ]
]

viewNav = div [ id "task_nav" ] [
    ul [] [
        li [] [ a "go back project" ]
        li [ onclick Login ] [ text "Login" ] -- or about me.
        li [ onclick Help ] [ text "help" ]
    ]
    hr [] []
    ul [] [
        li [ onclick AboutTask ] [ b "about tasks" ]
        li [ class (isActiv url) ] [ a "comments" ]
        li [ class (isActiv url) ] [ a "workers" ]
        li [ class (isActiv url) ] [ a "wating PRs" ]
    ]
]

-- UPDATE


type Msg 
    = Login
    | Help
    | AboutUser
    | AboutProject
    | AboutOpinion
    | AboutTask


update : Msg  -> Detail -> ( Detail, Cmd Msg )
update msg detail =
    case msg of
        Login -> ( {detail | info = loginoption }, Cmd.none )
        Help -> ( {detail | info = helpinfo }, Cmd.none )
        AboutUser -> ( {detail | info = userloading}, getUserInfo )
        AboutProject -> ( {detail | info = projectloading}, getProjectInfo)



-- PARSER


urlParser : UP.Parser (Route -> a) a
urlParser =
    UP.oneOf
        [ UP.map Home UP.top
        ]
