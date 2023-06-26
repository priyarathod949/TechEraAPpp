import './index.css'

const CourseItemDetails = props => {
  const {courseItemDetails} = props
  const {imageUrl, name, description} = courseItemDetails

  return (
    <li className="courseDetailsCard">
      <div className="courseDetailContainer">
        <img src={imageUrl} alt={name} className="image" />
        <div className="descriptionDetails">
          <h1 className="heading">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default CourseItemDetails
