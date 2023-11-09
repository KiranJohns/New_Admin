import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
// image

import careLogo from "../../images/activity-img/logo7.png"

import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function Register(props) {
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');

    //modal

    let subtitle;
    let button;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
  
      subtitle.style.color = '#f00';
      button.style.background ="red"
      button.style.padding ="1rem"
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  
    //modal end

    const dispatch = useDispatch();
    const navigate = useNavigate()
    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
			swal('Oops', errorObj.email, "error");
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
			swal('Oops', errorObj.password, "error");
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(signupAction(email, password, navigate));
    }
  return (
    <div className="authincation h-100 p-meddle">

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button ref={(_button) => (button = _button)}>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>

      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login" >
                        <img style={{width:'17rem'}} src={careLogo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Change your password</h4>
                      {props.errorMessage && (
                        <div className=''>
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className=''>
                          {props.successMessage}
                        </div>
                      )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Registered Email"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>OTP</strong>
                        </label>
                        <input
							defaultValue={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
							placeholder="Enter OTP"
                        />
                      </div>
					  {errors.email && <div>{errors.email}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>New Password</strong>
                        </label>
                        <input
							defaultValue={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
							className="form-control"
							placeholder="Enter New Password"
                          //defaultValue="Password"
                        />
                      </div>
					  {errors.password && <div>{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          // onClick={openModal}
                        >
                         Change Password
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        No need to change password{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);

