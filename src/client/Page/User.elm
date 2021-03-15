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
        basicNavs : List Skeleton.NavItem
        basicNavs =
            [ { text = "Back to Explore"
              , isSelected = False
              , url = UB.absolute [] []
              }
            ]

        children : Model -> List Skeleton.NavItem
        children { user, currBoard, currTab } =
            [ { text = "Projects"
              , isSelected = currBoard == "projects"
              , url = UB.absolute [ user, "projects" ] [ UB.string "sorting" currTab ]
              }
            , { text = "Followers"
              , isSelected = currBoard == "followers"
              , url = UB.absolute [ user, "followers" ] [ UB.string "sorting" currTab ]
              }
            , { text = "Followings"
              , isSelected = currBoard == "followings"
              , url = UB.absolute [ user, "followings" ] [ UB.string "sorting" currTab ]
              }
            ]
    in
    { current = model.user
    , navSections =
        [ { name = "basics"
          , items = basicNavs
          }
        , { name = "children"
          , items = children model
          }
        ]
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
