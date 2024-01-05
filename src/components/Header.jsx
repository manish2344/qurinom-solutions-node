// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import './header.css'
import { getTotals } from "../slices/Cart";
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartTotalQuantity } = useSelector((state) => state.cart);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(getTotals )
// console.log(cartTotalQuantity.length)
  const [logoutApiCall] = useLogoutMutation();
dispatch(getTotals)
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='success' variant='dark'   expand='lg' collapseOnSelect className='nav'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'>MANISH</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                {/* <Link to='/cart'>{cart.length}</Link> */}
                <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              <span className="cartlogo__badge">{cartTotalQuantity }</span>
            </span>
          </Link>
          {userInfo.userdata.isAdmin==true ?(
          <NavDropdown title='Admin' id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/addproduct'>
            <NavDropdown.Item>Create</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/alldata'>
            <NavDropdown.Item>Alldata</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
          ):(
            <NavDropdown title={userInfo.userdata.name } id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          {/* <LinkContainer to='/addproduct'>
            <NavDropdown.Item>Create</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/alldata'>
            <NavDropdown.Item>Alldata</NavDropdown.Item>
          </LinkContainer> */}
          <NavDropdown.Item onClick={logoutHandler}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
            )
          
        }
                  

                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
