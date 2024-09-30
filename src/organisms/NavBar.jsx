import React from 'react'
import { RedirectAppFunctions } from '../molecules/LinksAppMolecules'

function NavBar({urls}) {
  return (
    <div className="flex px-4 py-3 w-full">
      {
        urls.map((url, index) => {
          return (
            <RedirectAppFunctions text={url.destination} route={url.link} />
          )
        })
      }
    </div>
  )
}

export default NavBar