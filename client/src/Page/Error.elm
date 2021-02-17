module Page.Error exposing (details)

import Skeleton
import Url.Builder as UB


details : Skeleton.Details
details =
    { current = "Error!"
    , ancestors =
        [ { text = "Back to Explore"
          , isSelected = False
          , url = UB.relative [] [ UB.string "sorting" "latest" ]
          }
        ]
    , children = []
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
