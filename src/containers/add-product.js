import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ADD_PRODUCT,UPDATE_PRODUCT} from '../store/actionTypes';
import { productModule} from '../api/api';
import { alertmesage} from '../store/alertmessage';

class Addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id :  '',
            title : '',
            content : '',
            file : '../assets/image/dummy.jpg'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm =  this.handleSubmitForm.bind(this);
        this.handleUpdateProduct =  this.handleUpdateProduct.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.alertMessage = '';
    }
    handleChange(event) {
        this.setState({
            title : this.refs.title.value,
            content : this.refs.body.value
        });      
    }

    handleChangeImage(event){
      this.setState({file: URL.createObjectURL(event.target.files[0])})
    }

    async componentWillMount() {
        if(this.props.location.state){
            this.setState({
                _id :  this.props.location.state ? this.props.location.state.product : '',
                title : this.props.selectedproduct[0]['title'] ? this.props.selectedproduct[0]['title'] : '',
                content : this.props.selectedproduct[0]['content'] ? this.props.selectedproduct[0]['content'] : ''
            });
        }
     }

     async handleDeleteProduct(productid){ 
        await productModule.deleteProduct(productid)
        await this.props.allProduct()
      }
    
    componentWillReceiveProps(props) {    
        if(!props.location.state){
            this.setState({
                _id :  '',
                title : '',
                content : ''
            });
        }
    }

    async handleUpdateProduct(){
        await this.props.updateproduct(this.state);
        if( this.props.addedproduct){
           alertmesage.createNotification("success","Product "+this.props.addedproduct.data.title+" Updated")
         this.setState({
             title : '',
             content : ''
           });
         this.props.history.push("/");
       }else{
           alertmesage.createNotification("error","OOPS something went wrong !")
       }
    }
   
    async handleSubmitForm(event){
       event.preventDefault();
       await this.props.addproduct(this.state)
       var status = this.props.addedproduct.status;
       alertmesage.createNotification(status,"Product "+this.props.addedproduct.data.title+" created ")
       if( this.props.addedproduct){
        this.setState({
            title : '',
            content : ''
          });
        this.props.history.push("/");
      }
     
    }
  
    render(){
        return(
            <div className="container">
              <div className="row">
               <div className="col-md-2"></div>
               <div className="col-md-8 well">
                    <form onSubmit={this.handleSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange} ref="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <input type="text" className="form-control" value={this.state.content} onChange={this.handleChange} ref="body"/>
                        </div>
                        
                        {/* <div className="form-group">
                          <img src={this.state.file} className="img-circle productImage"  />
                          <input type="file" onChange={this.handleChangeImage} ref="img" />
                        </div> */}
                        
                        <div className='row'>
                           <div className="col-md-4"></div>
                           {
                               this.state._id !== '' ?  
                               <div className="col-md-4">
                                    <button type="button" onClick={this.handleUpdateProduct} className="btn btn-primary pull-right">Update</button>
                               </div> 
                                :  
                              <div className="col-md-4"> 
                                 <button type="button" onClick={this.handleSubmitForm} className="btn btn-primary">Submit</button>
                              </div>
                           }
                           <div className="col-md-4"></div>
                           
                        </div>
                    </form>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        addedproduct:state.Product.addedProducts,
        selectedproduct:state.Product.selectedProducts
    }
}
const  mapDispatchToProps = dispatch => ({
    addproduct: async (productdetails) =>  dispatch({
        type: ADD_PRODUCT, 
        payload: await productModule.addProduct(productdetails)
    }),

    updateproduct: async (productdetails) =>  dispatch({
        type: UPDATE_PRODUCT, 
        payload: await productModule.updateProduct(productdetails)
    })
  });

export default connect(mapStateToProps,mapDispatchToProps)(Addproduct);