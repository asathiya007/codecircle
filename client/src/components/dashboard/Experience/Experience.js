import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../../actions/profile';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.title}</td>
            <td>{exp.company}</td>
            <td>{exp.location}</td>
            <td>
                <Moment format="YYYY/MM/DD">
                    {exp.from}
                </Moment> - {
                    exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">
                        {exp.to}
                    </Moment>)
                }
            </td>
            <td>{exp.description}</td>
            <td>
                <Button variant="danger" className="ml2" onClick={() => deleteExperience(exp._id)}>
                    <i className="fas fa-times"></i>
                </Button>
            </td>
        </tr>
    ));

    return (
        <div className="mt3">
            <p className="f4 fw4 mb1">
                Experience Credentials
            </p>
            <Table bordered striped>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </Table>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);