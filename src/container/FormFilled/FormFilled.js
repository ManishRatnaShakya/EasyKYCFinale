import React from 'react';

class FormFilled extends React.Component {
    state={
        address:[]
    }
    componentDidMount() {
        setInterval(() =>
       this.setState({address: this.props.address})
        ,
        3000)
    }
    
    render(){
        console.log("files from form filled",this.props.address)
        return(
            <div>
                hello world
                {}
                {this.state.address?<p>  { this.props.address}</p>: <p>loading</p>  }
            </div> 
        )
    }
}
export default FormFilled;