import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { fetchAllStreams } from '../../actions/index'


class StreamList extends Component {
    componentDidMount() {
        this.props.fetchAllStreams();
    }

    renderList() {
        return this.props.streams.map(stream => {
            const modifyStream = (stream.userId === this.props.auth.userId) ?
                <div className='right floated content'>
                    <button className='ui button primary'>Edit</button>
                    <button className='ui button negative'>Delete</button>
                </div>
                : '';
            return (
                <div className='item' style={{ 'padding': '1em 0' }} key={stream.id}>
                    <i className='large middle aligned icon camera' />
                    <div className='content'>
                        <b>{stream.title}</b>
                        <div className='description'>{stream.description}</div>
                    </div>
                    {modifyStream}
                </div>
            )
        })
    }

    render() {
        const createStreamBtn = (this.props.auth.isSignedIn) ?
            <Link to='/streams/new'>
                <button className='primary ui button'>
                    <i className='add icon' />
                    Create Stream
                </button>
            </Link>
            : '';
        return (
            <div>
                <h2>Streams</h2>
                {createStreamBtn}
                <div className='ui middle aligned divided  list'>{this.renderList()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        auth: state.auth
    }
}

export default connect(mapStateToProps, { fetchAllStreams })(StreamList);