module Page.Explore exposing (Model, details, init)

import Api.Object
import Api.Object.Project as Project
import Api.Query as Query
import Graphql.Http
import Graphql.Operation exposing (RootQuery)
import Graphql.SelectionSet as SelectionSet exposing (SelectionSet, with)
import RemoteData exposing (RemoteData)
import Skeleton


type alias Project =
    { title : String
    , summary : String
    }


query : SelectionSet (List Project) RootQuery
query =
    Query.projects project


project : SelectionSet Project Api.Object.Project
project =
    SelectionSet.succeed Project
        |> with Project.title
        |> with Project.summary


getProject : Cmd Msg
getProject =
    query
        |> Graphql.Http.queryRequest "https://test-white-places.netlify.app/.netlify/functions/graphql"
        |> Graphql.Http.send (RemoteData.fromResult >> GetProjects)


type Msg
    = GetProjects (RemoteData (Graphql.Http.Error (List Project)) (List Project))


type alias Model =
    { currTab : String
    , items : List Skeleton.BoardItem
    , anchor : Maybe String
    , page : Skeleton.Page
    }


init : String -> Maybe String -> ( Model, Cmd Msg )
init currTab anchor =
    ( { currTab = currTab
      , items = []
      , anchor = anchor
      , page = ()
      }
    , getProject
    )


details : Model -> Skeleton.Details
details _ =
    { current = "White Places"
    , navSections = []
    , boardTabs = []
    , boardItems = []
    , page = ()
    }
