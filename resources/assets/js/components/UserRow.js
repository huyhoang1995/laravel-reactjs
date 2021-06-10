import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { camelCase } from 'jquery'
class UserRow extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete(e) {
    e.preventDefault()
    if (!confirm('Are your sure you want to delete this item?')) {
      return false
    }
    let url = window.Laravel.baseUrl + '/rest/user/' + this.props.obj.id
    axios.delete(url)
      .then(response => {
        this.props.deleteRow(this.props.index)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  handleAddress() {
    var nameAddress = this.props.obj.address.replaceAll(" ", "+");
    let urlGoogleMap = "https://www.google.com/maps/place/" + nameAddress + "?hl=vi-VN";
    window.open(urlGoogleMap);
  }
  render() {
    return (
      <tr>
        <td>
          {this.props.index + 1}
        </td>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.email}
        </td>
        <td >
          <button className='address-button' onClick={() => this.handleAddress()}> {this.props.obj.address}</button>
        </td>
        <td>
            <Link className='btn btn-primary btn-circle' to={'/users/edit/' + this.props.obj.id}><i className="fa fa-wrench" aria-hidden="true"></i></Link>
          <button className='btn btn-danger btn-circle' onClick={this.handleDelete}><i className="fa fa-times" aria-hidden="true"></i></button>
        </td>
      </tr>
    )
  }
}
export default UserRow