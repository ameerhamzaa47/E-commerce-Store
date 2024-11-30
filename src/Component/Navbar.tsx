import { FC, useEffect, useState } from 'react'
import { NavLink, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deletecart, filterByName } from '../Reducer/reducer'
import { Link, useNavigate } from 'react-router-dom'

const Navbar: FC = () => {

  const dispatch = useDispatch()
  function sData(id: any) {
    dispatch(deletecart(id))
  }


  const [price, setPrice] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(e.target.value)
    dispatch(filterByName(query))
  }


  const total = () => {
    let price = 0;
    data.map((ele: any) =>
      price = ele.price + price
    )
    setPrice(price)
  }

  useEffect(() => {
    total()
  }, [total])


  let user = JSON.parse(localStorage.getItem('user-info') as string)
  const Navigate = useNavigate()
  function logout() {
    localStorage.clear()
    Navigate('/register')
  }


  const data = useSelector((state: any) => state.products.carts)


  return (
    <>
      <div className="navbar bg-black w-[121%] md:w-full sticky top-0 z-10">
        <div className="flex items-center  ">
          <Link to="/" className=" text-xl font-semibold text-white">ShopWise</Link>
          <span className='font-bold text-red-500 scale-150 px-1'>.</span>
        </div>
        {
          localStorage.getItem('user-info') ?
            <>
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                  </div>
                  {/* mobile menu */}
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-96 p-2 shadow">
                    <div className="form-control ">
                      <input type="text" placeholder="Search Here..." value={searchQuery} onChange={handleSearchChange} className="input input-bordered h-9 w-12/12 md:w-auto" />
                    </div>
                    <button className="text-white mt-2 bg-red-500 rounded-r-sm px-3 font-semibold p-1.5"><i className="fa-solid fa-magnifying-glass"></i></button>
                  </ul>
                </div>
                {/* Title */}

              </div>
              <div className="navbar-center hidden md:flex justify-center items-center ">
                <div className="form-control">
                  <input type="text" placeholder="Search Here..." value={searchQuery} onChange={handleSearchChange} className="input rounded-l-sm rounded-r-none input-bordered h-9 w-24 md:w-80" />
                </div>
                <button className="text-white bg-red-500 rounded-r-sm px-3 font-semibold p-1.5"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
              <div className="navbar-end">

                {/* cart and profile */}
                <div className="flex justify-center items-center">
                  <div className={`dropdown dropdown-end`}>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                      <div className="indicator ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="badge badge-sm indicator-item bg-red-500 text-white">{data.length}</span>
                      </div>
                    </div>
                    <div
                      tabIndex={0}
                      className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-96 shadow-lg rounded-lg overflow-hidden">

                      {
                        data.length ?
                          <>
                            <div className='p-4 w-96 max-h-96 overflow-y-auto'>
                              <Table>
                                {/* <thead className='px-4  w-full text-red-500'>
                  <tr className='flex justify-between'>
                    <th>Photo</th>
                    <th>Details</th>
                    <th></th>
                    <th></th>
                  </tr>
                  </thead> */}
                                <tbody>
                                  {
                                    data.map((e: any) =>
                                      <tr className='my-2 flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md border-b relative' key={e.id}>
                                        <td><NavLink><img className='w-28 h-28 rounded-md object-cover' src={e.images} alt="" /></NavLink></td>
                                        <td className='w-7/12'>
                                          <p><strong className="font-semibold">Category:</strong> {e.category}</p>
                                          <p> <strong className="text-lg font-semibold text-gray-800">Name:</strong> {e.title}</p>
                                          <p><strong>Price:</strong> ₹{e.price}</p>
                                          <p><strong>Quantity:</strong> {e.quantity}</p>
                                          <hr />
                                        </td>
                                        <td><p><i onClick={() => sData(e.id)} className='fa-solid fa-xmark text-red-500 cursor-pointer hover:text-red-700 transition duration-200 ease-in-out transform hover:scale-110 absolute right-3 top-5'></i></p></td>
                                      </tr>
                                    )
                                  }

                                </tbody>
                              </Table>

                            </div>
                            <div className='bg-gray-100'>
                              <p className='text-center flex justify-between m-4 '>
                                <strong>Total:</strong>
                                <p className='font-semibold text-red-600'> ₹{price.toFixed(2)}</p>
                              </p>
                            </div>
                          </>
                          :
                          <div className='flex justify-center items-center p-4'>
                            <p className='text-2xl p-4 text-gray-700'>Your Cart is Empty</p>
                            <i className='fas fa-close smallclose text-2xl cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out' />
                          </div>
                      }

                    </div>
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                      <li>
                        <a className="justify-between">
                          {user && user.name || user.email}
                          <span className="badge">New</span>
                        </a>
                      </li>
                      <li><a>Settings</a></li>
                      <li><a onClick={logout}>Logout</a></li>
                    </ul>
                  </div>
                </div>


              </div>
            </>
            :
            <>
              <div className='text-white font-bold mx-20'>
                <Link className='mx-3 text-white' to={'/login'}>Login</Link>
                <Link className='mx-3 text-white' to={'/register'}>Register</Link>
              </div>
            </>
        }

      </div>
    </>
  )
}

export default Navbar