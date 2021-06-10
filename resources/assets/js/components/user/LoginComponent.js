import React, { Component } from "react";
import { connect } from "react-redux";
import { doLogin } from "../../actions";
import { info as infoConfig } from "../../config";
import { MyErrors, MyValidate} from "../../libs/MyValidate";
import { Formik } from "formik";
import { LoginFormComponent } from "../form";
import MyFunc from "../../libs/MyFunc";
import { app as appConfig } from "../../config";
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customErrors: {},
            account: '',
            password: '',
        }
    }
    componentDidMount(){
        console.log(123123213);
    }
    componentWillReceiveProps(nextProps) {
        let doLoginReceive = nextProps.doLoginReceive;
        if(!MyFunc.isEmpty(doLoginReceive.payload)){
            let status = doLoginReceive.payload.data.status || false;
            if(status)
                window.location.href = appConfig.siteUrl;
            else
                this.setState({
                    customErrors: {errMsg: "Đăng nhập thất bại"}
                });
        }
        if(!MyFunc.isEmpty(doLoginReceive.error)){
            this.setState({
                customErrors: new MyErrors(doLoginReceive.error.response.data).messages()
            });
        }
    }

    onSubmit(values, {setSubmitting, setErrors}){
        setSubmitting(false);
        let validate = MyValidate(values, {
            'account': 'required',
            'password': 'required'
        }, {
            'account.required': 'Tài khoản không được bỏ trống',
            'password.required': 'Mật khẩu không được bỏ trống'
        });
        if(validate.fails()){
            setErrors(validate.messages());
            return false;
        }
            
        this.setState({
            account: values.account,
            password: values.password,
        });
        this.props.doLogin(values.account, values.password);
    }

    render() {
        let values = {
            account: this.state.account,
            password: this.state.password,
            customErrors: this.state.customErrors
        };
        return (
            <div className="col-sm-12 cls-container">
                <div className="cls-header cls-header-lg">
                    <div className="cls-brand">
                        <a className="box-inline" href="javascript:void(0)">
                            <span className="brand-title"> {infoConfig.brandName} </span>
                        </a>
                    </div>
                </div>
                <div className="cls-content" >
                    <div className="cls-content-sm panel">
                        <div className="panel-body" style={{ padding: "20px 20px" }}>
                            <p className="pad-btm">Đăng nhập hệ thống</p>
                            <Formik 
                                component={LoginFormComponent}
                                initialValues={values}
                                enableReinitialize={true}
                                validateOnChange={false}
                                onSubmit={ (values, { setSubmitting, setErrors}) => {
                                    this.onSubmit(values, { setSubmitting, setErrors});
                                }}
                            ></Formik>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        doLoginReceive: state.LoginReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (useName, password) => {
            dispatch(doLogin(useName, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);