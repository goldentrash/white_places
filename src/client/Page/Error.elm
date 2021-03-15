module Page.Error exposing (details)

import Skeleton
import Url.Builder as UB


details : Skeleton.Details
details =
    let
        basicNavs : List Skeleton.NavItem
        basicNavs =
            [ { text = "Back to Explore"
              , isSelected = False
              , url = UB.absolute [] []
              }
            ]
    in
    { current = "Error!"
    , navSections =
        [ { name = "basics"
          , items = basicNavs
          }
        ]
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
