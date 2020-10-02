import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import coasterService from './../../../service/coasters.service'
import CoasterCard from './CoasterCard'
import NewCoasterForm from './../newCoaster/NewCoaster'

import Spinner from './../../shared/spinner/Spinner'

import './CoastersList.css'

class CoastersList extends Component {
    constructor() {
        super()
        this.state = {
            coasters: [],
            showModal: false
        }
        this.coasterService = new coasterService()
    }

    componentDidMount = () => this.loadCoasters()

    loadCoasters = () => {
        this.coasterService
            .getAllCoasters()
            .then(response => this.setState({ coasters: response.data }))
            .catch(err => console.log('Error:', err))
    }

    handleModal = showModal => this.setState({ showModal })

    render() {
        return (
            <>
                <Container>
                    <main>
                        <h1>Listado de montañas rusas</h1>
                        {this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} style={{ marginBottom: '20px' }} variant="dark" size="sm">Crear montaña rusa</Button>}
                        <Row>
                            {
                                this.state.coasters.length
                                    ?
                                    this.state.coasters.map(elm => <CoasterCard loggedInUser={this.props.loggedInUser} key={elm._id} {...elm} />)
                                    :
                                    <Spinner />
                            }
                        </Row>
                    </main>
                </Container>


                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nueva montaña rusa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewCoasterForm loggedInUser={this.props.loggedInUser} closeModal={() => this.handleModal(false)} refreshList={this.loadCoasters} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default CoastersList