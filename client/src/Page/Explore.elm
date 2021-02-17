module Page.Explore exposing (..)

import Skeleton
import Url.Builder as UB


type alias Model =
    { board : String
    , tab : String
    , boardItems : List Skeleton.BoardItem
    , page : Skeleton.Page
    }


init : String -> String -> Maybe String -> ( Model, Cmd msg )
init board sorting targetPage =
    ( { board = board
      , tab = sorting
      , boardItems = []
      , page = ()
      }
    , Cmd.none
    )


details : Model -> Skeleton.Details
details model =
    let
        children : String -> String -> List Skeleton.NavItem
        children board tab =
            [ { text = "Projects"
              , isCurrent = board == "projects"
              , url = UB.relative [ "projects" ] [ UB.string "sorting" tab ]
              }
            ]
    in
    { current = "White Places"
    , ancestors = []
    , children = children model.board model.tab
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
