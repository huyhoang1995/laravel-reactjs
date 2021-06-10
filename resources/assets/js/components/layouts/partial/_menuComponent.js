import React from 'react';
import ReactDOM from 'react-dom';
import { app } from "../../../config";

export default class _menuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <nav id="mainnav-container">
                    <div id="mainnav" className="cat-mainnav">
                        <div id="mainnav-menu-wrap">
                            <div className="nano">
                                <div className="nano-content">
                                    <ul id="mainnav-menu" className="list-group">
                                        {/* @if(app('UserRoleConfig')->checkIsSuperAdmin()) */}
                                        <li className=" cat-hover {{ request()->is('user') ? 'active active-link' : '' }}">
                                            <a href={app.baseUrl + "/user"}>
                                                <i className="fa fa-user"></i>
                                                <span className="menu-title">
                                                    <b>Người sử dụng</b>
                                                </span>
                                            </a>
                                        </li>
                                        {/* @endif */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}



if (document.getElementById('menuComponent')) {
    ReactDOM.render(<_menuComponent />, document.getElementById('menuComponent'));
}
