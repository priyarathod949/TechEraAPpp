import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseList: []}

  componentDidMount() {
    this.getCourses()
  }

  onClickRetry = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="errorContainer">
      <img
        className="errorImg"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="errorHeading">Oops! Something Went Wrong</h1>
      <p className="errorInfo">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="errorRetryButton"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCoursesView = () => {
    const {courseList} = this.state
    return (
      <div className="courseListContainer">
        <h1 className="heading">Courses</h1>
        <ul className="courseItemList">
          {courseList.map(each => (
            <CourseItem key={each.id} courseItems={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderCourseList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgContainer">
        <Header />
        {this.renderCourseList()}
      </div>
    )
  }
}

export default Home
