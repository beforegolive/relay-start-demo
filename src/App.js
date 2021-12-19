// your-app-name/src/App.js
import React from 'react'
import './App.css'
// import fetchGraphQL from './fetchGraphQL'
import graphql from 'babel-plugin-relay/macro'
import { RelayEnvironmentProvider, loadQuery, usePreloadedQuery } from 'react-relay/hooks'
import RelayEnvironment from './RelayEnvironment'

const { Suspense } = React
const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {})

function App(props) {
  const data = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery)
  return (
    <div className="App">
      <header className="App-header">
        <p>{data.repository.name}</p>
      </header>
    </div>
  )
}

function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery}></App>
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot

// const { useState, useEffect } = React

// function App() {
//   // We'll load the name of a repository, initially setting it to null
//   const [name, setName] = useState(null)

//   // When the component mounts we'll fetch a repository name
//   useEffect(() => {
//     let isMounted = true
//     fetchGraphQL(`
//       query RepositoryNameQuery {
//         # feel free to change owner/name here
//         repository(owner: "beforegolive" name: "relay-start-demo") {
//           name
//         }
//       }
//     `)
//       .then((response) => {
//         // Avoid updating state if the component unmounted before the fetch completes
//         if (!isMounted) {
//           return
//         }
//         const data = response.data
//         setName(data.repository.name)
//       })
//       .catch((error) => {
//         console.error(error)
//       })

//     return () => {
//       isMounted = false
//     }
//   }, [])

//   // Render "Loading" until the query completes
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{name != null ? `Repository: ${name}` : 'Loading'}</p>
//       </header>
//     </div>
//   )
// }

// export default App
