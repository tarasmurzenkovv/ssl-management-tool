import {toast, ToastContainer} from "react-toastify";
import React from "react";

class ViewErrorsComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            error: props.error
        }
    }

    notify = (errorMessage: string) => toast.error(errorMessage, {
        type: toast.TYPE.ERROR,
        autoClose: 8000
    });

    render() {
        return (
            <React.Fragment>
                {this.notify(this.state.error.message)}
                <ToastContainer/>
            </React.Fragment>
        );
    }
}

export default ViewErrorsComponent;
