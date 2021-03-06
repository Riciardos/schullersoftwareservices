import React from "react";

// interface MessageProps {
//     children?: React.ReactNode;
//     dir?: string;
//     index: number;
//     value: number;
//     className?: string;
// }

function Message(props:any) {
    const { message, owner} = props;
    return (
     <div> {owner} said {message}
        </div>
    );
}

export default Message;