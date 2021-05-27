import React, {Component} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
// import TextField from 'material-ui/TextField';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import Paper from 'material-ui/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            Address:'',
            password: '',
            confirmPassword: '',
            emailerrortext: '',
            confirmPasswordErrorText: '',
            type: 'applicant',
            date:null,
            
            success:0
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        
    }
    
    validateEmail(e) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    } 

    onChangeEmail(event){
        var errortext=''
        if(!this.validateEmail(event.target.value)){
            errortext="email not excepted"
        }
        this.setState({ emailerrortext: errortext , email: event.target.value })
    }

    onChangeAddress(event){
        this.setState({ Address: event.target.value })
    }

   
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }


   
    onChangePassword(event){
        this.setState({ password: event.target.value });
    }


    onChangeConfirmPassword(event){
        var errortext = ''
        if(event.target.value != this.state.password){
            errortext = 'password are not matched'
        }
        this.setState({ confirmPassword: event.target.value , confirmPasswordErrorText: errortext });
    }

    

    onSubmit(event) {
        event.preventDefault();
        const userAdd = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userAdd)
        axios.get('http://localhost:4000/user/user', userAdd)
        .then(res => { 
            var tmpflag = 0
            var temp = "none";
            console.log(res);
            for(var i=0;i<res["data"].length;i++)
            {
                if(res["data"][i]["email"] === userAdd["email"])
                {
                    tmpflag = 1;
                    temp = res["data"][i]["type"];
                    break;
                }
            }
            if(tmpflag)
            {
                console.log("already registered");
                alert("already registered");
            }
            else
            {
                if((this.state.confirmPasswordErrorText=='' && this.state.emailerrortext=='') && (this.state.password.length>=6)){   
                    const rounds = 1;
                    console.log(this.state.password);
                    const hash = bcrypt.hashSync(this.state.password,rounds);
                    const newUser = {
                        name: this.state.name,
                        email: this.state.email,
                        Address: this.state.Address,
                        password: hash,
                        type: this.state.type,
                        date: Date.now(),
                       
                    }
                    console.log(this.state.password);
                    console.log(hash);
                    console.log(newUser);
                    
                    axios.post('http://localhost:4000/user/register', newUser)
                }
                else if(this.state.password.length<6){
                    alert("password length should be atleast 6");console.log("short password");
                }
                else{
                    alert("email format is wrong");console.log("email format is wrong");
                }
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    
                    type: 'applicant',
                    date:null,
                    
                }); 
            }
        })
        .catch(err => { 
            console.log(err) 
        });
    }

    

   

    onSubmitEdu(e){
        e.preventDefault();
        const obj = {
            institution: this.state.institution,
            startyear: this.state.startyear,
            endyear: this.state.endyear
        }

        if(this.state.institution === '' || this.state.startyear === ''){
            alert("you cannot leave institution and startyear feild empty.")
        }
        else{
            let e1 = this.state.education;
            e1.push(obj);
            this.setState({
            education: e1,
            institution: '',
            startyear: '',
            endyear: ''
        });
        }
        
    }

    render() {

        return (
            this.state.success == 1 ? window.location.href='/login' :
            <Container  component="main" maxWidth="xs">
                <CssBaseline /> 
                <div className="form-group"/>
                {/* </div>                */}
                <div style={{paddingLeft:170}}>              
                    <Avatar />                    
                    {/* </Avatar>  */}
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={this.onChangeUsername}
                                />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />  
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                />  
                        </div>

                        <div className="form-group">
                            <label>Confirm Password: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.confirmPassword}
                                onChange={this.onChangeConfirmPassword}
                                />  
                        </div>

                        
                        <div className="form-group">
                            <label>Address: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.Adress}
                                onChange={this.onChangeAddress}
                                />  
                        </div>


                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </Container>
        )
    }
}