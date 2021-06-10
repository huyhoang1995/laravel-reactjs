import React from 'react';
import { connect } from 'react-redux';
import { userInfo, updateUser } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            phone: "",
            account: "",
            email: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value || "",
        })
    }

    handleSubmit() {
        var userInfo = new FormData();
        userInfo.append('name', this.state.name || "");
        userInfo.append('phone', this.state.phone || "");
        this.props.onUpdateUser(userInfo);
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.userInfo.id,
            name: props.userInfo.name,
            phone: props.userInfo.phone,
            account: props.userInfo.account,
            email: props.userInfo.email
        })
    }
    componentWillMount() {
        this.props.renderUserInfo();
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
                <div id="container" >
                    <div className="row">
                        <div className="eq-height">
                            <div className="col-sm-4 eq-box-sm">
                                {/* <!--Panel with Header-->
                                <!--===================================================--> */}
                                <div className="panel cat-panel" style={{ paddingTop: '20px', marginTop: '20px' }}>
                                    <div >
                                        <h3 className="panel-title cat-panel-title" style={{ fontSize: '2.2em', marginLeft: '40px' }}>Thông tin tài khoản</h3>
                                    </div>
                                    <div className="panel-body">
                                        <form className="form-horizontal col-md-8 col-md-offset-2" id="form-user" data-parsley-validate ng-dom="formUpdateUser">
                                            <div className="col-md-7 col-md-offset-1">
                                                <div className="row form-group">
                                                    <label className="cat-color-user">Họ và tên</label>
                                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                                </div>
                                                <div className="row form-group">
                                                    <div className="cat-color-user">Tài khoản</div>
                                                    <input type="text" disabled className="form-control" name="account" value={this.state.account} onChange={this.handleChange} />
                                                </div>
                                                <div className="row form-group">
                                                    <div className="cat-color-user">Email</div>
                                                    <input type="text" disabled className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                                </div>
                                                <div className="row form-group">
                                                    <div className="cat-color-user">Số điện thoại</div>
                                                    <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} />
                                                </div>
                                                <div className="row form-group">
                                                    <button type="button" ng-click="actions.showModal()" className="btn btn-primary">Đổi mật khẩu</button>
                                                    <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Cập nhật</button>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-8">
                                                    <img id="blah" className="avatar" src="" alt="" style={{ width: '140px', height: '150px' }} />
                                                    <br />
                                                    <div>
                                                        <button className="cat-button-file">Chọn file</button>
                                                        <input accept="image/*" type="file" name="avatar" id="upload-user" style={{ display: 'none' }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                {/* <!--===================================================-->
                                <!--End Panel with Header--> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        renderUserInfo: () => {
            dispatch(userInfo());
        },
        onUpdateUser: (data) => {
            dispatch(updateUser(data));
        }
    }
}

const mapStateToProps = (state) => {
    // console.log(state.UserReducer.userInfo);
    return {
        userInfo: state.UserReducer.userInfo
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(UserInfoComponent);
