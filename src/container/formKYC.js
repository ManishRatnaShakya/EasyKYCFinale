import React, { Component } from "react";
import axios from "axios";
import "./form.css";
import { Container, Card, CardBody, Row, Nav, NavItem, NavLink,CardTitle,CardSubtitle, TabPane, TabContent, Col, FormGroup, Label, Input, Button } from "reactstrap";
import {Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import logo from "../EasyKYC-logos/EasyKYC-logos_transparent.png";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class FormKYC extends Component {
  state = {
    citizenship_front : null,
    citizenship_back: null,
    photo : null,
    loading: false,
    upload_disabled: false,  

    //for face
    verified: null,

    //for text
    citizen_no: null,
    full_name: "",
    address:"",
    ward_no:"",
    area:"",
    sex:"",
    birth_place_district:"",
    birth_place_ward_no:"",
    birth_place_area:"",
    dob_year: "",
    dob_month:"",
    dob_day: "",
    selectedFiles: [],
    selectedFilesBack:[],
    selectedFilesPP:[]
  }

  handleAcceptedFiles = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          
        this.setState({ selectedFiles: files});
        // this.props.onChangeImage(files);
      };
   
  handleAcceptedFilesBack = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          
        this.setState({ selectedFilesBack: files});
        // this.props.onChangeImage(files);
      };
   
  handleAcceptedFilesPP= files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          
        this.setState({ selectedFilesPP: files });
        // this.props.onChangeImage(files);
      };
   
    
      /**
       * Formats the size
       */
      formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if(tab >= 1 && tab <=3 ){
                this.setState({
                    activeTab: tab
                });
            }
        }
    }
  handleCitizenship_front=(e)=>{
    let citizenship_front = e.target.files[0];
    this.setState({citizenship_front:citizenship_front});

  }
  handleCitizenship_back=(e)=>{
    let citizenship_back = e.target.files[0];
    this.setState({citizenship_back:citizenship_back})
  }
  handlePhoto=(e)=>{
    let photo = e.target.files[0];
    this.setState({photo:photo});

    
  }
  
  handleUpload=(e)=>{
    console.log(this.state);
    console.log("hello ",this.state.selectedFiles[0].name);
    console.log("Upload called");
    this.setState({loading:true})
    this.setState({verified:null})

    this.setState({citizen_no:null})
    this.setState({full_name:""})
    this.setState({address:""})
    this.setState({ward_no:""})


    let citizenship_front = this.state.selectedFiles[0];
    let citizenship_back = this.state.selectedFilesBack[0];
    let photo = this.state.selectedFilesPP[0];

    let formdata = new FormData()
    formdata.append("citizenship_front",citizenship_front)
    formdata.append("citizenship_back", citizenship_back)
    formdata.append("photo", photo)
    this.setState({upload_disabled:true})    




    axios({
      // url : "http://mangaleshworagrovet.com/text",
	    url: "http://127.0.0.1:8000/text",
      // url: "http://mangaleshworagrovet.com/text",
      method: "POST",
      headers : {
        "Content-Type":"multipart/form-data",
      },
      data:formdata,
    }).then((res)=>{
      console.log(res.data)
      // this.setState({verified: res.data["verified"]})
      this.setState({loading:false})
      this.setState({upload_disabled:false})
      this.setState({citizen_no: res.data["citizen_no"]})
      this.setState({full_name: res.data["full_name"]})
      this.setState({area: res.data["p_address_area"]})
      this.setState({address:res.data["p_address_district"]})
      this.setState({ward_no:res.data["p_address_ward_no"]})
      this.setState({dob_year:res.data["dob_year"]})
      this.setState({dob_month:res.data["dob_month"]})
      this.setState({dob_day:res.data["dob_day"]})
      this.setState({sex: res.data["sex"]})
      this.setState({birth_place_area: res.data["birth_place_area"]})
      this.setState({birth_place_district: res.data["birth_place_district"]})
      this.setState({birth_place_ward_no:res.data["birth_place_ward_no"]})

      // this.props.data({...this.state})
    })
    axios({
      // url : "http://mangaleshworagrovet.com/text",
	    url: "http://127.0.0.1:8000/face",
      // url: "http://mangaleshworagrovet.com/text",
      method: "POST",
      headers : {
        "Content-Type":"multipart/form-data",
      },
      data:formdata,
    }).then((res)=>{
      console.log(res.data)
      this.setState({verified: res.data["verified"]})
      this.setState({loading:false})
      this.setState({upload_disabled:false})
      // this.setState({citizen_no: res.data["citizen_no"]})
    })
  }

  render(){
    console.log("files",this.state.selectedFiles)
    let message = "";
    // if (this.state.verified === true){
    //   message = <div className="message">They are the same person</div>;
    // }else if (this.state.verified === false){
    //   message = <div className="message">They are not the same person</div>;
    // }else if (this.state.loading===true){
    //   message= <div className="loader">Loading</div>;
    // }
    // let cno = "";
    // if (this.state.citizen_no != null){
    //   cno = <div className="details">Citizenship ID number:<h3>{this.state.citizen_no}</h3></div>
    // }
    // let full_name = "";
    // if (this.state.full_name !== ""){
    //   full_name = <div className="details">Applicant Name:<h2>{this.state.full_name}</h2></div>
    // }
    // let address = "";
    // if (this.state.address !== ""){
    //   address = <div className="details">Address:<h2>{this.state.address}</h2></div>
    // }
    // let ward_no = "";
    // if (this.state.ward_no !== ""){
    //   ward_no = <div className="details">Ward number:<h2>{this.state.ward_no}</h2></div>
    // }
    return(  
      <div className="form-container"> 
      <div className="form-area">
        <div className="heading">
          <div style={{width:'8%',height:'100%'}}><img src={logo} alt="dont have img" style={{height:'100%'}}/></div>
        </div>
        <div style={{width: '100%'}}>     
       
            {this.state.full_name?
        <div style={{width:"70%",display: "flex",justifyContent: "center",marginLeft:'15%'}}>
                    <Form>
                      <div className="form-title-bar"> 
                      <h3>Your Form Is Ready</h3>
                     </div>
                  <Form.Group controlId="formGridState">
                  <Form.Label>Bank</Form.Label>
                  <Form.Control as="select" defaultValue="Choose your bank">
                    <option>Choose your bank</option>
                    <option>NIC ASIA,Sorkhutte</option>
                    <option>Global IME,Tangal</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group  controlId="formGridEmail">
                  <Form.Label>Citizenship Number</Form.Label>
                  <Form.Control type="text" value={this.state.citizen_no} />
                </Form.Group>

                <Form.Group  controlId="formGridPassword">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" value={this.state.full_name} />
                </Form.Group>
              

              <div className="form-title-bar"><h3>Birth Address</h3></div>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>District</Form.Label>
                <Form.Control type="text" value={this.state.birth_place_district}/>
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Muncipality</Form.Label>
                <Form.Control type="text" value={this.state.birth_place_area}/>
              </Form.Group>

            
                <Form.Group  controlId="formGridCity">
                  <Form.Label>Ward no</Form.Label>
                  <Form.Control type="text" value={this.state.birth_place_ward_no}/>
                </Form.Group>

              <div className="form-title-bar"><h3>Permanent Address</h3></div>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>District</Form.Label>
                <Form.Control type="text" value={this.state.address}/>
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Muncipality</Form.Label>
                <Form.Control type="text" value={this.state.area}/>
              </Form.Group>

            
                <Form.Group  controlId="formGridCity">
                  <Form.Label>Ward no</Form.Label>
                  <Form.Control type="text" value={this.state.ward_no}/>
                </Form.Group>


                
              

            <Form.Group >
                  <Form.Label as="legend" column sm={2}>
                  <h4>Gender</h4>
                  </Form.Label>
                  <div style={{display:'flex',justifyContent: 'space-between'}}> 
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                    <Form.Check
                      type="radio"
                      label="Others"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios3"
                    />
                    </div>
                  
                </Form.Group>
            <Form.Group >
                  <Form.Label as="legend" column md={2}>
                  <h4 style={{width:"223px"}}>Relaionship Status</h4>
                  </Form.Label>
                  <div style={{display:'flex',justifyContent: 'space-between'}}> 
                    <Form.Check
                      type="radio"
                      label="Married"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      type="radio"
                      label="Unmarried"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                  
                      </div>
                    
                  </Form.Group>
              <h3>Date Of Birth</h3> 
                  <Form.Group controlId="formGridZip">
                    <Form.Label>Year</Form.Label>
                    <Form.Control value={this.state.dob_year}/>
                  </Form.Group>

                  <Form.Group controlId="formGridZip">
                    <Form.Label>Month</Form.Label>
                    <Form.Control value={this.state.dob_month} />
                  </Form.Group>

                  <Form.Group controlId="formGridZip">
                    <Form.Label>Day</Form.Label>
                    <Form.Control value={this.state.dob_day}/>
                  </Form.Group>

              <h3>Contact Information</h3> 
              <Form.Row>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Mobile no. 1</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group  as={Col} controlId="formGridZip">
                    <Form.Label>Mobile no. 2</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  </Form.Row>
              <Form.Row>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Landline no. 1</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group  as={Col} controlId="formGridZip">
                    <Form.Label>Landline no. 2</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridZip">
                    <Form.Label>Email</Form.Label>
                    <Form.Control />
                  </Form.Group>
              
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
        </div>
        
      
        
        :
        <form style={{display:'flex',flexDirection:'column'}}>
                <div  style={{display:"flex",height:'20rem',justifyContent:"space-between",margin:'10px'}}>                               
            <Row className="dropzone-outlook">
              <Col md={12} style={{height:'106px'}}> 
                        <Dropzone
                        onDrop={acceptedFiles =>
                        this.handleAcceptedFiles(acceptedFiles)
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                            <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                            >
                            <input {...getInputProps()} />
                            <div className="mb-3" style={{height:'120px'}}>
                                <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                            </div>
                            <h4 style={{height:'15rem'}}>Drop Your Citizenship Front Image Here.</h4>
                            </div>
                        </div>
                        )}
                    </Dropzone>
                    <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                    >
                        {this.state.selectedFiles.map((f, i) => {
                        return (
                            <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                            >
                            <div className="p-2">
                                <Row className="align-items-center">
                                <Col className="col-auto">
                                    <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                    />
                                </Col>
                                <Col>
                                    <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                    >
                                    {f.name}
                                    </Link>
                                    <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                    </p>
                                </Col>
                                </Row>
                            </div>
                            </Card>
                        );
                        })}
                    </div>
                    </Col>
                    </Row>


            <Row className="dropzone-outlook">
<Col md={12} style={{height:'106px'}}> 
                                        <Dropzone
                                        onDrop={acceptedFiles =>
                                        this.handleAcceptedFilesBack(acceptedFiles)
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                        <div className="dropzone">
                                            <div
                                            className="dz-message needsclick mt-2"
                                            {...getRootProps()}
                                            >
                                            <input {...getInputProps()} />
                                            <div className="mb-3" style={{height:'120px'}}>
                                                <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                            </div>
                                            <h4 style={{height:'15rem'}}>Drop Your Citizenship Back Image Here.</h4>
                                            </div>
                                        </div>
                                        )}
                                    </Dropzone>
                                    <div
                                        className="dropzone-previews mt-3"
                                        id="file-previews"
                                    >
                                        {this.state.selectedFilesBack.map((f, i) => {
                                        return (
                                            <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                            key={i + "-file"}
                                            >
                                            <div className="p-2">
                                                <Row className="align-items-center">
                                                <Col className="col-auto">
                                                    <img
                                                    data-dz-thumbnail=""
                                                    height="80"
                                                    className="avatar-sm rounded bg-light"
                                                    alt={f.name}
                                                    src={f.preview}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                    to="#"
                                                    className="text-muted font-weight-bold"
                                                    >
                                                    {f.name}
                                                    </Link>
                                                    <p className="mb-0">
                                                    <strong>{f.formattedSize}</strong>
                                                    </p>
                                                </Col>
                                                </Row>
                                            </div>
                                            </Card>
                                        );
                                        })}
                                    </div>
                                    </Col>
                                    </Row>

                                 <Row className="dropzone-outlook">
                                    <Col md={12} style={{height:'106px'}}> 
                                      <Dropzone
                                      onDrop={acceptedFiles =>
                                      this.handleAcceptedFilesPP(acceptedFiles)
                                      }
                                  >
                                      {({ getRootProps, getInputProps }) => (
                                      <div className="dropzone">
                                          <div
                                          className="dz-message needsclick mt-2"
                                          {...getRootProps()}
                                          >
                                          <input {...getInputProps()} />
                                          <div className="mb-3" style={{height:'120px'}}>
                                              <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                          </div>
                                          <h4 style={{height:'15rem'}}>Drop Your PPSizePhoto Image Here.</h4>
                                          </div>
                                      </div>
                                      )}
                                  </Dropzone>
                                  <div
                                      className="dropzone-previews mt-3"
                                      id="file-previews"
                                  >
                                      {this.state.selectedFilesPP.map((f, i) => {
                                      return (
                                          <Card
                                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                          key={i + "-file"}
                                          >
                                          <div className="p-2">
                                              <Row className="align-items-center">
                                              <Col className="col-auto">
                                                  <img
                                                  data-dz-thumbnail=""
                                                  height="80"
                                                  className="avatar-sm rounded bg-light"
                                                  alt={f.name}
                                                  src={f.preview}
                                                  />
                                              </Col>
                                              <Col>
                                                  <Link
                                                  to="#"
                                                  className="text-muted font-weight-bold"
                                                  >
                                                  {f.name}
                                                  </Link>
                                                  <p className="mb-0">
                                                  <strong>{f.formattedSize}</strong>
                                                  </p>
                                              </Col>
                                              </Row>
                                          </div>
                                          </Card>
                                      );
                                      })}
                                  </div>
                                  </Col>
                                  </Row>
                                  </div>
          {/* <div className="file-area">
          <div className="upload-area">
          <div className="image-name">{this.state.citizenship_front ? this.state.citizenship_front.name : "Not uploaded" }</div>
          <input  type="file" name = "citizenship_front" onChange = {(e)=>this.handleCitizenship_front(e)} id="citizenship_front"/>
          <label htmlFor="citizenship_front" className = "upload"  >Upload Citizenship_front</label>
          </div>
          <div className="upload-area">
          <div className="image-name">{this.state.citizenship_back ? this.state.citizenship_back.name : "Not uploaded" }</div>
          <input  type="file" name = "citizenship_back" onChange = {(e)=>this.handleCitizenship_back(e)} id="citizenship_back"/>
          <label htmlFor="citizenship_back" className = "upload"  >Upload citizenship_back</label>
          </div>
          <div className="upload-area">
          <div className="image-name">{this.state.photo ? this.state.photo.name : "Not uploaded" }</div>
          <input type="file" name = "photo" onChange = {(e)=>this.handlePhoto(e)} id="photo"/>
          <label htmlFor="photo" className = "upload" >Upload Photo</label>
          </div>
          </div> */}
        <Row style={{margin:"185px",marginTop: '205px',marginBottom: '25px'}}>
          <Col style={{display:"flex",justifyContent: 'center'}}>
        <Button style={{width :'150px',height: '52px'}} type = "button" className='lg' disabled={this.state.upload_disabled} onClick={e=>this.handleUpload(e)}>Verify</Button>
        </Col>
        </Row>
        </form>
  }
  </div>

      <div className="message-area">{message}</div>
      {/* {cno}
      {full_name}
      {address}
      {ward_no}
       */}
        </div>
        </div>
      

    );
  }

}

export default FormKYC;
