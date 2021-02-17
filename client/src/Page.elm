module Page exposing (..)

import Page.Error as Error
import Page.Explore as Explore
import Page.Opinion as Opinion
import Page.Project as Project
import Page.Task as Task
import Page.User as User
import Skeleton
import Url exposing (Url)
import Url.Parser as UP exposing ((</>), (<?>))
import Url.Parser.Query as UPQ


type Page
    = Error
    | Explore Explore.Model
    | User User.Model
    | Project Project.Model
    | Opinion Opinion.Model
    | Task Task.Model


details : Page -> Skeleton.Details
details page =
    case page of
        Error ->
            Error.details

        Explore model ->
            Explore.details model

        User model ->
            User.details model

        Project model ->
            Project.details model

        Opinion model ->
            Opinion.details model

        Task model ->
            Task.details model


init : Url -> ( Page, Cmd msg )
init url =
    case UP.parse urlParser url of
        Just ( page, cmd ) ->
            ( page, cmd )

        Nothing ->
            ( Error, Cmd.none )


step : (subModel -> Page) -> ( subModel, Cmd msg ) -> ( Page, Cmd msg )
step toPage ( model, cmd ) =
    ( toPage model, cmd )


urlParser : UP.Parser (( Page, Cmd msg ) -> a) a
urlParser =
    let
        user : UP.Parser (String -> b) b
        user =
            UP.custom "user" Just

        project : UP.Parser (String -> b) b
        project =
            UP.custom "project" Just

        opinion : UP.Parser (String -> b) b
        opinion =
            UP.custom "opinion" Just

        task : UP.Parser (String -> b) b
        task =
            UP.custom "task" Just

        board : UP.Parser (String -> b) b
        board =
            UP.custom "board" Just

        sorting : UPQ.Parser String
        sorting =
            UPQ.map (Maybe.withDefault "latest") <| UPQ.string "sorting"

        page : UP.Parser (Maybe String -> b) b
        page =
            UP.fragment identity
    in
    UP.oneOf
        [ UP.map (step Task) <|
            UP.map Task.init (user </> project </> task </> board <?> sorting </> page)
        , UP.map (step Opinion) <|
            UP.map Opinion.init (user </> project </> opinion </> board <?> sorting </> page)
        , UP.map (step Project) <|
            UP.map Project.init (user </> project </> board <?> sorting </> page)
        , UP.map (step User) <|
            UP.map User.init (user </> board <?> sorting </> page)
        , UP.map (step Explore) <|
            UP.map Explore.init (UP.top </> board <?> sorting </> page)
        ]
