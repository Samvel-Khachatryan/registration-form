import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state={
            pname:'',
            surName:'',
            phone:'',
            age:'',
            sex:'',
            email:'',
            password:'',
            confirmPass:'',
            errors:[],
        }
    }
    onFormChange =(e)=>{
        const key=e.target.name;
        const value=e.target.value;
        this.setState({
            ...this.state,
            [key]:value,
        })
        switch (key) {
            case 'pname':
                if(value.length<3){
                    if(!this.state.errors.filter(error=>error[key]).length){
                        this.state.errors.push({
                            [key]:'Անվան Նվազագույն երկարությունը 2 նիշ'
                        })
                        this.setState({
                            ...this.state,
                            [key]:value,
                            errors: this.state.errors
                        })
                    }
                }else{
                    const fileteredErrors = this.state.errors.filter(error=>!error[key]);
                    this.setState({
                        ...this.state,
                        [key]:value,
                        errors:fileteredErrors,
                    })
                }
                break;
            case 'surName':
                if(value.length<4){
                    if(!this.state.errors.filter(error=>error[key]).length){
                        this.state.errors.push({
                            [key]:'Ազգանվան Նվազագույն երկարությունը 4 նիշ'
                        })
                        this.setState({
                            ...this.state,
                            [key]:value,
                            errors: this.state.errors
                        })
                    }
                }else{
                    this.setState({
                        ...this.state,
                        [key]:value,
                        errors:this.state.errors.filter(error=>!error[key])
                    })
                }
                break;
            case 'phone':
                if( !/^\d+$/.test(value)){
                    if(!this.state.errors.filter(error=>error[key]).length){
                        this.state.errors.push({
                            [key]:'Խնդրում ենք մուտքագրել միայն թվանշաններ'
                        })
                        this.setState({
                            ...this.state,
                            [key]:value,
                            errors: this.state.errors
                        })
                    }
                }else{
                    this.setState({
                        ...this.state,
                        [key]:value,
                        errors:this.state.errors.filter(error=>!error[key])
                    })
                }
                break;

            case 'age':
                let ageReg= /^\d+$/;
                if(!ageReg.test(value)){
                    if(!this.state.errors.filter(error=>error[key]).length){
                        this.state.errors.push({
                            [key]:'Խնդրում ենք մուտքագրել միայն թվանշաններ'
                        })
                        this.setState({
                            ...this.state,
                            [key]:value,
                            errors: this.state.errors
                        })
                    }
                }else{
                    this.setState({
                        ...this.state,
                        [key]:value,
                        errors:this.state.errors.filter(error=>!error[key])
                    })
                }
                break;
            case 'email':
                let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if( !emailReg.test(value)){
                    if(!this.state.errors.filter(error=>error[key]).length){
                        this.state.errors.push({
                            [key]:'Խնդրում ենք մուտքագրել ճիշտ էլ հասցե'
                        })
                        this.setState({
                            ...this.state,
                            [key]:value,
                            errors: this.state.errors
                        })
                    }
                }else{
                    this.setState({
                        ...this.state,
                        [key]:value,
                        errors:this.state.errors.filter(error=>!error[key])
                    })
                }
                break;
            case 'password':
                let passReg=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^()/'"_&*])(?=.{6,})/
                if( !passReg.test(value)){
                    if(!this.state.errors.filter(error=>error[key]).length){
                        this.state.errors.push({
                            [key]:'Գաղտնաբառը պետք է պարունակի առնվազն 1 մեծատառ, 1 սիմվոլ, 1 թվանշան, մինիմալ երկարությունը՝ 6 նիշ'
                        })
                        this.setState({
                            ...this.state,
                            [key]:value,
                            errors: this.state.errors
                        })
                    }
                }else{
                    this.setState({
                        ...this.state,
                        [key]:value,
                        errors:this.state.errors.filter(error=>!error[key])
                    })
                }
                break;
            case 'confirmPass':
                if( value!==this.state.password){
                    if(!this.state.errors.filter(error=>error[key]).length){
                        this.state.errors.push({
                            [key]:'Գաղտնաբառերը պետք է համապատասխանեն'
                        })
                        this.setState({
                            ...this.state,
                            [key]:value,
                            errors: this.state.errors
                        })
                    }
                }else{
                    this.setState({
                        ...this.state,
                        [key]:value,
                        errors:this.state.errors.filter(error=>!error[key])
                    })
                }
                break;
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let myData = fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
        });
        console.log(myData);
    }
    render() {
        console.log(this.state)
        return (
            <form style={{border:'3px solid gray'}} onSubmit={this.handleSubmit} className='demoForm'>
                <h2>Գրանցում</h2>

                    <label htmlFor='pname'>Անուն</label><br/>
                    <input required onChange={this.onFormChange} value={this.state.name} type='text' name='pname'/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.pname)?this.state.errors.find(error=>error.pname).pname:null}</div><br/>

                    <label htmlFor='surName'>Ազգանուն</label><br/>
                    <input required onChange={this.onFormChange} defaultValue={this.state.name} value={this.state.name} type='text' name='surName'/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.surName)?this.state.errors.find(error=>error.surName).surName:null}</div><br/>

                    <label htmlFor='phone'>Հեռախոսի համար</label><br/>
                    <input onChange={this.onFormChange} value={this.state.name} type='text' name='phone'/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.phone)?this.state.errors.find(error=>error.phone).phone:null}</div><br/>

                    <label htmlFor='age'>Տարիք</label><br/>
                    <input onChange={this.onFormChange} value={this.state.name} type='text' name='age'/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.age)?this.state.errors.find(error=>error.age).age:null}</div><br/>

                    <label htmlFor='sex'>Սեռ</label><br/>
                    Արական։<input type="radio" name="sex" value="1"/>  Իգական։<input type="radio" name="sex" value="0"/><br/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.sex)?this.state.errors.find(error=>error.sex).sex:null}</div><br/>

                    <label htmlFor='email'>Էլեկտրոնային հասցե</label><br/>
                    <input required onChange={this.onFormChange} value={this.state.name} type='text' name='email'/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.email)?this.state.errors.find(error=>error.email).email:null}</div><br/>

                    <label htmlFor='password'>Գաղտնաբառ</label><br/>
                    <input required onChange={this.onFormChange} value={this.state.password} type='password' name='password'/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.password)?this.state.errors.find(error=>error.password).password:null}</div><br/>

                    <label htmlFor='confirmPass'>Հաստատել գաղտնաբառը</label><br/>
                    <input required onChange={this.onFormChange} value={this.state.confirmPass} type='password' name='confirmPass'/><br/>
                    <div className={'errormsg'}>{this.state.errors.find(error=>error.confirmPass)?this.state.errors.find(error=>error.confirmPass).confirmPass:null}</div><br/>
                    <button style={{backgroundColor: '#4CAF50',borderRadius:'5px',width:'50px',height:'35px'}} type='submit' onClick={this.formSubmit} >Sign up</button>
            </form>
        )
    }
}

export default Form;