import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const CoasterCard = ({ _id, title, imageUrl, loggedInUser, owner }) => {

    return (
        <Col md={4}>
            <Card className="coaster-card">
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <h4>{title}</h4>

                    {loggedInUser && loggedInUser._id === owner
                        ?
                        <ButtonGroup style={{ width: '100%' }}>
                            <Button className="btn btn-dark btn-sm" onClick={() => alert('TE LO CURRAS')}>Editar</Button>
                            <Link to={`/coasters/details/${_id}`} className="btn btn-dark btn-sm">Detalles</Link>
                        </ButtonGroup>
                        :
                        <Link to={`/coasters/details/${_id}`}>
                            <Button variant="dark" size="sm" block>Detalles</Button>
                        </Link>
                    }

                </Card.Body>
            </Card>
        </Col>
    )
}

export default CoasterCard