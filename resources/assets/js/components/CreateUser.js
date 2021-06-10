import React, { Component } from 'react'
import App from './App'
import axios from 'axios'

class CreateUser extends Component {
    constructor(props) {
        super(props)
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
        let url = window.Laravel.baseUrl + '/rest/user'
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
                <h1>Create An User</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' className='form-control' id='name' placeholder='Name'
                            value={this.state.name} onChange={this.handleChangeName} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' className='form-control' id='email' placeholder='Email'
                            value={this.state.email} onChange={this.handleChangeEmail} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>Số điện thoại</label>
                        <input type='text' className='form-control' id='phone' placeholder='Số điện thoại'
                            value={this.state.phone} onChange={this.handleChangePhone} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Địa chỉ</label>
                        <input type='text' className='form-control' id='address' placeholder='Địa chỉ'
                            value={this.state.address} onChange={this.handleChangeAddress} required />
                    </div>

                    <button type='submit' className='btn btn-primary'>Add User</button>
                </form>
            </App>
        )
    }
}
export default CreateUser