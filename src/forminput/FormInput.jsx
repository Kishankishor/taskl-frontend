import React, { useEffect, useState } from 'react'
import "./formInput.css"
import axios from 'axios'
import { getall, addUser, update, drop } from '../utiilis/apiHandler'
import Validation from '../utiilis/Validation'


export const FormInput = () => {
    const [id, setId] = useState('')
    const [allData, setAllData] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [countryData, setCountryData] = useState([]);
    const [country, setCountry] = useState("")
    const [state, setState] = useState([]);
    const [st, setst] = useState("")

    const [errors , setErrors] = useState({})
 
    const [isupdating, setIsupdating] = useState(false)

    useEffect(() => {
        getall(setAllData)
        axios.get("https://api.iso3166.org/country/get.php?group=all&lng=en&asof=2022").then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
        axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
            .then((res) => {
                
                setCountryData(res.data)

            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const varcountry = [...new Set(countryData.map((item) => {
        return item.country
    }))]
    varcountry.sort()

    const handlecountry = (e) => {
        
        let countryState = countryData.filter(state => state.country === e.target.value)
        
        countryState = [...new Set(countryState.map(item => item.subcountry))]
        countryState.sort()
        setCountry(e.target.value)
        
        setState(countryState)

    }
    const updateMode = (id, fn, ln, em, ph, add1, add2, con, st) => {
      
        setIsupdating(true)
        setFirstName(fn)
        setLastName(ln)
        setEmail(em)
        setMobileNumber(ph)
        setAddress1(add1)
        setAddress2(add2)
        setCountry(con)
        setst(st)
        setId(id)
    }
    const handleValidation =(event) =>{
        event.preventDefault();
        setErrors(Validation(firstName,lastName , email,mobileNumber, address1))
        

    }
 


    return (
        <>
            <div className='head'>
                <h2>Add a user</h2>
            </div>
            <div className='form'>
                <form onSubmit={handleValidation}>
                    <table>
                        <tr>
                            <td><label htmlFor="">first name: </label></td>
                            <td> <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                // required
                                // minLength={5}
                            />
                            {errors.fname && <p style={{color: "red"}}>{errors.fname}</p>}</td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">last name: </label></td>
                            <td> <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                // required
                                // minLength={5}
                            />
                            {errors.lname && <p style={{color: "red"}}>{errors.lname}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">email:</label></td>
                            <td>  <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                // required
                                // minLength={5}
                            />
                            {errors.email && <p style={{color: "red"}}>{errors.email}</p>}</td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">mobile:</label></td>
                            <td>  <input
                                type="number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                // required
                                minLength={5}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">Address 1:</label></td>
                            <td>   <input
                                type="text"
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                                // required
                                // minLength={5}
                            />
                            {errors.adress1 && <p style={{color: "red"}}>{errors.adress1}</p>}</td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">Address 2:</label></td>
                            <td>   <input
                                type="text"
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}

                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">country:</label></td>
                            <td>   <select name="" id="" value={country} onChange={(e) => handlecountry(e)} >
                                <option value="">select country</option>
                                {varcountry.map((item) => {
                                    return <option key={item}>{item}</option>
                                })}</select></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">State:</label></td>
                            <td>    <select name="" id="" onChange={(e) => setst(e.target.value)} value={st} >
                              
                                {state.map((item) => {
                                    return <option >{item}</option>
                                })}</select></td>
                        </tr>
                    </table>
                    <input type='submit' className='sub' onClick={ 
                        () => 
                         isupdating ?
                            update(id, firstName, lastName, email, mobileNumber, address1, address2, country, st)
                            : addUser(firstName, lastName, email, mobileNumber, address1, address2, country, st)  } value={isupdating ? "update" : "Add"}
                            />
                        

                </form>

            </div>
            <div className='head'>
                <h2>All user</h2>
            </div>
            
            <div className='table-wrapper'>


                <table className='f1-table'>
                    <thead><tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>country</th>
                        <th>State</th>
                        <th>Updations</th>
                        <th>Deletions</th>
                    </tr></thead>
                    <tbody>

                        {
                            allData.map((item) => {
                                return <tr className=''>
                                    <td>{item.FirstName}
                                    </td>
                                    <td>{item.LastName}
                                    </td>
                                    <td>{item.Email}
                                    </td>
                                    <td>{item.Mobile}
                                    </td>
                                    <td>{item.Adress1}
                                    </td>
                                    <td>{item.Adress2}
                                    </td>
                                    <td>{item.country}
                                    </td>
                                    <td>{item.State}
                                    </td>
                                    <td><button className='up'
                                        onClick={() => updateMode(item._id, item.FirstName, item.LastName, item.Email, item.Mobile, item.Adress1, item.Adress2, item.country, item.State)}>update</button></td>
                                    <td><button className='dp' onClick={() => drop(item._id)}>delete</button></td>
                                </tr>
                            })
                        }




                    </tbody>

                </table>



            </div>
            


        </>


    )
}
