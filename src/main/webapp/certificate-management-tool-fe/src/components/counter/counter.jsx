import React from 'react'

class Counter extends React.Component {

    // noinspection JSUnresolvedVariable
    state = {
        value: this.props.currentCounter.value,
        id: this.props.currentCounter.id
    };

    formatCount() {
        const {value} = this.state;
        return value === 0 ? 'Zero' : value;
    }

    renderCssForSpan() {
        const {id} = this.state;
        let baseCss = "badge m-2 badge-";
        baseCss += id === 0 ? "warning" : "primary";
        return baseCss;
    }

    onClickHandler = value => {
        this.setState({value: value + 1})
    };

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <li>
                    {this.props.children}
                    <span className={this.renderCssForSpan()}>{this.formatCount()}</span>
                    <button onClick={() => this.onClickHandler(this.state.value)}
                            className="btn btn-secondary btn-sm">Increment
                    </button>
                    <button onClick={() => this.props.onDelete(this.state.id)}
                            className="btn btn-danger btn-sm m-2">Delete
                    </button>
                </li>

            </React.Fragment>
        );
    }
}

export default Counter;