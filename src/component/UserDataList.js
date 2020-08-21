import React, { Component } from 'react'
import UserDataForm from './UserDataForm';
import { connect } from "react-redux";
import  * as actions from "../action/userAction";
import { bindActionCreators } from "redux";

import { Container } from 'reactstrap';
import { Table } from 'reactstrap';
import { Button, Label, Input, FormText } from 'reactstrap';

class UserDataList extends Component {
    state = {
        currentIndex: -1,
        list: this.returnList(),
        
    }

    returnList() {
        if(localStorage.getItem('dataOfuser') == null)
            localStorage.setItem('dataOfuser', JSON.stringify([]))
        return JSON.parse(localStorage.getItem('dataOfuser'))
    }

    onAddOrEdit = (data) => {
        var list = this.returnList()
        if(this.state.currentIndex == -1)
            list.push(data)
        else   
            list[this.state.currentIndex] = data
        localStorage.setItem('dataOfuser', JSON.stringify(list))
        this.setState({ list ,currentIndex: -1 })
    }

    handleEdit = index => {
        this.props.updateTransactionIndex(index)
    }

    handleDelete = index => {
        this.props.deleteTransasction(index)
    }

    handleDeleteAll = index => {
        this.props.deleteAllTransasction(index)
    }


    render() {
        return (
            <Container className="themed-container">

                <div style={{border: '1px solid #dee2e6', padding: '15px', margin: '20px auto'}}>
                    <UserDataForm />
                </div>
                
                <hr />
                <div style={{marginLeft: '20px'}}>
                    <Input
                        type="checkbox"
                        name="checkAll"
                    />Select All
                    <Button style={{lineHeight: '1', padding: '0.5px 10px', marginLeft: '10px'}} color="danger" size="sm"
                            onClick={() => this.handleDeleteAll()}
                    >Delete</Button>
                    <br /><br />
                </div>
                <Table bordered>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Gender</th>
                            <th>Nationality </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.list.map((item, index) => {
                                
                                return <tr key={index}>
                                    <td><input
                                            key={index}
                                            type="checkbox"
                                        /></td>
                                
                                    <td >{item.firstName} {item.lastName}</td>
                                    <td>{item.gender}</td>
                                    <td>+({item.countryCode}) {item.mobilePhone}</td>
                                    <td>{item.nationality.toUpperCase()}</td>
                                    <td style={{textAlign: 'center'}}>
                                        <Button color="success" onClick={() => this.handleEdit(index)}>Edit</Button>&ensp;
                                        <Button color="danger" onClick={() => this.handleDelete(index)}>Delete</Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        list : state.list
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteTransasction: actions.Delete,
        deleteAllTransasction: actions.DeleteAll,
        updateTransactionIndex : actions.UpdateIndex
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDataList);