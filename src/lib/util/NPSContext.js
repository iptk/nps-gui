import React from 'react'

const NPSCustomContext = React.createContext(null)
const NPSDefaultsContext = React.createContext(null)

const NPSContext = Object.freeze({
  Provider: ({custom, defaults, children}) => (
    <NPSCustomContext.Provider value={custom}>
      <NPSDefaultsContext.Provider value={defaults}>
        {children}
      </NPSDefaultsContext.Provider>
    </NPSCustomContext.Provider>
  ),
  Consumer: ({children}) => (
    <NPSCustomContext.Consumer>
      {custom => (
        <NPSDefaultsContext.Consumer>
          {defaults => (
            children({custom, defaults})
          )}
        </NPSDefaultsContext.Consumer>
      )}
    </NPSCustomContext.Consumer>
  ),
  custom: NPSCustomContext,
  defaults: NPSDefaultsContext
})

export default NPSContext
export {NPSContext, NPSCustomContext, NPSDefaultsContext}
