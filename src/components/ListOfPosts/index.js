const ListOfPosts = props => {
  const {postsList, altText} = props

  const renderPostsList = () =>
    postsList.map(post => (
      <li key={post.id}>
        <img src={post.image} alt={altText} />
      </li>
    ))

  return <ul>{renderPostsList()}</ul>
}

export default ListOfPosts
