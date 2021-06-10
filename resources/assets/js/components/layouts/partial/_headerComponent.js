import React from 'react';
import ReactDOM from 'react-dom';
import { app } from "../../../config";
import { Router, Route, Link } from 'react-router';

export default class _headerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header id="navbar" ng-controller="headerCtrl">
                    <div id="navbar-container" className="boxed">

                        {/* <!--Brand logo & name-->
                        <!--================================--> */}
                        <div className="navbar-header">
                            <div className="navbar-brand">
                                <img ng-src="@{{loadImage()}}" className="brand-icon cat-brand-icon img-circle img-user" />
                                <div className="cat-title">
                                    {/* <div class="cat-admin">{{ Auth:: user()->name}}</div> */}

                                    <div className="cat-acc"><a className="cat-a" href={app.baseUrl + "/userInfo"}>Tài khoản</a> | <a className="cat-a" href={app.baseUrl + "/logout"}>Đăng xuất</a></div>

                                </div>

                                {/* <!-- <div class="brand-title">
                                    <div>a</div>
                                </div> --> */}
                            </div>
                        </div>
                        {/* <!--================================--> */}

                        <div className="navbar-content clearfix">
                            <ul className="nav navbar-top-links pull-left">

                                {/* <!--Navigation toogle button-->
                                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                                <li className="cat-text-head">
                                    <img src={app.baseUrl+ "/images/logo.png"} alt="Nifty Logo" className="brand-icon cat-head-img-next" />
                                </li>
                                <li>
                                    {/* <div class="cat-head-text">{{ config('info.brandName') }}</div> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

if (document.getElementById('headerComponent')) {
    ReactDOM.render(<_headerComponent />, document.getElementById('headerComponent'));
}
