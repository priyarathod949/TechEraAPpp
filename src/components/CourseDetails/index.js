import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItemDetails from '../CourseItemDetails'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseDetailsList: []}

  componentDidMount() {
    this.getCourseDetails()
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const courseUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(courseUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = [data.course_details].map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        courseDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="errorImg"
      />
      <h1 className="errorHeading">Oops! Something Went Wrong</h1>
      <p className="errorInfo">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="errorRetryButton"
        type="button"
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

  renderCourseDetailsView = () => {
    const {courseDetailsList} = this.state

    return (
      <ul className="courseListContainer">
        {courseDetailsList.map(each => (
          <CourseItemDetails key={each.id} courseItemDetails={each} />
        ))}
      </ul>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetailsView()
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
      <>
        <Header />
        {this.renderCourseDetails()}
      </>
    )
  }
}

export default CourseDetails
