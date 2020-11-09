import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            task: []
        };

        // Bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle Change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    // Handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/tasks/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                this.props.history.push('/');
            });
    }

    // Get Data 
    getTasks() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response =>
            this.setState({
                task: response.data.task,
                name: response.data.task.name
            })
        );
    }

    // Lifecycle mehtod
    componentWillMount() {
        this.getTasks();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">Edit Todo</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            placeholder="Create a new Todo"
                                            required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskEdit;
