import {toast, ToastContainer} from "react-toastify";
import React from "react";
import {any} from "prop-types";

class ViewErrorsComponent extends React.Component<any, any> {

    constructor(props:any){
        super(any);
        this.state = {
            error: props.error
        }
    }

    notify = (errors: any) => toast.error("" + errors, {
        type: toast.TYPE.ERROR,
        autoClose: 8000
    });

    render() {
        return (
            <React.Fragment>
                {this.notify(this.state.error)}
                <ToastContainer/>
            </React.Fragment>
        );
    }
}

export default ViewErrorsComponent;
