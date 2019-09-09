import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createStream } from '../../actions/index'
import { connect } from 'react-redux'

class StreamCreate extends Component {
    onSubmit = val => {
        console.log(val);
        this.props.createStream(val)
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            )
        }
    }

    input({ input, label, meta }) {
        return (
            <div className='field'>
                <label>{label}</label>
                <input {...input} />
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name='title' component={this.input.bind(this)} label='Title' />
                    <Field name='description' component={this.input.bind(this)} label='Description' />
                    <button className='ui button primary'>Submit</button>
                </form>
            </div>
        );
    }

}

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'You must enter a title!'
    }
    if (!values.description) {
        errors.description = 'You must enter a description!'
    }
    return errors;
}

const formWrap = reduxForm({ form: 'streamCreate', validate })(StreamCreate);

export default connect(null, { createStream })(formWrap);