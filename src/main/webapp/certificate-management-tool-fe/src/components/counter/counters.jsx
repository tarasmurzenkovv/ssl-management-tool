import React from 'react'
import Counter from './counter'
import CounterModel from './counterModel'

class Counters extends React.Component {
    state = {
        counters: [
            new CounterModel(1, 4),
            new CounterModel(2, 0),
            new CounterModel(3, 0),
            new CounterModel(4, 0)
        ]
    };

    handleDelete = counterId => {
        console.log("Handle delete is called. Counter id is " + counterId);
        const filterCountersList = this.state.counters.filter(counter => counter.id !== counterId);
        this.setState({counters: filterCountersList})
    };

    render() {
        console.log('props', this.props);
        return (
            <React.Fragment>
                {
                    this.state
                        .counters
                        .map(counter => (
                            <Counter key={counter.id} currentCounter={counter} onDelete={this.handleDelete}>
                                <h4> Counter # {counter.id} </h4>
                            </Counter>
                        ))
                }
            </React.Fragment>
        );
    }
}

export default Counters;