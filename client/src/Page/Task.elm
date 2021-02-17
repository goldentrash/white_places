module Page.Task exposing (Model, details, init)

import Skeleton


type alias Model =
    { user : String
    , project : String
    , task : String
    , currBoard : String
    , currTab : String
    , items : List Skeleton.BoardItem
    , anchor : Maybe String
    , page : Skeleton.Page
    }


init : String -> String -> String -> String -> String -> Maybe String -> ( Model, Cmd msg )
init user project task currBoard currTab anchor =
    ( { user = user
      , project = project
      , task = task
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
    { current = model.task
    , ancestors = []
    , children = []
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
