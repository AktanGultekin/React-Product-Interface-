import React, { Component } from 'react'


export default class displayRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {product: []};
        this.headers = [
          { key: 'product_name', label: 'Ürün Tipi'},
          { key: 'product_quantity', label: 'Adet'},
          { key: 'company_name', label: 'Giriş Tipi'},
          { key: 'product_add_date', label: 'Giriş Tarihi'},
          { key: 'product_delete_date', label:'Çıkış Tarihi'}
        ]
      }

  componentDidMount(){
    fetch('http://localhost/product/product.php').then(response => {
        console.log(response);
        //return response.json();
        return response.json();
    }).then(result => {
        console.log(result);
        this.setState({
            product_rs:result
        })
    }).catch(err => {
        console.log("Error Reading Data " + err);
    })
  }    


  render() {
    const productFound = this.state.product_rs && this.state.product_rs.length;
        if(productFound) {
            return (
            <div className="container">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {
                                this.headers.map(function(h){
                                    return (
                                        <th key={h.key}>{h.label}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.product_rs.map(function(item, index) {
                                return (
                                    <tr key={index}>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_quantity}</td>
                                        <td>{item.company_name}</td>
                                        <td>{item.product_add_date}</td>
                                        <td>{item.product_delete_date}</td>
                                    </tr>
                                )}.bind(this))
                        }
                    </tbody>
                </table>
                
            </div>
            )
        } else {
            return (
                <div id="container">
                    No records found
                </div>
            )
        }
  }
}
