import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = { 
      position : 'main',
      loading : true,
      person : [],
      name : null,
      email: null,
      age : null,
      editPage : false,
      editId : null
    }

    this.changePositionToUser = this.changePositionToUser.bind(this);
    this.changePositionToMain = this.changePositionToMain.bind(this);
    this.onSubmitFormButton = this.onSubmitFormButton.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this); 
    this.onChangeAge = this.onChangeAge.bind(this); 
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onEditEntry = this.onEditEntry.bind(this);
    this.editBackButton = this.editBackButton.bind(this);
  }

  getAllTheUser(){
    const url = "https://mern-stck-backend.herokuapp.com/users";
    
    axios.get(url)
    .then(res => {
      this.setState({
        loading : false,
        person: res.data
      })
    })
    .catch(err => console.log(err));
  }

  async componentDidMount() {
    this.getAllTheUser();
  }

  changePositionToUser(){
    this.setState({position : 'user', editPage : false , editId : null});
  }

  changePositionToMain(){
    this.setState({position : 'main' , editPage : false , editId : null});
  }

  onChangeFullName(event){
    this.setState({name : event.target.value})
  }

  onChangeEmail(event){
    this.setState({email : event.target.value})
  }

  onChangeAge(event){
    this.setState({age : event.target.value})
  }

  onSubmitFormButton(event){
    event.preventDefault()
    if(this.state.name === null || this.state.email === null || this.state.age === null){
      alert('Some Information is missing');
      return ;
    }    



      axios.post('https://mern-stck-backend.herokuapp.com/users', {
          name : this.state.name,
          age : this.state.age,
          email : this.state.email
      }).then(r =>{
        axios.get('https://mern-stck-backend.herokuapp.com/users')
        .then(res => {
          this.setState({
            loading : false,
              person: res.data,
              position : 'user',
              name : null,
              email: null,
              age : null
          })
        })
        
      })
      .catch(err => console.log(err));   
      
  }
  
  onClickDelete(e){
    const url = 'https://mern-stck-backend.herokuapp.com/users/' + String(e);

    axios.delete(url)
    .then(res => {
      alert('Entry has been deleted');
      this.getAllTheUser();
    })
    .catch(err => console.log(err));
  }

  onClickEdit(e){
    alert('Go to bottom of the Page To Edit The Entry');
    this.setState({
      editPage : true,
      editId : e
    });
  }

  onEditEntry(){
    if(this.state.position !== 'main' && this.state.editPage === true){
        console.log(this.state.editId)
        var url = 'https://mern-stck-backend.herokuapp.com/users/' + String(this.state.editId);
        axios.put(url , {
          name : this.state.name,
          age : this.state.age,
          email : this.state.email
        })
        .then(res => {
          url = 'https://mern-stck-backend.herokuapp.com/users/';

          axios.get(url)
          .then(res => {
            this.setState({
              loading : false,
              person: res.data,
              position : 'user',
              name : null,
              email: null,
              age : null,
              editPage : false,
              editId : null
            })
          })
          .catch(err => console.log(err));
        
        })
        .catch(err => console.log(err))

    }
  }
  

  editBackButton(){
    this.setState({
      position : 'user',
      editPage : false,
      editId : null
    })
  }



  render() {
    
    return (
      <div className = 'App'>
        <nav>
          <h1>Welcome to Crud-App</h1>
          {
              this.state.position === 'main' ?
              <div>
                  <p className = 'to-the-left' onClick = {this.changePositionToUser}>Check all Friends</p>
              </div>
              :
              <div>
                  <p className = 'to-the-left' onClick = {this.changePositionToMain}> Back to Main Page</p>
              </div>
              

          };
        </nav>
        <main>
          {
            this.state.position === 'main' ? 
            <div className = 'content'>
              <form onSubmit= {this.onSubmitFormButton}>
                <label >Full Name</label>
                <input type="text" className = 'entry-value'  placeholder="Your Full-Name.." onChange = {this.onChangeFullName} />

                <label >Email</label>
                <input type="text" className = 'entry-value'  placeholder="Your Email.." onChange = {this.onChangeEmail} />

        
                <label>Age</label>
                <input type="number" className = 'entry-value'  placeholder="Your Age.." onChange = {this.onChangeAge}  />
              
                <button type="submit" value="Submit">Add Friend! </button>

              </form>

            </div>
            :
            <div>
              {
                this.state.loading !== true && this.state.position === 'user' && this.state.person.length !== 0?
                
                  <div>
                    
                    <table className = 'user-info'>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                          </tr>
                        </thead>
                          {
                            this.state.person.map(user =><tbody key = {user._id}>
                                                      <tr>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.age}</td>
                                                        <td><button  onClick = {() => this.onClickEdit(user._id)}>Edit</button></td>
                                                        <td><button onClick = {() => this.onClickDelete(user._id)}>Delete!</button></td>
                                                      </tr>
                                                </tbody>)
                          }

                    </table>
                  </div>

                :
                <div className = 'empty-entry'>
                    <p>You have no Friends .. Please go out and make some Friends</p>
                </div>
              }

            </div>
          }

        </main>

        <footer>
          
          {
            this.state.editPage === true && this.state.position !== 'main' ?
            <div>
              <h4>Edit Your Entry Below!</h4>
              <div className = 'edit-things'>
                
                <button onClick = {this.editBackButton}>Cancel!</button>
                <input type = 'text' placeholder= 'name' onChange = {this.onChangeFullName}/>
                <input type = 'email' placeholder= 'email' onChange = {this.onChangeEmail}/>
                <input type = 'number' placeholder= 'age' onChange = {this.onChangeAge}/> 
                <button onClick = {this.onEditEntry}>Edit</button>             
              </div>
            </div>

            
            :
            <div>

            </div>
          }
        </footer>
        


      </div>
    )
  }
}

export default App;