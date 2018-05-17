import React from 'react';

const DisplayJson = (props) => {
    return (
        <div style={{margin: '1rem 0'}}>
            <pre
                style={{
                    background: '#f6f8fa',
                    fontSize: '.65rem',
                    padding: '.5rem',
                }}
            >
          <strong>props</strong> ={' '}
                {JSON.stringify(props, null, 2)}
        </pre>
        </div>
    )
}


export default DisplayJson