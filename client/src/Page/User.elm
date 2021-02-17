module Page.User exposing (Model, details, init)

import Skeleton
import Url.Builder as UB


type alias Model =
    { user : String
    , currBoard : String
    , currTab : String
    , items : List Skeleton.BoardItem
    , anchor : Maybe String
    , page : Skeleton.Page
    }


init : String -> String -> String -> Maybe String -> ( Model, Cmd msg )
init user currBoard currTab anchor =
    ( { user = user
      , currBoard = currBoard
      , currTab = currTab
      , items = []
      , anchor = anchor
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
              , isSelected = False
              , url = UB.relative [] [ UB.string "sorting" "latest" ]
              }
            ]

        children : Model -> List Skeleton.NavItem
        children { user, currBoard, currTab } =
            [ { text = "Projects"
              , isSelected = currBoard == "projects"
              , url = UB.relative [ user, "projects" ] [ UB.string "sorting" currTab ]
              }
            ]
    in
    { current = model.user
    , ancestors = ancestors
    , children = children model
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
