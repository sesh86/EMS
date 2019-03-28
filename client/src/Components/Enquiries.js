import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {mapDispatchLogin} from '../Reducers/Action';

class Enquiries extends Component {
  constructor(props){
    super(props);
    this.state={enquiries:[]}
    var headers = {
        'Content-Type': 'application/json',
        'jwt': localStorage.getItem('JWT')
    }
    axios.post('/getEnquiries',{},{headers:headers})
    .then(res=>{
        console.log(res);
        if(res.data==='Invalid token') this.props.history.push('/login')
        this.setState({enquiries:res.data})
    })
  }

  render() {
    return (
      <div className="container cat">
        <br/>
        <br/>
        <h1>Enquiries</h1>
        <table className="table">
        <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Product</th></tr></thead>
        <EnquiryDetails enq={this.state.enquiries}></EnquiryDetails>
      </table>        
      </div>
    );
  }
}

const EnquiryDetails =(props)=>{
    return (<tbody>
        {props.enq.map(e => (
          <tr className="text-left" key={e._id}>
          <td>{e.name}</td><td>{e.phone}</td><td>{e.email}</td><td>{e.product}</td></tr>
        ))}
        </tbody>);
  
  }
  

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps)(Enquiries);
