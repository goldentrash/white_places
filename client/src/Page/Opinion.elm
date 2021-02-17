module Page.Opinion exposing (..)

import Skeleton
import Url.Builder as UB


type alias Model =
    { user : String
    , project : String
    , opinion : String
    , board : String
    , tab : String
    , boardItems : List Skeleton.BoardItem
    , page : Skeleton.Page
    }


init : String -> String -> String -> String -> String -> Maybe String -> ( Model, Cmd msg )
init user project opinion board sorting targetPage =
    ( { user = user
      , project = project
      , opinion = opinion
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

        children : String -> String -> String -> String -> List Skeleton.NavItem
        children user project board tab =
            [ { text = "Announcement"
              , isCurrent = board == "projects"
              , url = UB.relative [ user, project, "Announcement" ] [ UB.string "sorting" tab ]
              }
            ]
    in
    { current = model.user
    , ancestors = ancestors
    , children = children model.user model.project model.board model.tab
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
