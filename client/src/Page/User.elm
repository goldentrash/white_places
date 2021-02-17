module Page.User exposing (..)

import Skeleton
import Url.Builder as UB


type alias Model =
    { user : String
    , board : String
    , tab : String
    , boardItems : List Skeleton.BoardItem
    , page : Skeleton.Page
    }


init : String -> String -> String -> Maybe String -> ( Model, Cmd msg )
init user board sorting page =
    ( { user = user
      , board = board
      , tab = sorting
      , boardItems = []
      , page = ()
      }
    , Cmd.none
    )


details : Model -> Skeleton.Details
details model =
    let
        ancestors : List Skeleton.NavItem
        ancestors =
            [ { text = "Back to Explore"
              , isCurrent = False
              , url = UB.relative [] [ UB.string "sorting" "latest" ]
              }
            ]

        children : String -> String -> String -> List Skeleton.NavItem
        children user board tab =
            [ { text = "Projects"
              , isCurrent = board == "projects"
              , url = UB.relative [ user, "projects" ] [ UB.string "sorting" tab ]
              }
            ]
    in
    { current = model.user
    , ancestors = ancestors
    , children = children model.user model.board model.tab
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
