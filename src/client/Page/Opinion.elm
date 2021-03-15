module Page.Opinion exposing (Model, details, init)

import Skeleton


type alias Model =
    { user : String
    , project : String
    , opinion : String
    , currBoard : String
    , currTab : String
    , items : List Skeleton.BoardItem
    , anchor : Maybe String
    , page : Skeleton.Page
    }


init : String -> String -> String -> String -> String -> Maybe String -> ( Model, Cmd msg )
init user project opinion currBoard currTab anchor =
    ( { user = user
      , project = project
      , opinion = opinion
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
    { current = model.opinion
    , navSections = []
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
