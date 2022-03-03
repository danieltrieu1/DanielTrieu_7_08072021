import React, { Component } from "react";
import AuthService from "../services/auth.service";
import styled from "styled-components";

const PageWrapper = styled.div`
    z-index: 0;
    display: flex;
    justify-content: center;
    // background-color: white;
    opacity:0.97;
    height: 100%;
    margin: 1rem;
    border-radius: 1rem;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(237, 232, 232);
    border-radius: 1rem;
    // height: 100%;
    padding: 2rem;
    transition: all 0.4s ease-in-out;
    margin: 1rem;
    box-shadow: 0px 0px 20px -10px black;
`

const FormCard = styled.form`

    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 20rem;
`

const CardTitle = styled.h2`
    font-size: 30px;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center; 
    font-weight: 500;
    color: rgb(255, 87, 54);
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`
const FormLabel = styled.label`
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: rgb(13, 32, 89);
    text-decoration: none;
    margin: 0;
`

const FormInput = styled.input`
    z-index: 1;
    opacity: 1;
    border: none;
    padding: 10px;
    border-radius: 4px;
`

const StyledButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
    background-color: #ff5736;
    color: white;
    width: 100%;
`

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          console.log(error)
          this.setState({
            loading: false,
          });
        }
      );
  }
  render() {
    return (
      <PageWrapper>
        <Container>
          <CardTitle>Connecte-toi,<br/> On t'attend !</CardTitle>
          <FormCard
            onSubmit={this.handleLogin}
          >
            <FormGroup>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormInput
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </FormGroup>
            <FormGroup>
              <StyledButton
                className="button"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Se connecter</span>
              </StyledButton>
              <a href='/signup'>Vous n'avez pas de compte ?</a>
            </FormGroup>
          </FormCard>
        </Container>
      </PageWrapper>
    );
  }
}

// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import AuthService from "../services/auth.service";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };
// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.handleLogin = this.handleLogin.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//       message: ""
//     };
//   }
//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }
//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }
//   handleLogin(e) {
//     e.preventDefault();
//     this.setState({
//       message: "",
//       loading: true
//     });
//     this.form.validateAll();
//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.login(this.state.username, this.state.password).then(
//         () => {
//           this.props.history.push("/profile");
//           window.location.reload();
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();
//           this.setState({
//             loading: false,
//             message: resMessage
//           });
//         }
//       );
//     } else {
//       this.setState({
//         loading: false
//       });
//     }
//   }
//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <Form
//             onSubmit={this.handleLogin}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 validations={[required]}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 validations={[required]}
//               />
//             </div>
//             <div className="form-group">
//               <button
//                 className="btn btn-primary btn-block"
//                 disabled={this.state.loading}
//               >
//                 {this.state.loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 <span>Login</span>
//               </button>
//             </div>
//             {this.state.message && (
//               <div className="form-group">
//                 <div className="alert alert-danger" role="alert">
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={c => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }