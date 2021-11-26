import React from 'react'

const redStyle = { backgroundColor:"red" }
const greenStyle = {backgroundColor:"green"}

const Notification = ({message,isError}) => {
    if(message === null){
        return null
    }

    return (
        <div style={isError ? redStyle : greenStyle} className="error">
            {message}
        </div>
    )
}

export default Notification