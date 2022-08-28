import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import BootstrapDatePickerComponent from './components/BootstrapDatePickerComponent';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Axios from "axios";

function App() {

  function refreshPage() {
    window.location.reload(false);
  }
  const [productname, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [companyname, setCompanyName] = useState("");
  const [adddate, setAddDate] = useState(new Date());
  const [deletedate, setDeleteDate] = useState(new Date());
  const [productList, setProductList] = useState([]);

  const getProducts = () => {
    Axios.get("https://react-backend-deploy.herokuapp.com/products").then((response) => {
      setProductList(response.data);
    });
  };


  const addProduct = () => {
      Axios.post('https://react-backend-deploy.herokuapp.com/create', {
      productname: productname, 
      quantity: quantity, 
      companyname: companyname, 
      adddate: adddate 
    }).then(()=> {
      console.log("Success");
    });
  };

  const deleteProduct = () => {
    Axios.post('https://react-backend-deploy.herokuapp.com/delete', {
      productname: productname, 
      quantity: quantity,
      companyname: companyname,
      deletedate: deletedate 
    }).then(()=> {
      console.log("Success");
    });
  };

  /* İnput gruplarının çalışma testini gerçekleştirmek için displayInfo fonksiyonu kullanıldı. */

  /*const displayInfo = () => {
    console.log(productname + " " +quantity + " " + companyname + " " + adddate + " " + deletedate);
  };
  */

  return (
    <div className="App" id="Ekleme">

      {/* Navigasyon Barı */}
      <div className="mynavbar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#Ekleme">Ekleme</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#Çıkarma">Çıkarma</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link" href="#Raporlama">Raporlama</a>
          </li >
        </ul>
      </div>
      
      {/* Ekleme Ekranı */}
      <div className="AddSection" id="Ekleme">
        <fieldset className="Add">
          <h4 className="display-6" style={{float:"left",marginTop:"2vh",marginLeft:"1vw",fontSize:"2em",color:"rgb(68, 166, 232)"}}>Ürün Ekleme Ekranı</h4>
          <br/><br/><br/><br/>

          <form >

          {/* Ürün Tipi Input */}
          <div className="row mb-3">
            <label htmlFor="productname" className="col-sm-2 col-form-label">Ürün Tipi :</label>
            <div className="col-sm-9">
            <select className="form-select" aria-label="productname" id="productname" onChange={(event) => { setProductName(event.target.value);}}>
              <option defaultValue>Ürün seçiniz...</option>
              <option value="5x5 Kilitli Poşet">5x5 Kilitli Poşet</option>
              <option value="20m Alüminyum Folyo">20m Alüminyum Folyo</option>
              <option value="30x20cm 500 Mikron Poşet">30x20cm 500 Mikron Poşet</option>
              <option value="50cm Streç Film">50cm Streç Film</option>
              <option value="48 Adet Buz Torbası">48 Adet Buz Torbası</option>
              <option value="28x42cm 5 Şeffaf Kendinden Yapışkanlı Giyim Plastik Ambalaj Çantası">28x42cm 5 Şeffaf Kendinden Yapışkanlı Giyim Plastik Ambalaj Çantası</option>
            </select>
            </div>
          </div>

          {/* Adet Input */}
          <div className="row mb-3">
            <label htmlFor="quantity" className="col-sm-2 col-form-label">Adet :</label>
            <div className="col-sm-9">
              <input type="number" className="form-control" id="quantity" onChange={(event) => { setQuantity(event.target.value);}}/>
            </div>
          </div>

          {/* Firma Adı Input */}
          <div className="row mb-3">
            <label htmlFor="companyname" className="col-sm-2 col-form-label">Giriş Şekli :</label>
            <div className="col-sm-9">
            <select className="form-select" aria-label="companyname" id="companyname" onChange={(event) => { setCompanyName(event.target.value);}}>
              <option defaultValue>Giriş Şekli Seçiniz...</option>
              <option value="A Firması">A Firması</option>
              <option value="B Firması">B Firması</option>
              <option value="C Firması">C Firması</option>
            </select>
            </div>
          </div>

          {/* Ekleme Tarihi Input (Bunun için react-bootstrap DatePicker kullanıldı. Daha sonrasında ise react-datepicker kullanıldı. Değişimin sebebi inputa erişim kolaylığıdır.) */}
          <div className="row mb-3">
            <label htmlFor="adddate" className="col-sm-2 col-form-label">Giriş Tarihi :</label>
            <div className="col-sm-9">
             {/*<BootstrapDatePickerComponent onChange={(event) => { setAddDate(event.target.value);}}/>*/}

             {/*Daha kullanışlı bir DatePicker deneniliyor.*/}
             <DatePicker
             selected={adddate}
             dateFormat="dd/MM/yyyy"
             onChange={date => setAddDate(date)} />
            </div>
          </div>

          {/* Buton */}
          {/*Buton parametrelerine onClick={displayInfo} özelliği eklenilebilir.*/}
          <button type="button" className="btn btn-primary float-end me-3 px-5 mt-5" id="Çıkarma" onClick={()=> {
            addProduct();
            
            }}
          style={{backgroundColor:"rgb(68, 166, 232)",border:"1px solid black",borderRadius:"%25",margin:"20px"}}>Ekle</button>
          </form>
        </fieldset>
      </div>

          {/* Silme Ekranı */}
      <div className="DeleteSection" >
        <fieldset className="Delete">
        <h4 className="display-6" style={{float:"left",marginTop:"2vh",marginLeft:"1vw",fontSize:"2em",color:"rgb(68, 166, 232)"}}>Ürün Çıkarma Ekranı</h4>
        
        <br/><br/><br/><br/>

        <form >

        {/* Ürün Tipi Input */}
        <div className="row mb-3">
          <label htmlFor="productname" className="col-sm-2 col-form-label">Ürün Tipi :</label>
          <div className="col-sm-9">
          <select className="form-select" aria-label="productname" id="productname" onChange={(event) => { setProductName(event.target.value);}}>
          <option defaultValue>Ürün seçiniz...</option>
          <option value="5x5 Kilitli Poşet">5x5 Kilitli Poşet</option>
              <option value="20m Alüminyum Folyo">20m Alüminyum Folyo</option>
              <option value="30x20cm 500 Mikron Poşet">30x20cm 500 Mikron Poşet</option>
              <option value="50cm Streç Film">50cm Streç Film</option>
              <option value="48 Adet Buz Torbası">48 Adet Buz Torbası</option>
              <option value="28x42cm 5 Şeffaf Kendinden Yapışkanlı Giyim Plastik Ambalaj Çantası">28x42cm 5 Şeffaf Kendinden Yapışkanlı Giyim Plastik Ambalaj Çantası</option>
          </select>
          </div>
        </div>

        <div className="row mb-3">
            <label htmlFor="quantity" className="col-sm-2 col-form-label">Çıkış Adeti :</label>
            <div className="col-sm-9">
              <input type="number" className="form-control" id="quantity" onChange={(event) => { setQuantity(event.target.value);}}/>
            </div>
          </div>

        <div className="row mb-3">
          <label htmlFor="companyname" className="col-sm-2 col-form-label">Çıkış Şekli :</label>
          <div className="col-sm-9">
          <select className="form-select" aria-label="companyname" id="companyname" onChange={(event) => { setCompanyName(event.target.value);}}>
              <option defaultValue>Çıkış Şekli Seçiniz...</option>
              <option value="A Firması">A Firması</option>
              <option value="B Firması">B Firması</option>
              <option value="C Firması">C Firması</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
            <label htmlFor="deletedate" className="col-sm-2 col-form-label">Çıkış Tarihi :</label>
            <div className="col-sm-9">
            {/*<BootstrapDatePickerComponent onChange={(event) => { setDeleteDate(event.target.value);}}/>*/}
            <DatePicker
             selected={deletedate}
             dateFormat="dd/MM/yyyy"
             onChange={date => setDeleteDate(date)}
             />
            </div>
        </div>

        <button type="button" id="Raporlama" className="btn btn-primary float-end me-3 px-5 mt-5" onClick={()=> {
            deleteProduct();
            
            }}

        style={{backgroundColor:"rgb(68, 166, 232)",border:"1px solid black",borderRadius:"%25",margin:"20px"}}>Çıkart</button>
        </form>
        </fieldset>
      </div >

      <div className="LogSection" >
        <fieldset className="Log">
        <h4 className="display-6" style={{float:"left",marginTop:"2vh",marginLeft:"1vw",fontSize:"2em",color:"rgb(68, 166, 232)"}}>Ürün Raporlama Ekranı</h4>
        <button type="button" id="Raporlama" className="btn btn-primary float-end me-3 px-5 mt-5" onClick={()=> {
            getProducts();
            }}
        style={{backgroundColor:"rgb(68, 166, 232)",border:"1px solid black",borderRadius:"%25",margin:"20px"}}>Çıkart</button> 
       
       <table className="table table-bordered table-striped">
        <thead>
          <tr>
            { 
            <>
            <th>Ürün Adı</th>
            <th>Ürün Adedi</th>
            <th>Giriş Tipi</th>
            <th>Eklenim Tarihi</th>
            <th>Çıkarım TARİHİ</th>
            </>
            }
          </tr>
        </thead>
        <tbody>
          {
            productList.map((val, key) => {
              return(
                <tr key={key}>
                  <td>{val.product_name}</td>
                  <td>{val.product_quantity}</td>
                  <td>{val.company_name}</td>
                  <td>{val.product_add_date}</td>
                  <td>{val.product_delete_date}</td>
                </tr>
              )
            })
          }
          
        </tbody>
       </table>

       
              
        
      

        
        </fieldset>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default App;
