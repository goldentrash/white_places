module Page.Profile exposing ()


type alias Model = {
  owner: Owner
  , 
}


urlParser : UP.Parser (Route.Detail -> a) a
urlParser = UP.map Model (UP.string </> Route.boardOptionParser </> UP.string)