import React from "react";

function Message(props:any) {
    const { message, owner} = props;
    return (
     <div> {owner} said {message}
        </div>
    );
}

export default Message;
