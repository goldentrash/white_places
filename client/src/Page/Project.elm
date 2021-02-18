module Page.Project exposing (Model, details, init)

import Skeleton


type alias Model =
    { user : String
    , project : String
    , currBoard : String
    , currTab : String
    , items : List Skeleton.BoardItem
    , anchor : Maybe String
    , page : Skeleton.Page
    }


init : String -> String -> String -> String -> Maybe String -> ( Model, Cmd msg )
init user project currBoard currTab anchor =
    ( { user = user
      , project = project
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
    { current = model.project
    , navSections = []
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
