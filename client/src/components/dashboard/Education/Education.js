import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../../actions/profile';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.institution}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldOfStudy}</td>
            <td>
                <Moment format="YYYY/MM/DD">
                    {edu.from}
                </Moment> - {
                    edu.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">
                        {edu.to}
                    </Moment>)
                }
            </td>
            <td>{edu.description}</td>
            <td>
                <Button variant="danger" className="ml2" onClick={() => deleteEducation(edu._id)}>
                        <i className="fas fa-times"></i>
                </Button>
            </td>
        </tr>
    )); 

    return (
        <div className="mt3">
            <p className="f4 fw4 mb1">
                Education Credentials
            </p>
            <Table bordered striped>
                <thead>
                    <tr>
                        <th>Institution</th>
                        <th>Degree</th>
                        <th>Field</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </Table>
        </div> 
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired, 
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);