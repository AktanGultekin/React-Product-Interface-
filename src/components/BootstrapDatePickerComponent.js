import React from 'react'
import { Form } from 'react-bootstrap';
 
class BootstrapDatePickerComponent extends React.Component{
 
    render(){
 
        return(
            <div>
                <div className="row">
                    <div className="col-md">
                        <Form.Group controlId="dob">
                            <Form.Control type="date" name="dob" placeholder="Date of Birth"></Form.Control>
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    }
     
}
 
export default BootstrapDatePickerComponent;