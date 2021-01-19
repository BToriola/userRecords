import React, { Component } from 'react';
import { Modal, Form, Button, InputGroup, FormControl, Col, Row } from "react-bootstrap";
import './App.css';
import './record.css'

import Pagination from './components/Pagination';

class App extends Component {



  state = { allUsers: [], currentUsers: [], currentPage: null, totalPages: null, displaySearch: '', searchedCustomers: [], filterStr: '', paymentStr: '', marvelHeroes: [], filterState: false }

  // componentDidMount() {
  //   const { data: allCountries = [] } = Countries.findAll();
  //   this.setState({ allCountries });
  // }

  componentDidMount() {
    fetch('https://api.enye.tech/v1/challenge/records')
      .then(response => response.json())
      .then(profiles => { this.setState({ allUsers: profiles.records.profiles }) })
      .catch(error => console.log('Error:', error));
  }

  onPageChanged = data => {
    const { allUsers } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = allUsers.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  }

  handleChange = (e) => {
    let text = e.target.value
    let text2 = text.toLowerCase().trim()
    if (e.target.value === '') {
      this.setState({ displaySearch: false })
    }
    else {
      this.setState({ displaySearch: !false })
      let searchedCustomers = this.state.allUsers.filter(customer => customer.FirstName.toLowerCase() == text2 || customer.LastName.toLowerCase() == text2 || customer.PhoneNumber.toLowerCase() == text2 || customer.DomainName.toLowerCase() == text2 || customer.Email.toLowerCase() == text2 || customer.LastLogin.toLowerCase() == text2 || customer.PaymentMethod.toLowerCase() == text2 || customer.Gender.toLowerCase() == text2 || customer.CreditCardType.toLowerCase() == text2 || customer.CreditCardNumber.toLowerCase() == text2 || customer.URL.toLowerCase() == text2 || customer.MacAddress.toLowerCase() == text2 || customer.Longitude.toLowerCase() == text2 || customer.Latitude.toLowerCase() == text2);
      this.setState({ searchedCustomers })
      console.log('Searched Customer is ', searchedCustomers)
    }
  }

