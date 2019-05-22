import React, { Component } from 'react';
import {connect} from 'react-redux';
import { PRODUCT_SELECTED,COMMENT_PRODUCT, PRODUCT_All_COMMENTS} from '../store/actionTypes';
import { productModule,commentModule } from '../api/api';
import {NavLink} from "react-router-dom";
import { alertmesage} from '../store/alertmessage';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : {
                content:''
            },
            requiredContent:'',
            comment:'',
            id:''
        }
        this.handleComment =  this.handleComment.bind(this);
        this.handleChange =  this.handleChange.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);
        
    }

    handleChange(){
        this.setState({
            content : {content: this.refs.content.value},
            requiredContent : ''
        }); 
    }

    async handleEditComment(commentid,comment){
 
        this.setState({
            content : {content: comment},
            id:commentid
        }); 
    }

    async handleUpdateComment(productid){
        if(this.state.content["content"]){
            await commentModule.updateComment(this.state.id,this.state.content)
            window.$('#myModal').modal('hide');
            alertmesage.createNotification("success","Commented !")
            await this.props.comments(productid)
        }else{
            this.setState({
                requiredContent : 'Comment is required *'
            });  
        }
        this.setState({
            content : {content: ''},
            id : ''
        });
    }
  
    async handleComment(productid){ 
        if(this.state.content["content"]){
            await this.props.commentProduct(productid,this.state.content)
            window.$('#myModal').modal('hide');
            alertmesage.createNotification("success","Commented !")
            await this.props.comments(productid)
        }else{
            this.setState({
                requiredContent : 'Comment is required *'
            });  
        }
        this.setState({
            content : {content: ''},
            id : ''
        }); 
    }
    async componentWillMount() {
        const productid = this.props.location.state.product;
        await this.props.selectedProduct(productid)
        await this.props.comments(productid)
     }

     async handleDeleteComment(comment){
        const productid = this.props.location.state.product;
        await commentModule.deleteComment(comment)
        await this.props.comments(productid)
        alertmesage.createNotification(500,"Deleted !")
      
     }

     commentDisplay(){
         return (
                this.props.productsComments ?
                  this.props.productsComments.map((comment) =>{
                      return (
                          <div className="" key={comment._id}>
                            <div className="row">
                              <div className="col-md-1">
                              <div className="w3-container">
                                  <img src="../assets/image/cproduct.png" alt="Avatar" height="60" className="w3-circle"/>
                              </div>
                              </div>
                              <div className="col-md-10"> {comment.content} </div>
                              <div className="col-md-1"><span className="glyphicon glyphicon-trash pointer" onClick={()=>this.handleDeleteComment(comment._id)}></span> <span className="verticle"></span> 
                              <span className="glyphicon glyphicon-pencil pointer" onClick={()=>this.handleEditComment(comment._id,comment.content)} data-toggle="modal" data-target="#myModal"> </span></div>
                            </div> 
                            <hr></hr>
                          </div>
                      )
                  })
                  : ''
            
         )
     }

     commentModal(){
         return (
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Product Details</h4>
                </div>
                <div className="modal-body">
                    <div align="center"><img src="../assets/image/product.png" alt="Avatar"/></div>
                    <p><b>Title  : </b>{this.props.product[0]['title']}</p>
                    <p><b>Content  : </b>{this.props.product[0]['content']}</p>
                    <div className="form-group">
                        <label htmlFor="body">Comment : </label>
                        <input type="text" className="form-control" value={this.state.content.content} onChange={this.handleChange} ref="content" />
                        <p className="required">{this.state.requiredContent}</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    {!this.state.id ?  
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleComment(this.props.product[0]['_id'])}>Save changes</button> 
                        :
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleUpdateComment(this.props.product[0]['_id'])}>Update</button>
                   }
                   
                   
                </div>
                </div>
            </div>
        </div>
         )
     }

    
    render(){
        if(this.props.product){
            return (
                <div className="container">
                    <div className="">
                       <div className="row">
                         <div className="col-md-2">
                            <div className="w3-container w3-center">
                                <img src="../assets/image/product.png" height="150" alt="Avatar" className="w3-circle"/>
                            </div>
                         </div>
                         <div className="col-md-9">
                            <p><b>Title  : </b>{this.props.product[0]['title']}</p>
                            <p><b>Content  : </b>{this.props.product[0]['content']}</p>
                            <div className="row">
                                <div className="col-md-4"><NavLink className="btn btn-primary" to={'/'}>Go to Home</NavLink></div>
                                <div className="col-md-4">
                                    <NavLink className="btn btn-primary"  to={{pathname :`/addproduct/${this.props.product[0]['_id']}`,
                                    state :{product:this.props.product[0]['_id']}}}>
                                    Update Details
                                </NavLink>
                                </div>
                                
                                <div className="col-md-4">
                                    <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" >Comment</button>
                                </div>
                            </div>
                         </div>
                       </div>
                    </div>
                    <div align="center" style={{color: 'gray'}}><h3>Comments</h3></div>
                    <hr></hr>
                    {/* comments Dispaly*/}
                      {
                          this.commentDisplay()
                         
                      }
                    {/* Modal Display */}
                      { this.commentModal()}
        
                </div>
            );
        }
        return (
            <div className="container">
               <h1>Product Not Found</h1>
            </div>
        );
       
    }
    
}

function mapStateToProps(state){
    return {
        product : state.Product.selectedProducts,
        addedproduct:state.Product.addedProducts,
        productsComments:state.Comment.allcomments.comments
    }
}
 const  mapDispatchToProps = dispatch => ({
    selectedProduct: async (product) =>  dispatch({
        type:PRODUCT_SELECTED, 
        payload: await productModule.selectedProduct(product)
    }),
    commentProduct: async (product, comment) =>  dispatch({
        type: COMMENT_PRODUCT, 
        payload: await commentModule.commentProduct(product, comment)
    }),
    comments: async (product) =>  dispatch({
        type: PRODUCT_All_COMMENTS, 
        payload: await commentModule.getComments(product)
    }),
  });

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);