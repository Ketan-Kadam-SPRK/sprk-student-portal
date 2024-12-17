import React from 'react'
import { Routes  ,Route} from 'react-router-dom'
import Dashboard from '../components/Dashboard/Dashboard'

function RoutesConfig() {
  return (
    <Routes>
    {/* <Route
      path="/*"
      element={
        mainTabName?.length > 0 ? (
          <Navigate to={capitalizedTabNames[0]} />
        ) : (
          <Navigate to="" />
        )
      }
    /> */}
    {/* <Route path="/" state={{ from: location }} replace /> */}
    <Route path="Dashboard" element={<Dashboard />} />
  </Routes>
  )
}

export default RoutesConfig