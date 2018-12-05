import * as React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '225px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

interface IModalComponentProps {
    onDeleteAction: Function,
    onCloseAction: Function,
    isOpenModel: boolean
}

export default class ModalComponent extends React.Component<IModalComponentProps> {

    constructor(props: IModalComponentProps) {
        super(props);
    }

    handleDeleteActionButton = () => this.props.onDeleteAction();
    handleOnCloseActionButton = () => this.props.onCloseAction();

    render() {
        return (
            <Modal
                isOpen={this.props.isOpenModel}
                style={customStyles}
                contentLabel="Example Modal">
                <p className="text-center">Are you sure you want to delete certificate?</p>
                <button className="btn btn-danger mr-1" onClick={() => this.handleDeleteActionButton()}>Confirm</button>
                <button className="btn btn-primary float-right" onClick={() => this.handleOnCloseActionButton()}>Close</button>
            </Modal>
        );
    }
}