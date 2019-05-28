import React, { Component } from 'react';
import {connect} from 'react-redux';
import { PRODUCT_LIST} from '../store/actionTypes';
import { productModule } from '../api/api';
import {Link} from "react-router-dom";
// import { alertmesage} from '../store/alertmessage';



class ProductList extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteProduct =  this.handleDeleteProduct.bind(this);
        this.alertMessage = '';
    }
    
    async handleDeleteProduct(productid){ 
      await productModule.deleteProduct(productid)
      await this.props.allProduct()
    }

   
    async componentWillMount() {
        await this.props.allProduct()
     }
   
    render(){
    
        if (!this.props.products) {
            return "No Product Found";
        }
        var products = Object.values(this.props.products)
        return (
            <div className="productList row">
            {
                products.map((product)=>{
                  
                    return (
                    <div className="col-md-3 productlist" key={product._id}>
                        <div className="w3-card-4">
                            <header className="w3-container w3-light-grey">
                                <h4 className="overflow">{product.title}</h4>
                            </header>
                            <div className="w3-container">
                                {
                                    product.path ? 
                                    <img height="226" width="226" src={'../files/'+ product.path.substr(13)} alt="Avatar" className="w3-left w3-circle"/>
                                    :
                                    <img src="../assets/image/product.png" alt="Avatar" className="w3-left w3-circle"/>
                                }
                                <p className="overflow">{product.content}</p>
                            </div>
                            <div className="row btndetails">
                                <div className="col-md-6">
                                    <Link className="glyphicon glyphicon-home btn btn-primary pull-right" data-toggle="tooltip" data-placement="bottom" title="View details"
                                        to={{pathname :`/productdeatils/${product._id}`,
                                            state :{product:product._id}}}>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                     <button className="btn btn-danger glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="bottom" title="Delete product" onClick={()=>this.handleDeleteProduct(product._id)}></button>
                                </div>

                            </div>
                           
                            
                        </div>
                    </div>
                    )
                })
            }
            </div>
        )
    }
}
  function mapStateToProps(state){
    return {
        products : state.Product.products
    }
}
 const  mapDispatchToProps = dispatch => ({
    allProduct: async () =>  dispatch({
        type: PRODUCT_LIST, 
        payload: await productModule.getProduct()
    }),
  });

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);