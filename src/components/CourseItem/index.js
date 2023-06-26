import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseItems} = props
  const {id, logoUrl, name} = courseItems

  return (
    <Link className="anchor-link" to={`/courses/${id}`}>
      <li className="courseItemCard">
        <img src={logoUrl} alt={name} className="logoUrl" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