  render() {



    const { allUsers, currentUsers, currentPage, totalPages } = this.state;
    const totalUsers = allUsers.length;

    if (totalUsers === 0) return null;

    // const { filterStr } = this.state;
    // this.setState({ filterStr: 'cat' })


    const { filterStr, paymentStr } = this.state;

    // const filteredElements =  allUsers
    //   .filter(e => e.includes(filterStr))
    //   .map(e => <li>{e}</li>)

    // const filteredElements = allUsers.filter(e => e.includes(filterStr))
    //   .map(e => <li>{e}</li>)
    console.log(allUsers)
    const genderFilter = allUsers.filter(function (hero) {
      console.log(filterStr)
      if (filterStr == '') {
      }
      return hero.Gender == filterStr;
    });
    console.log(genderFilter);

    const paymentFilter = allUsers.filter(function (hero) {
      return hero.PaymentMethod == paymentStr;
    });
    console.log(paymentFilter);

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">

          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">

              <h2 className={headerClass}>
                <strong className="text-secondary">{totalUsers}</strong> User Records
              </h2>

              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}

            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalUsers} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
          <Form>
            <Form.Group as={Row} className="mb-2 mr-sm-2" >
              <Form.Row>
                <InputGroup className="mb-2 mr-sm-2">
                  <Col sm="10">
                    <FormControl id="inlineFormInputGroupUsername2" placeholder="Search" className="mb-2 mr-sm-2 " style={{ padding: 10, width: 250 }} onChange={(e) => this.handleChange(e)} />
                  </Col>
                </InputGroup>
              </Form.Row>
            </Form.Group>
          </Form>
          <div class="form-group form-inline">

            <select class="form-control form-control-sm" id="exampleFormControlSelect1" placeholder="Filter by gender" value={filterStr}
              onChange={e => this.setState({ filterStr: e.target.value, displaySearch: true })} >
              <option value="" disabled selected>Filter by gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer to skip">Prefer to skip</option>
            </select>
          </div>
          <div class="form-group form-inline">
            <select class="form-control form-control-sm" id="exampleFormControlSelect1" placeholder="Filter by payment" value={paymentStr}
              onChange={e => this.setState({ paymentStr: e.target.value, displaySearch: true })} >
              <option value="" disabled selected>Filter by payment check</option>
              <option value="check">check</option>
              <option value="paypal">paypal</option>
              <option value="cc">cc</option>
              <option value="money order">money order</option>
            </select>
          </div>
          <div style={{ width: 120, paddingBottom: 40 }}>
            <button type="button" className="btn btn-secondary btn-sm btn-inline" onClick={() => window.location.reload()}>Reset</button>
          </div>

          {/* <div>
            <input
              type="text"
              value={filterStr}
              onChange={e => this.setState({ filterStr: e.target.value, displaySearch:true })} />
           
           
          </div> */}
          <div className="table-responsive">
            <table class="table table-striped table-hover table-dark table-sm ">
              <thead>
                <tr className="bg-primary">
                  <th scope="row">FirstName</th>
                  <th scope="row">LastName</th>
                  <th>Gender</th>
                  <th>Lat</th>
                  <th>Long</th>
                  <th>CCNumber</th>
                  <th>CCType</th>
                  <th>Email</th>
                  <th>DomainName</th>
                  <th>Phone</th>
                  <th>MacAddress</th>
                  <th>URL</th>
                  <th>UserName</th>
                  <th>LastLogin</th>
                  <th>PaymentMethod</th>
                </tr>
              </thead>
              <tbody>
                {this.state.displaySearch == false && currentUsers.map(item => {
                  return (
                    <tr>
                      <td>{item.FirstName}</td>
                      <td>{item.LastName}</td>
                      <td>{item.Gender}</td>
                      <td>{item.Latitude}</td>
                      <td>{item.Longitude}</td>
                      <td>{item.CreditCardNumber}</td>
                      <td>{item.CreditCardType}</td>
                      <td>{item.Email}</td>
                      <td>{item.DomainName}</td>
                      <td>{item.PhoneNumber}</td>
                      <td>{item.MacAddress}</td>
                      <td>{item.URL}</td>
                      <td>{item.UserName}</td>
                      <td>{item.LastLogin}</td>
                      <td>{item.PaymentMethod}</td>
                    </tr>
                  )
                })}
                {this.state.searchedCustomers.map(item => {
                  return (
                    <tr>
                      <td>{item.FirstName}</td>
                      <td>{item.LastName}</td>
                      <td>{item.Gender}</td>
                      <td>{item.Latitude}</td>
                      <td>{item.Longitude}</td>
                      <td>{item.CreditCardNumber}</td>
                      <td>{item.CreditCardType}</td>
                      <td>{item.Email}</td>
                      <td>{item.DomainName}</td>
                      <td>{item.PhoneNumber}</td>
                      <td>{item.MacAddress}</td>
                      <td>{item.URL}</td>
                      <td>{item.UserName}</td>
                      <td>{item.LastLogin}</td>
                      <td>{item.PaymentMethod}</td>
                    </tr>
                  )
                })}
                {genderFilter.map(item => {
                  return (
                    <tr>
                      <td>{item.FirstName}</td>
                      <td>{item.LastName}</td>
                      <td>{item.Gender}</td>
                      <td>{item.Latitude}</td>
                      <td>{item.Longitude}</td>
                      <td>{item.CreditCardNumber}</td>
                      <td>{item.CreditCardType}</td>
                      <td>{item.Email}</td>
                      <td>{item.DomainName}</td>
                      <td>{item.PhoneNumber}</td>
                      <td>{item.MacAddress}</td>
                      <td>{item.URL}</td>
                      <td>{item.UserName}</td>
                      <td>{item.LastLogin}</td>
                      <td>{item.PaymentMethod}</td>
                    </tr>
                  )
                })}
                {paymentFilter.map(item => {
                  return (
                    <tr>
                      <td>{item.FirstName}</td>
                      <td>{item.LastName}</td>
                      <td>{item.Gender}</td>
                      <td>{item.Latitude}</td>
                      <td>{item.Longitude}</td>
                      <td>{item.CreditCardNumber}</td>
                      <td>{item.CreditCardType}</td>
                      <td>{item.Email}</td>
                      <td>{item.DomainName}</td>
                      <td>{item.PhoneNumber}</td>
                      <td>{item.MacAddress}</td>
                      <td>{item.URL}</td>
                      <td>{item.UserName}</td>
                      <td>{item.LastLogin}</td>
                      <td>{item.PaymentMethod}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
