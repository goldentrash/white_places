module Page.Explore exposing (Model, details, init)

import Skeleton


type alias Model =
    { currTab : String
    , items : List Skeleton.BoardItem
    , anchor : Maybe String
    , page : Skeleton.Page
    }


init : String -> Maybe String -> ( Model, Cmd msg )
init currTab anchor =
    ( { currTab = currTab
      , items = []
      , anchor = anchor
      , page = ()
      }
    , Cmd.none
    )


details : Model -> Skeleton.Details
details _ =
    { current = "White Places"
    , navSections = []
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
