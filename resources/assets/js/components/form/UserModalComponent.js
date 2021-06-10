import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, updateUser } from '../../actions/index';
class UserModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            avatar: "",

        };
        this.itemModal = React.createRef();
        this.imgHandleChange = this.imgHandleChange.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.onChange = this.onChange.bind(this);
    }

    imgHandleChange(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value || "",
        })
    }

    handleSubmitAdd() {
        var users = new FormData();
        users.append('name', this.state.name || "");
        users.append('email', this.state.email || "");
        users.append('phone', this.state.phone || "");
        users.append('avatar', this.state.selectedFile || "");

        this.props.onAddUser(users);
    }

    handleSubmitUpdate() {

    }

    render() {
        return (
            <div>
                <div id="myModal" className="modal fade" role="dialog" ref={this.props.UserModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">modal</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" >
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Tên người dùng: </label>
                                        <div className="col-sm-8">
                                            <input required="" type="text" placeholder="" name="name" onChange={this.handleChange} className="form-control input-sm" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Email: </label>
                                        <div className="col-sm-8">
                                            <input required="" type="text" placeholder="" name="email" onChange={this.handleChange} className="form-control input-sm" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Số điện thoại: </label>
                                        <div className="col-sm-8">
                                            <input required="" type="text" placeholder="" name="phone" onChange={this.handleChange} className="form-control input-sm" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Trạng thái: </label>
                                        <div className="col-sm-8">
                                            <select name="" className="form-control" onChange={this.handleChange} name="status" required="required" >
                                                <option>Hoạt dộng</option>
                                                <option>Không hoạt dộng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Ảnh đại diện: </label>
                                        <div className="col-sm-8">
                                            <input required="" type="file" placeholder="" onChange={this.imgHandleChange} name="status" className="form-control input-sm" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => this.handleSubmitAdd()}>Xác nhận</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }


}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddUser: (data) => {
            dispatch(addUser(data));
        }

    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(UserModalComponent);