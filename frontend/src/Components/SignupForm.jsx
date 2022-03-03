import React, { Component } from "react";
import AuthService from "../services/auth.service";
import styled from "styled-components";
// import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  z-index: 0;
  display: flex;
  justify-content: center;
  // background-color: white;
  opacity: 0.97;
  height: 100%;
  margin: 1rem;
  border-radius: 1rem;
`;

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
`;

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 20rem;
`;

const CardTitle = styled.h2`
  font-size: 30px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  font-weight: 500;
  color: rgb(255, 87, 54);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const FormLabel = styled.label`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(13, 32, 89);
  text-decoration: none;
  margin: 0;
`;

const FormInput = styled.input`
  z-index: 1;
  opacity: 1;
  border: none;
  padding: 10px;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  background-color: #ff5736;
  color: white;
  width: 100%;
`;

// const ProfilePicture = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const ProfileImage = styled.img`
//   // border: solid 3px red;

//   border-radius: 50%;
//   width: 10rem;
//   height: 10rem;
// `;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
    };
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleRegister(e) {
    e.preventDefault();
    this.setState({
      successful: false,
    });
    AuthService.register(
      this.state.username,
      this.state.email,
      this.state.password
    ).then(
      () => {
        this.setState({
          successful: true,
        });
        this.props.history.push("/login");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.setState({
          successful: false,
        });
      }
    );
  }
  render() {
    return (
      <PageWrapper>
        <Container>
          <CardTitle>
            Inscris-toi et
            <br /> Rejoins-nous !
          </CardTitle>
          <FormCard onSubmit={this.handleRegister}>
            {!this.state.successful && (
              <div>
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
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
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
                  <StyledButton>S'inscrire</StyledButton>
                </FormGroup>
                <FormGroup>
                  <a href="/login">Vous avez déjà un compte ?</a>
                </FormGroup>
              </div>
            )}
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
// import { isEmail } from "validator";
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
// const email = value => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };
// const vusername = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };
// const vpassword = value => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };
// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       successful: false,
//       message: ""
//     };
//   }
//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }
//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }
//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }
//   handleRegister(e) {
//     e.preventDefault();
//     this.setState({
//       message: "",
//       successful: false
//     });
//     this.form.validateAll();
//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.username,
//         this.state.email,
//         this.state.password
//       ).then(
//         response => {
//           this.setState({
//             message: response.data.message,
//             successful: true
//           });
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();
//           this.setState({
//             successful: false,
//             message: resMessage
//           });
//         }
//       );
//     }
//   }
//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <Form
//             onSubmit={this.handleRegister}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             {!this.state.successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                     validations={[required, vusername]}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="email"
//                     value={this.state.email}
//                     onChange={this.onChangeEmail}
//                     validations={[required, email]}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={this.state.password}
//                     onChange={this.onChangePassword}
//                     validations={[required, vpassword]}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <button className="btn btn-primary btn-block">Sign Up</button>
//                 </div>
//               </div>
//             )}
//             {this.state.message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
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
