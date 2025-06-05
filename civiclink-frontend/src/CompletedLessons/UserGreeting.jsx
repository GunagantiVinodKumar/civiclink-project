import PropTypes  from "prop-types";
function UserGreeting(props){
    
    const welcome= <h2 className="welcome">Welcome {props.username}</h2>
    const login= <h2 className="login">Please try to login</h2>

    return (props.isLoggedin)? welcome :login;
}
// UserGreeting.prototype={
//     isLoggedin:PropTypes.bool,
//     username:PropTypes.string,
// }
// // UserGreeting.defaultProps={
// //     isLoggedin:flase,
// //     username:"Guest",
// // }
export default UserGreeting