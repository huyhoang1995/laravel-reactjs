import React from 'react';
import ReactDOM from 'react-dom';

export default class _modalLoaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="modal" id="modalLoader">
                    <div id="loader-wrapper">
                        <div id="loader"></div>
                    </div>
                </div>
                {/* // <!-- /.modal --> */}
            </div>
        );
    }
}

if (document.getElementById('modalLoaderComponent')) {
    ReactDOM.render(<_modalLoaderComponent />, document.getElementById('modalLoaderComponent'));
}
