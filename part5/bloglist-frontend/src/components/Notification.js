import React from 'react'
import PropTypes from 'prop-types'

const redStyle = { backgroundColor:'red' }
const greenStyle = { backgroundColor:'green' }

const Notification = ( { message, isError } ) => {
    if(message === null){
        return null
    }

    return (
        <div style={isError ? redStyle : greenStyle} className="error">
            {message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
    isError: PropTypes.bool.isRequired
}

export default Notification