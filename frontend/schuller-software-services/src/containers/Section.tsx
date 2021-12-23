import React, {useState} from 'react';

function Section(props:any) {

    const [state, setState] = useState(props);
    return (
        <div className="Section">
            <h1>Welcome to Schuller Software Services</h1>
            <table>
                <th></th>
                <tr></tr>
            </table>
        </div>
    );
}

export default Section;
