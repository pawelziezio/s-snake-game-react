import React from 'react';

const Results = (props) => {

    return(
        <div>
            <h5>TOP TEN:</h5>
            <table className="gameover__results">
                <tbody>
                    <tr>
                        <th> </th>
                        <th>score</th>
                        <th>date</th>
                        <th>hour</th>
                    </tr>
                    {
                       props.results.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td><b>{result[0]}</b></td>
                                    <td>{result[1]}</td>
                                    <td>{result[2]}</td>
                                </tr>
                           )
                       }) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Results;