import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {mapDispatchLogin} from '../Reducers/Action';

class UpdateEnquiry extends Component {
  constructor(props){
    super(props);
    this.state={alert:'',enquiries:[],followups:[]}
    var headers = {
      'Content-Type': 'application/json',
      'jwt': localStorage.getItem('JWT')
    }
    axios.post('/getEnquiry',{id:props.match.params.id},{headers:headers})
    .then(res=>{
        console.log(res);
        if(res.data==='Invalid token') this.props.history.push('/login')
        this.setState({enquiries:res.data})
    })
    axios.post('/getFollowup',{id:props.match.params.id},{headers:headers})
    .then(res=>{
        console.log(res);
        if(res.data==='Invalid token') this.props.history.push('/login')
        this.setState({followups:res.data})
    })
    if(!localStorage.getItem('JWT')) this.props.history.push('/login')
  }
  onSubmit=(ev)=>{
    ev.preventDefault();
    let enquiry={};
    
    for(let i in ev.target.elements){
        if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!==''){
            enquiry[ev.target.elements[i].name]=ev.target.elements[i].value;
        }
    }
    console.log(enquiry) 
    enquiry["followupDate"]=new Date();
    enquiry["enquiry_id"]=this.props.match.params.id;

    
    var headers = {
        'Content-Type': 'application/json',
        'jwt': localStorage.getItem('JWT')
    }    

    axios.post('/createFollowup',enquiry,{headers:headers})
    .then(res=>{
      if(res.data=='Enquiry Submitted')
        this.props.history.push('/')
    });    
  }

  render() {
    return (
      <div className="container cat">
        <br/>
        <br/>
        <table className="table">
        <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Product</th><th>Location</th><th>Type</th></tr></thead>
        <EnquiryDetails enq={this.state.enquiries}></EnquiryDetails>        
        </table>
        <FollowUps followups={this.state.followups}></FollowUps>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          comment<input type="text" name="comment" required className="form-control"/>
          <br/>
          <div hidden={!this.state.alert} className="alert alert-danger" role="alert">{this.state.alert}</div>
          <button className="form-control btn btn-dark">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const EnquiryDetails =(props)=>{
  return (<tbody>
      {props.enq.map(e => (
        <tr className="text-left" key={e._id}>
        <td>{e.name}</td><td>{e.phone}</td><td>{e.email}</td><td>{e.product}</td><td>{e.location}</td><td>{e.type}</td></tr>
      ))}
      </tbody>);
}

const FollowUps =(props)=>{
  return (<ul>
      {props.followups.map(f => (
        <li className="text-left" key={f._id}>{f.comment} on {f.followupDate}</li>
      ))}
      </ul>);
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchLogin)(UpdateEnquiry);
