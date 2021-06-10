import React, { Component } from 'react'
import App from './App'
import axios from 'axios'

class EditUser extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: ''
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeAddress = this.handleChangeAddress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let url = window.Laravel.baseUrl + '/rest/detailUser/' + this.props.match.params.id
    axios.get(url)
      .then(response => {
        this.setState(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  handleChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let url = window.Laravel.baseUrl + '/rest/user/' + this.props.match.params.id
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
    }
    axios.post(url, data)
      .then(response => {
        this.props.history.push('/users')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <App>
        <h1>Edit User</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Họ tên</label>
            <input type='text' className='form-control' id='name' placeholder='Name'
              value={this.state.name} onChange={this.handleChangeName} required />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Email'
              value={this.state.email} onChange={this.handleChangeEmail} required />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Số điện thoại</label>
            <input type='text' className='form-control' id='name' placeholder='Name'
              value={this.state.phone} onChange={this.handleChangeName} required />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Địa chỉ</label>
            <input type='text' className='form-control' id='name' placeholder='Name'
              value={this.state.address} onChange={this.handleChangeName} required />
          </div>
          <button type='submit' className='btn btn-primary'>Update User</button>
        </form>
      </App>
    )
  }
}
export default EditUser