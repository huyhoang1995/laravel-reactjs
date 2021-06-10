import React, { Component } from "react";
import { connect } from 'react-redux';
import { listUser, deleteUser } from '../../actions'
import UserModalComponent from '../form/UserModalComponent';
import Pagination from "react-js-pagination";
import { UserService } from "../../libs/services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getList = this.getList.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    // function
    showModal() {
        $(this.UserModal).modal('show');

    }
    componentWillMount() {
        let params = {
            page: 1,
            status: "",
            freeText: ""
        }
        this.props.renderListUser(params);
    }
    getList() {
        if (this.props.listUser) {
            return this.props.listUser.map((user, index) => {
                return (
                    <div key={index + 1} className="row" >
                        <div className="col-md-12">
                            <div className="input-group mar-btm cat-mar-btm" >
                                <span className="input-group-addon cat-group-addon">
                                    <img id="ava" className="avatar" alt="Avatar"
                                        src="" />
                                </span>

                                <div className=" cat-form-control">
                                    <div >{user.name} <i></i></div>

                                    <div >{user.email}</div>
                                    <div>{user.id}</div>
                                    <br />
                                    <div className="cat-actions">
                                        <a className="ac" href="#">
                                            <i className="fa fa-edit left"></i>&nbsp;&nbsp;Sửa
                                        </a>
                                        <a className="ac" href="#"  >
                                            <i className="fa fa-refresh left"></i>&nbsp;&nbsp;Đặt lại mật khẩu
                                        </a>
                                        <a className="ac text-danger" onClick={() => this.deleteUser(user.id)} >
                                            <i className="fa fa-trash left"></i>&nbsp;&nbsp;Xóa
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    deleteUser(id) {
        this.props.deleteUser(id);
    }

    componentWillReceiveProps(state) {
        $(this.UserModal).modal('hide');
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber,
            freeText: this.refs.freeText.value,
            status: ""
        });

        let params = UserService.data.listUser(pageNumber, 10, this.state.status, this.state.freeText);
        this.props.renderListUser(params);
    }
    handleSearch() {
        this.setState({
            activePage: this.state.activePage,
            freeText: this.refs.freeText.value,
            status: ""
        });
        let freeText = this.refs.freeText.value || "";
        let params = UserService.data.listUser(this.state.activePage, 10, this.state.status, freeText);
        this.props.renderListUser(params);
    }
    render() {
        return (
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <div className="col-md-12" >
                    <div className="row form-group">
                        <div className="col-md-6">
                            <div>
                                <label className="cat-email">Tìm tên, email, sđt</label>
                                <input type="text" className="form-control" ref="freeText" onChange={() => this.handleSearch()} />
                            </div>
                        </div>

                        <div className="col-md-6 form-group"  >
                            <button style={{ float: 'right' }} className="btn btn-primary btn-md" onClick={() => this.showModal()} >
                                <i className="fa fa-plus fa-lg cat-fa-del" aria-hidden="true"></i>THÊM NGƯỜI SỬ DỤNG
                        </button>
                            <UserModalComponent UserModal={el => this.UserModal = el} />
                        </div>
                    </div>
                    {/* body */}
                    {this.getList()}
                </div>
                <div className="row text-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.props.paging.per_page}
                        totalItemsCount={this.props.paging.total}
                        pageRangeDisplayed={5}
                        hideNavigation
                        hideFirstLastPages
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listUser: state.UserReducer.listUser.data,
        paging: state.UserReducer.listUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        renderListUser: (params) => {
            dispatch(listUser(params));
        },
        deleteUser: (id) => {
            dispatch(deleteUser(id));
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(UserComponent);