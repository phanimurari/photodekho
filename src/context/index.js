import React from 'react'

const LikesContext = React.createContext({
  likesStatusList: [],
  changeLikeStatus: () => {},
})

export default LikesContext
