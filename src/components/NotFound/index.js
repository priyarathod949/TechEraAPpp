import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div>
    <Header />
    <div className="NotFoundContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notFoundImage"
      />
      <h1 className="notFoundHeading">Page Not Found</h1>
      <p className="notFoundInfo">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
