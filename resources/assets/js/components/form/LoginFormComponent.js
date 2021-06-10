import React, { Component } from "react";

export class LoginFormComponent extends Component {

    render() {
        let {
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
        } = this.props;
        if (!this.props.errors) {
            this.props.setErrors({
                account: '',
                password: '',
                errMsg: ''
            });
        }

        if (values.customErrors) {
            errors = {
                ...errors,
                ...values.customErrors
            };
        }

        return (
            <h1>aaaaaâ</h1>
            // <form onSubmit={handleSubmit} >
            //     <div className="col-sm-12 text-center">
            //         {errors.errMsg && <span className="text-danger">{errors.errMsg}</span>}
            //     </div>
            //     <div className="form-group">
            //         <div className="input-group">
            //             <div className="input-group-addon"><i className="fa fa-user"></i></div>
            //             <input type="text" className="form-control"
            //                 placeholder="Tài khoản" name="account"
            //                 onChange={handleChange}
            //                 value={values.account}
            //             />
            //         </div>
            //         {errors.account && <span className="text-danger">{errors.account}</span>}
            //     </div>
            //     <div className="form-group">
            //         <div className="input-group">
            //             <div className="input-group-addon"><i className="fa fa-asterisk"></i></div>
            //             <input type="password" className="form-control"
            //                 onChange={handleChange}
            //                 placeholder="Mật khẩu" name="password"
            //                 value={values.password}
            //             />
            //         </div>
            //         {errors.password && <span className="text-danger">{errors.password}</span>}
            //     </div>
            //     <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: "30px" }} disabled={isSubmitting} >
            //         Đăng nhập
            //         </button>
            // </form>

        )
    }

}