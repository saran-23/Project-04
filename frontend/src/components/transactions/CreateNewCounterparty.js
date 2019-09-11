import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import 'bulma'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import Select from 'react-select'

const customStyles = {
  content: {
    width: '25%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class CreateNewCounterparty extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        transactions: []
      },
      error: '',
      modalIsOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSicCodeChange = this.handleSicCodeChange.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }


  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData })
    console.log(e.target.value)
  }

  handleSicCodeChange(selectedOption) {

    const formData = { ...this.state.formData, sicCodes: (selectedOption || []).map(option => option.value) }
    this.setState({ formData })
  }



  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/counterparties/', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/counterparties/${this.props.match.params.id}/`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  componentDidMount() {
    axios.get('/api/siccodes/')
      .then(res => this.setState({
        sicCodes: res.data.map(option => {
          return {label: option.sicnumber, value: option.id}
        }) }))
  }


  render() {
    console.log(this.state)
    const { selectedOption } = this.state

    return (
      <section className="section">
        {Auth.isAuthenticated() && <button className="button is-primary is-warning" onClick={this.openModal}>Add a new customer</button>}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button className="closeModal is-warning" onClick={this.closeModal}>☓</button>
          <div className="container">

            <form onSubmit={this.handleSubmit}>

              <div className="field">
                <label className="label">Company Name</label>
                <input
                  className="input"
                  name="companyname"
                  placeholder="eg: MUSHY PEAS LTD"
                  value={this.state.formData.companyname}
                  onChange={this.handleChange}
                />
              </div>


              <div className="field amount-field">
                <label className="label">Company Registration Number</label>
                <input
                  className="input"
                  type="field"
                  name="companyregistration"
                  placeholder="eg: A45743928"
                  value={(this.state.formData.companyregistration)}
                  onChange={this.handleChange}
                />
              </div>

              <label className="label">Sic Codes</label>
              <Select
                name="sicCodes"
                value={selectedOption}

                options={this.state.sicCodes}
                isMulti
                onChange={this.handleSicCodeChange}
              />

              <button className="button is-danger">Submit</button>
            </form>

          </div>
        </Modal>

      </section>
    )
  }
}

export default withRouter(CreateNewCounterparty)
